import {
  Message,
  StreamDispatcher,
  StreamOptions,
  VoiceBroadcast,
  VoiceConnection,
} from 'discord.js';

import { Readable } from 'stream';

interface PlayingSong {
  song: StreamDispatcher;
  voiceConnection: VoiceConnection;
}

interface SongInQueue {
  input: VoiceBroadcast | Readable | string;
  options?: StreamOptions;
  voiceConnection: VoiceConnection;
}

type SongQueue = Array<SongInQueue>;

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

    const play = song.voiceConnection.play(song.input, song.options);

    play.on('finish', () => {
      this.songPlaying = null;
      this.playNext();
    });

    this.songPlaying = {
      song: play,
      voiceConnection: song.voiceConnection,
    };
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
    input: VoiceBroadcast | Readable | string,
    options?: StreamOptions
  ) {
    const voiceConnection = await this.join(message);

    if (voiceConnection) {
      this.songQueue.push({ input, options, voiceConnection });
      this.playNext();
    } else {
      message.channel.send(
        'Song cannot be played :(, voice channel cannot be established.'
      );
    }
  }
}

const PlayManagerInstance = new PlayManager();

export default PlayManagerInstance;
