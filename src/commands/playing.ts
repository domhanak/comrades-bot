import Command from '../command';
import PlayManagerInstance from '../play-manager';

export default class Playing extends Command {
  async execute() {
    if (!PlayManagerInstance.songPlaying) {
      this.message.reply('Ee, nic nehra 🎾');
      return;
    }

    const songQueue = PlayManagerInstance.songQueue.length;

    this.message.reply(
      `Totok hra 🎵 - ${PlayManagerInstance.songPlaying.title}${
        songQueue
          ? ` a v caka este ${songQueue} v rade na pustenie. Daj !skip ak sa ti nepaci.`
          : ''
      }`
    );
  }
}
