import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class JeduDoPici extends Command {
  async execute() {
    PlayManagerInstance.addSongToQueue({
      message: this.message,
      title: 'Jedu do pici',
      input: 'http://milujipraci.cz/sfx/jedu-do-pici-stadyma.mp3',
    });
  }
}
