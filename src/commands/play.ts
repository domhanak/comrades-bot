import Command from '../command';
import PlayManagerInstance from '../play-manager';
const ytdl = require('ytdl-core');

export default class Play extends Command {
  async execute() {
    try {
      const songInfo = await ytdl.getBasicInfo(this.args[0]);

      this.message.reply(
        `Video ${songInfo.title} ${
          PlayManagerInstance.isPlaying
            ? 'musí počkať v rade 🤷‍♂️'
            : 'hrá bzm bzmm bzzzm 🎉'
        }`
      );

      PlayManagerInstance.addSongToQueue(
        this.message,
        ytdl(songInfo.video_url)
      );
    } catch (e) {
      this.message.reply('Nevymýšlaj... Také video neexistuje...');
    }
  }
}
