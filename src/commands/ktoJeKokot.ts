import Command from '../command';
import { getRandomInt } from '../utils/random';
import PlayManagerInstance from '../play-manager';

const kokot = (name: string) => `${name} je kokot...`;

export default class KtoJeKokot extends Command {
  async execute() {
    var userArr = this.client.users.cache;
    let num: number = getRandomInt(0, userArr.size);
    var user = userArr.random();

    this.message.channel.send(`<@${user.id}> je kokot.`);
    PlayManagerInstance.addTextToQueue({
      message: this.message,
      title: user.username,
      text: kokot(user.username),
    });
  }
}
