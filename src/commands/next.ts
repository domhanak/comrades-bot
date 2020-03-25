import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Next extends Command {
  async execute() {
    PlayManagerInstance.skip(this.message);
  }
}
