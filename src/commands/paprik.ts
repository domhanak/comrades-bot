import Command from '../command';
import fetch from 'node-fetch';

const API_URL =
  'https://uselessfacts.jsph.pl/random.json?language=en&type=json';

export default class Paprik extends Command {
  async execute() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        this.message.reply('Parikova múdrosť: ' + data.text);
      })
      .catch(() => {
        this.message.reply('Daco sa posralo :(');
      });
  }
}
