import { strings } from '../../constants/strings.js';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { EOL } from 'os';

export function calculateHash(sourcePath) {
  return new Promise((resolve) => {
    const hash = createHash('sha256');
    const source = createReadStream(sourcePath);

    source.pipe(hash.setEncoding('hex')).pipe(process.stdout);

    source.on('end', () => {
      console.log(EOL);
      resolve();
    });

    source.on('error', () => {
      console.error(strings.executionError);
    });
  });
}
