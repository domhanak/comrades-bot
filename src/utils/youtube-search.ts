import fetch from 'node-fetch';
import { searchResultsCache } from '../commands/search';

const url = (q: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&key=${process.env.YOUTUBE_KEY}`;

export interface SearchResult {
  title: string;
  id: string;
}

export function youtubeSearch(q: string): Promise<SearchResult[]> {
  return fetch(url(q))
    .then((response) => response.json())
    .then((result) => {
      if (!result.items) {
        throw new Error();
      }

      if (result.items.length === 0) {
        return [];
      }

      return result.items.map((item) => ({
        title: item.snippet.title,
        id: item.id.videoId,
      }));
    });
}
