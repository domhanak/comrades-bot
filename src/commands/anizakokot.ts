import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class AniZaKokot extends Command {
  async execute() {
    PlayManagerInstance.addSongToQueue(
      this.message,
      'http://milujipraci.cz/sfx/ani-za-kokot-vole.mp3'
    );
  }
}
