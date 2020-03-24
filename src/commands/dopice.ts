import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Dopice extends Command {
  async execute() {
    PlayManagerInstance.addSongToQueue(
      this.message,
      'http://milujipraci.cz/sfx/do-pice.mp3'
    );
  }
}
