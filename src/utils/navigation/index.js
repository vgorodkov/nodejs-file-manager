import { homedir } from "os";
import { strings } from "../../constants/strings.js";
import { access, constants, readdir, stat } from "fs/promises";
import {
  handleInvalidInputMsg,
  handleOperationFailedMsg,
} from "../messages/index.js";

export function setStaringWorkingDir() {
  process.chdir(homedir());
}

export function moveUpDir() {
  process.chdir("..");
}

export async function moveToDir(path) {
  try {
    process.chdir(path);
  } catch (err) {
    handleOperationFailedMsg();
  }
}

export async function showFileList() {
  try {
    const files = await readdir(process.cwd());
    const formattedFiles = files.map(async (file) => {
      const fileStats = await stat(file);
      const isFile = fileStats.isFile();
      const fileType = isFile ? "file" : "directory";
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
    handleOperationFailedMsg();
  }
}
