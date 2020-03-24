import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Volume extends Command {
  async execute() {
    if (this.args.length) {
      try {
        const volume = parseFloat(this.args[0]);
        PlayManagerInstance.setVolume(volume);
      } catch (e) {}
    } else {
      this.message.reply('hlasitost je ' + PlayManagerInstance.volume);
    }
  }
}
