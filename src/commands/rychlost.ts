import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Rychlost extends Command {
  async execute() {
    if (this.args.length) {
      try {
        const speed = parseFloat(this.args[0]);
        if (speed > 0 && speed < 100) {
          PlayManagerInstance.speed = speed;
          this.message.reply('rychlost nastavena na ' + speed);
        }
      } catch (e) {}
    } else {
      this.message.reply('rychlost je ' + PlayManagerInstance.speed);
    }
  }
}
