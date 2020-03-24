import {
  Message,
  StreamDispatcher,
  StreamOptions,
  VoiceBroadcast,
  VoiceConnection,
} from 'discord.js';
import { Readable } from 'stream';
import { createWavFile } from './utils/createWavFile';
import { unlinkSync } from 'fs';
const say = require('say');

enum SongType {
  SONG,
  TEXT,
}

interface PlayingSong {
  type: SongType;
  title: string;
  song: StreamDispatcher;
  voiceConnection: VoiceConnection;
}

interface Song {
  type: SongType;
  input: VoiceBroadcast | Readable | string;
  title: string;
  options?: StreamOptions;
  voiceConnection: VoiceConnection;
}

type SongQueue = Array<Song>;

class PlayManager {
  songPlaying: PlayingSong | null = null;
  songQueue: SongQueue;

  constructor() {
    this.songQueue = [];
  }

  private async join(message: Message) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      message.channel.send('You need to be in a voice channel to play music!');

      return null;
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      message.channel.send(
        'I need the permissions to join and speak in your voice channel!'
      );

      return null;
    }

    return await voiceChannel.join();
  }

  private playSong(song: Song) {
    const play = song.voiceConnection.play(song.input, song.options);

    play.on('finish', () => {
      this.songPlaying = null;
      this.playNext();
    });

    this.songPlaying = {
      type: SongType.SONG,
      title: song.title,
      song: play,
      voiceConnection: song.voiceConnection,
    };
  }

  private async playText(song: Song) {
    if (typeof song.input !== 'string') {
      console.error('Really? Not string?');
      this.playNext();
      return;
    }

    try {
      const soundPath = await createWavFile(song.input);
      const play = song.voiceConnection.play(soundPath);

      play.on('finish', () => {
        unlinkSync(soundPath);
        this.songPlaying = null;
        this.playNext();
      });

      this.songPlaying = {
        type: SongType.SONG,
        title: song.title,
        song: play,
        voiceConnection: song.voiceConnection,
      };
    } catch (e) {
      console.error(e);
      this.playNext();
    }
  }

  private playNext() {
    if (this.songQueue.length === 0) {
      return;
    }

    if (this.songPlaying) {
      return;
    }

    const song = this.songQueue.shift();

    if (!song.voiceConnection) {
      console.error('Voice connection is not established');
      this.playNext();
      return;
    }

    if (song.type === SongType.SONG) {
      this.playSong(song);
      return;
    }

    if (song.type === SongType.TEXT) {
      this.playText(song);
      return;
    }
  }

  public get isPlaying() {
    return !!this.songPlaying;
  }

  stop(message: Message) {
    if (!message.member.voice.channel) {
      return message.channel.send(
        'You have to be in a voice channel to stop the music!'
      );
    }

    this.songQueue = [];

    if (!this.songPlaying) {
      return;
    }

    this.songPlaying.voiceConnection.dispatcher.end();
  }

  skip(message: Message) {
    if (!message.member.voice.channel)
      return message.channel.send(
        'You have to be in a voice channel to stop the music!'
      );

    if (!this.songPlaying) {
      return;
    }

    this.songPlaying.voiceConnection.dispatcher.end();

    this.playNext();
  }

  async addSongToQueue(
    message: Message,
    title: string,
    input: VoiceBroadcast | Readable | string,
    options?: StreamOptions
  ) {
    const voiceConnection = await this.join(message);

    if (voiceConnection) {
      this.songQueue.push({
        input,
        options,
        voiceConnection,
        title,
        type: SongType.SONG,
      });
      this.playNext();
    } else {
      message.channel.send(
        'Song cannot be played :(, voice channel cannot be established.'
      );
    }
  }

  async addTextToQueue(message: Message, title: string, text: string) {
    const voiceConnection = await this.join(message);

    if (voiceConnection) {
      this.songQueue.push({
        input: text,
        voiceConnection,
        title,
        type: SongType.TEXT,
      });
      this.playNext();
    } else {
      message.channel.send(
        'Text cannot be played :(, voice channel cannot be established.'
      );
    }
  }
}

const PlayManagerInstance = new PlayManager();

export default PlayManagerInstance;
