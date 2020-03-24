import { existsSync, mkdirSync, unlinkSync } from 'fs';
const say = require('say');

const tempWavDir = './temp';

// https://gist.github.com/mculp/4b95752e25c456d425c6
async function createWavFile(text, speed, voice = 'Laura'): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!existsSync(tempWavDir)) {
      mkdirSync(tempWavDir);
    }

    const timestamp = new Date().getTime();
    const soundPath = `./${tempWavDir}/${timestamp}.wav`;

    say.export(text, voice, speed, soundPath, (err) => {
      if (err) {
        return reject();
      } else {
        return resolve(soundPath);
      }
    });
  });
}

export { createWavFile };
