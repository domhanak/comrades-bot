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
const ytdl = require('ytdl-core');

enum SongType {
  SONG,
  TEXT,
  YOUTUBE,
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
  voiceConnection: VoiceConnection;
  voice?: string;
}

type SongQueue = Array<Song>;

class PlayManager {
  songPlaying: PlayingSong | null = null;
  songQueue: SongQueue;
  speed = 1;
  volume = 1;

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

  setVolume(volume: number) {
    if (volume > 1 || volume < 0) {
      return;
    }

    this.volume = volume;

    if (this.songPlaying) {
      this.songPlaying.voiceConnection.dispatcher.setVolume(volume);
    }
  }

  private playSong(song: Song) {
    const play = song.voiceConnection.play(song.input, {
      volume: this.volume,
    });

    this.songPlaying = {
      type: SongType.SONG,
      title: song.title,
      song: play,
      voiceConnection: song.voiceConnection,
    };

    play.on('finish', () => {
      this.songPlaying = null;
      this.playNext();
    });
  }

  private playYoutube(song: Song) {
    const play = song.voiceConnection.play(ytdl(song.input), {
      volume: this.volume,
    });

    this.songPlaying = {
      type: SongType.YOUTUBE,
      title: song.title,
      song: play,
      voiceConnection: song.voiceConnection,
    };

    play.on('finish', () => {
      this.songPlaying = null;
      this.playNext();
    });
  }

  private async playText(song: Song) {
    if (typeof song.input !== 'string') {
      console.error('Really? Not string?');
      this.playNext();
      return;
    }

    try {
      const soundPath = await createWavFile(song.input, this.speed, song.voice);
      const play = song.voiceConnection.play(soundPath, {
        volume: this.volume,
      });

      this.songPlaying = {
        type: SongType.SONG,
        title: song.title,
        song: play,
        voiceConnection: song.voiceConnection,
      };

      play.on('finish', () => {
        unlinkSync(soundPath);
        this.songPlaying = null;
        this.playNext();
      });
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

    if (song.type === SongType.YOUTUBE) {
      this.playYoutube(song);
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

  async addSongToQueue({
    message,
    title,
    input,
  }: {
    message: Message;
    title: string;
    input: VoiceBroadcast | Readable | string;
  }) {
    const voiceConnection = await this.join(message);

    if (voiceConnection) {
      this.songQueue.push({
        input,
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

  async addYoutubeToQueue({
    message,
    title,
    url,
  }: {
    message: Message;
    title: string;
    url: string;
  }) {
    const voiceConnection = await this.join(message);

    if (voiceConnection) {
      this.songQueue.push({
        input: url,
        voiceConnection,
        title,
        type: SongType.YOUTUBE,
      });
      this.playNext();
    } else {
      message.channel.send(
        'Song cannot be played :(, voice channel cannot be established.'
      );
    }
  }

  async addTextToQueue({
    message,
    title,
    text,
    voice,
  }: {
    message: Message;
    title: string;
    text: string;
    voice?: string;
  }) {
    const voiceConnection = await this.join(message);

    if (voiceConnection) {
      this.songQueue.push({
        input: text,
        voiceConnection,
        title,
        type: SongType.TEXT,
        voice,
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
