import Command from '../command';
import fetch from 'node-fetch';
import PlayManagerInstance from '../play-manager';

export default class Say extends Command {
  async execute() {
    if (this.args.length === 0) {
      return;
    }

    PlayManagerInstance.addTextToQueue({
      message: this.message,
      title: 'Rozprava daco',
      text: this.args.join(' '),
      voice: 'Laura',
    });
  }
}
