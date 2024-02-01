import { createReadStream, createWriteStream } from 'fs';
import { strings } from '../../constants/strings.js';
import { access, constants, rename, rm, stat, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { cwd } from 'process';

export async function readFile(path) {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    const sourceFromFile = createReadStream(path);
    sourceFromFile.pipe(process.stdout);
  } catch (err) {
    if ((err.code = 'ENOENT')) {
      console.error(strings.invalidInput);
      return;
    }
    console.error(strings.executionError);
  }
}

export async function createFile(fileName) {
  try {
    await writeFile(join(cwd(), fileName), '', { flag: 'wx' });
  } catch {
    console.error(strings.executionError);
  }
}

export async function renameFile(args) {
  const sourceFilePath = args[0];
  const targetFileName = args[1];
  try {
    await rename(sourceFilePath, join(dirname(sourceFilePath), targetFileName));
  } catch (err) {
    console.error(strings.executionError);
  }
}

export async function copyFile(args) {
  const source = args[0];
  const target = args[1];
  try {
    await access(source, constants.R_OK | constants.W_OK);
    await access(target, constants.R_OK | constants.W_OK);
    const fileStats = await stat(source);
    const isFile = fileStats.isFile();
    if (!isFile) {
      console.error('Operation failed');
      return;
    }
    createReadStream(source).pipe(createWriteStream(join(target, source)));
  } catch (err) {
    console.error(strings.executionError);
  }
}

export async function removeFile(filePath) {
  try {
    await rm(filePath);
  } catch (err) {
    console.error(strings.executionError);
  }
}

export async function moveFile(args) {
  const source = args[0];

  await copyFile(args);
  await removeFile(source);
}
