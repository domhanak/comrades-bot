import Command from '../command';
import fetch from 'node-fetch';
import PlayManagerInstance from '../play-manager';

const API_URL = 'https://icanhazdadjoke.com/';

export default class Vtip extends Command {
  async execute() {
    fetch(API_URL, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.message.channel.send(data.joke);
      })
      .catch(() => {
        this.message.reply('Daco sa posralo :(');
      });
  }
}
