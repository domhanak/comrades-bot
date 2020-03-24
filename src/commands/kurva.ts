import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Kurva extends Command {
  async execute() {
    PlayManagerInstance.addSongToQueue(
      this.message,
      'Kurva',
      'http://milujipraci.cz/sfx/kurva.mp3'
    );
  }
}
