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
            ? `, tvoje musí počkať v rade 🤷‍♂ ( ${PlayManagerInstance.songQueue.length} pred tebou )`
            : 'hrá bzm bzmm bzzzm 🎉'
        }`
      );

      PlayManagerInstance.addYoutubeToQueue({
        message: this.message,
        title: songInfo.title,
        url: songInfo.video_url,
      });
    } catch (e) {
      this.message.reply('Nevymýšlaj... Také video neexistuje...');
    }
  }
}
