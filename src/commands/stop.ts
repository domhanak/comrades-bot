import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Stop extends Command {
  async execute() {
    PlayManagerInstance.stop(this.message);
  }
}
