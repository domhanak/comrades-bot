import Command from '../command';
import fetch from 'node-fetch';
import PlayManagerInstance from '../play-manager';

const API_URL = 'https://icanhazdadjoke.com/';

export default class PovedzVtip extends Command {
  async execute() {
    fetch(API_URL, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        PlayManagerInstance.addTextToQueue({
          message: this.message,
          title: 'Joke',
          text: data.joke,
          voice: 'Agnes',
        });
      })
      .catch(() => {
        this.message.reply('Daco sa posralo :(');
      });
  }
}
