import Command from '../command';
import PlayManagerInstance from '../play-manager';
import { searchResultsCache } from './search';
const ytdl = require('ytdl-core');

export default class Go extends Command {
  async execute() {
    if (this.args.length === 0) {
      return;
    }

    try {
      const index = parseInt(this.args[0]);

      if (index < 1 || index > searchResultsCache.length) {
        return;
      }

      const result = searchResultsCache[index - 1];

      PlayManagerInstance.addYoutubeToQueue({
        message: this.message,
        title: result.title,
        url: result.id,
      });
    } catch (e) {}
  }
}
