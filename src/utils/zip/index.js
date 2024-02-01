import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export async function compressFile(args) {
  const sourcePath = args[0];
  const targetPath = args[1];
  const gzip = createGzip();

  const source = createReadStream(sourcePath);
  const target = createWriteStream(targetPath);

  await pipeline(source, gzip, target);
}
