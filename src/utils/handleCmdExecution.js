import { moveToDir, moveUpDir, showFileList } from './navigation/index.js';

import {
  copyFile,
  createFile,
  moveFile,
  readFile,
  removeFile,
  renameFile,
} from './file_operations/index.js';
import { getSystemInfo } from './os_info/index.js';
import { calculateHash } from './hash_calc/index.js';
import { compressFile, decompressFile } from './zip/index.js';

export async function handleCmdExecution(cmd, args) {
  switch (cmd) {
    case 'up':
      moveUpDir();
      break;
    case 'cd':
      moveToDir(...args);
      break;
    case 'ls':
      await showFileList();
      break;
    case 'cat':
      await readFile(...args);
      break;
    case 'add':
      await createFile(...args);
      break;
    case 'rn':
      await renameFile(args);
      break;
    case 'cp':
      await copyFile(args);
      break;
    case 'rm':
      await removeFile(...args);
      break;
    case 'mv':
      await moveFile(args);
      break;
    case 'os':
      getSystemInfo(...args);
      break;
    case 'hash':
      await calculateHash(...args);
      break;
    case 'compress':
      await compressFile(args);
      break;
    case 'decompress':
      await decompressFile(args);
      break;
    default:
      break;
  }
}
