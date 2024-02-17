import { createHash } from "crypto";
import { createReadStream } from "fs";
import { EOL } from "os";
import { handleOperationFailedMsg } from "../messages/index.js";

export function calculateHash(sourcePath) {
  return new Promise((resolve) => {
    const hash = createHash("sha256");
    const source = createReadStream(sourcePath);

    source.pipe(hash.setEncoding("hex")).pipe(process.stdout);

    source.on("end", () => {
      console.log(EOL);
      resolve();
    });

    source.on("error", () => {
      handleOperationFailedMsg();
      resolve();
    });
  });
}
