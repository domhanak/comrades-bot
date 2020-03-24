import { existsSync, mkdirSync, unlinkSync } from 'fs';
const say = require('say');

const tempWavDir = './temp';

async function createWavFile(text): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!existsSync(tempWavDir)) {
      mkdirSync(tempWavDir);
    }

    const timestamp = new Date().getTime();
    const soundPath = `./${tempWavDir}/${timestamp}.wav`;

    say.export(text, null, 1, soundPath, (err) => {
      if (err) {
        return reject();
      } else {
        return resolve(soundPath);
      }
    });
  });
}

export { createWavFile };
