import { createReadStream, createWriteStream } from "fs";
import { strings } from "../../constants/strings.js";
import { access, constants, rename, rm, stat, writeFile } from "fs/promises";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import { handleOperationFailedMsg } from "../messages/index.js";
import { EOL } from "os";

export async function readFile(path) {
  return new Promise((resolve) => {
    const sourceFromFile = createReadStream(path);
    sourceFromFile.pipe(process.stdout);

    sourceFromFile.on("end", () => {
      console.log(EOL);
      resolve();
    });

    sourceFromFile.on("error", () => {
      handleOperationFailedMsg();
      resolve();
    });
  });
}

export async function createFile(fileName) {
  try {
    await writeFile(join(cwd(), fileName), "", { flag: "wx" });
  } catch {
    handleOperationFailedMsg();
  }
}

export async function renameFile(args) {
  const sourceFilePath = args[0];
  const targetFileName = args[1];
  try {
    await rename(sourceFilePath, join(dirname(sourceFilePath), targetFileName));
  } catch (err) {
    handleOperationFailedMsg();
  }
}

export async function copyFile(args) {
  const source = args[0];
  const target = args[1];
  try {
    await access(source, constants.R_OK | constants.W_OK);
    const fileName = basename(source);
    const fileStats = await stat(source);
    const isFile = fileStats.isFile();
    if (!isFile) {
      handleOperationFailedMsg();
      return;
    }
    createReadStream(source).pipe(createWriteStream(join(target, fileName)));
  } catch {
    handleOperationFailedMsg();
  }
}

export async function removeFile(filePath) {
  try {
    await rm(filePath);
  } catch {
    handleOperationFailedMsg();
  }
}

export async function moveFile(args) {
  const source = args[0];

  try {
    await access(source, constants.F_OK | constants.W_OK);
    await copyFile(args);
    await removeFile(source);
  } catch {
    handleOperationFailedMsg();
  }
}
