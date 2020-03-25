import Command from '../command';
import fetch from 'node-fetch';
import PlayManagerInstance from '../play-manager';
import { youtubeSearch, SearchResult } from '../utils/youtube-search';

const url = (q: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&key=${process.env.YOUTUBE_KEY}`;

export let searchResultsCache: SearchResult[] = [];

export default class Search extends Command {
  async execute() {
    if (this.args.length === 0) {
      return;
    }

    try {
      youtubeSearch(this.args.join(' ')).then((results) => {
        if (results.length === 0) {
          this.message.reply('ziadne take videjka sa nenasli.');
          return;
        }

        searchResultsCache = results;
        this.message.channel.send(
          `Co ti zahrame? ( spust cez !go {cislo} )\n\n${searchResultsCache
            .map((item, index) => `\t${index + 1}: ${item.title}`)
            .join('\n')}`
        );
      });
    } catch (e) {
      this.message.reply('nieco sa posralo :(');
    }
  }
}
