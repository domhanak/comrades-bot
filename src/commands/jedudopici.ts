import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class JeduDoPici extends Command {
  async execute() {
    PlayManagerInstance.addSongToQueue(
      this.message,
      'http://milujipraci.cz/sfx/jedu-do-pici-stadyma.mp3'
    );
  }
}
