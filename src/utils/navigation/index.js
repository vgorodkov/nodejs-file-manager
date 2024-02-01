import { homedir } from 'os';
import { strings } from '../../constants/strings.js';
import { readdir, stat } from 'fs/promises';

export function setStaringWorkingDir() {
  process.chdir(homedir());
}

export function moveUpDir() {
  process.chdir('..');
}

export function moveToDir(path) {
  try {
    process.chdir(path);
  } catch (err) {
    if ((err.code = 'ENOENT')) {
      console.log(strings.invalidInput);
    } else {
      console.error(strings.executionError);
    }
  }
}

export async function showFileList() {
  try {
    const files = await readdir(process.cwd());
    const formattedFiles = files.map(async (file) => {
      const fileStats = await stat(file);
      const isFile = fileStats.isFile();
      const fileType = isFile ? 'file' : 'directory';
      return {
        Name: file,
        Type: fileType,
      };
    });
    const listOfFiles = await Promise.all(formattedFiles);
    listOfFiles.sort((a, b) => {
      return a.Type.localeCompare(b.Type);
    });
    console.table(listOfFiles);
  } catch {
    console.error(strings.executionError);
  }
}
