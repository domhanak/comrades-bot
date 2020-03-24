import Command from '../command';
import fetch from 'node-fetch';
const ytdl = require('ytdl-core');

export default class Play extends Command {
  async execute() {
    const voiceChannel = this.message.member.voice.channel;

    if (!voiceChannel) {
      this.message.channel.send(
        'You need to be in a voice channel to play music!'
      );
      return;
    }

    const permissions = voiceChannel.permissionsFor(this.message.client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      this.message.channel.send(
        'I need the permissions to join and speak in your voice channel!'
      );
      return;
    }

    const songInfo = await ytdl.getInfo(this.args[0]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
    };

    console.log(song);
  }
}
