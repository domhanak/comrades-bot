import Command from '../command';
import fetch from 'node-fetch';
import PlayManagerInstance from '../play-manager';
import { youtubeSearch, SearchResult } from '../utils/youtube-search';

const url = (q: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&key=${process.env.YOUTUBE_KEY}`;

export default class Youtube extends Command {
  async execute() {
    if (this.args.length === 0) {
      return;
    }

    try {
      youtubeSearch(this.args.join(' ')).then((results) => {
        if (results.length === 0) {
          this.message.reply('ziadne take videjko sa nenaslo.');
          return;
        }

        PlayManagerInstance.addYoutubeToQueue({
          message: this.message,
          title: results[0].title,
          url: results[0].id,
        });
      });
    } catch (e) {
      this.message.reply('nieco sa posralo :(');
    }
  }
}
