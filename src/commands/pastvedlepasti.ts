import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class PastVedlePasti extends Command {
  async execute() {
    PlayManagerInstance.addSongToQueue(
      this.message,
      'Past vedle pasti',
      'http://milujipraci.cz/sfx/past-vedle-pasti-pico.mp3'
    );
  }
}
