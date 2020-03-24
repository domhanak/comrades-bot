import Command from '../command';
import { getRandomInt } from '../utils/random';

export default class KtoJeKokot extends Command {
  async execute() {
    var userArr = this.client.users.cache;
    let num: number = getRandomInt(0, userArr.size);
    var user = userArr.random();

    this.message.channel.send(`<@${user.id}> je kokot.`);
  }
}
