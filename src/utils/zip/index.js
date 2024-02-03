import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

import { strings } from '../../constants/strings.js';
import { access, constants } from 'fs/promises';
import { basename, join } from 'path';

export async function compressFile(args) {
  const sourcePath = args[0];
  const fileName = basename(sourcePath);
  const targetPath = join(args[1], `${fileName}.gz`);
  const brotli = createBrotliCompress();

  try {
    await access(sourcePath, constants.R_OK | constants.W_OK);

    const source = createReadStream(sourcePath);
    const target = createWriteStream(targetPath);

    source.pipe(brotli).pipe(target);
  } catch (err) {
    if ((err.code = 'ENOENT')) {
      console.error(strings.invalidInput);
      return;
    }
    console.error(strings.executionError);
  }
}

export async function decompressFile(args) {
  const sourcePath = args[0];

  const targetPath = join(args[1], `decompressed.txt`);
  const brotli = createBrotliDecompress();
  try {
    await access(sourcePath, constants.R_OK | constants.W_OK);
    const source = createReadStream(sourcePath);
    const target = createWriteStream(targetPath);

    source.pipe(brotli).pipe(target);
  } catch {
    if ((err.code = 'ENOENT')) {
      console.error(strings.invalidInput);
      return;
    }
    console.error(strings.executionError);
  }
}
