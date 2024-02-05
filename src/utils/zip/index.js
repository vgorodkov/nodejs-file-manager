import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";

import { access, constants } from "fs/promises";
import { basename, extname, join } from "path";
import { handleOperationFailedMsg } from "../messages/index.js";
import { pipeline } from "stream/promises";

export async function compressFile(args) {
  const sourcePath = args[0];
  const fileName = basename(sourcePath);
  const targetPath = join(args[1], `${fileName}.br`);
  const brotli = createBrotliCompress();

  try {
    await access(sourcePath, constants.R_OK | constants.W_OK);

    const source = createReadStream(sourcePath);
    const target = createWriteStream(targetPath);

    source.pipe(brotli).pipe(target);
  } catch (err) {
    handleOperationFailedMsg();
  }
}

export async function decompressFile(args) {
  const sourcePath = args[0];
  const sourceFileExt = extname(sourcePath);

  if (sourceFileExt !== ".br") {
    handleOperationFailedMsg();
    return;
  }

  try {
    const targetFilename = basename(sourcePath).slice(0, -3);
    const targetPath = join(args[1], targetFilename);
    const brotli = createBrotliDecompress();
    await access(sourcePath, constants.R_OK | constants.W_OK);
    const source = createReadStream(sourcePath);
    const target = createWriteStream(targetPath);
    await pipeline(source, brotli, target);
  } catch (e) {
    handleOperationFailedMsg();
  }
}
