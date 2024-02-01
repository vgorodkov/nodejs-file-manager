import { createInterface } from 'readline/promises';

import { parseUsername } from './utils/parseUsername.js';

import { setStaringWorkingDir } from './utils/navigation/index.js';

import {
  handleCwdMsg,
  handleUserGreetingMsg,
  handleUserLeavingMsg,
} from './utils/messages/index.js';

import { strings } from './constants/strings.js';
import { validateInput } from './utils/validateInput.js';
import { handleCmdExecution } from './utils/handleCmdExecution.js';
import { parseInput } from './utils/parseInput.js';

function fileManager() {
  const username = parseUsername();

  handleUserGreetingMsg(username);
  setStaringWorkingDir();
  handleCwdMsg();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (line) => {
    const { cmd, args } = parseInput(line.trim());
    const isInputValid = validateInput(cmd, args);

    if (!isInputValid) {
      console.error(strings.invalidInput);
    } else {
      if (cmd === '.exit') {
        rl.close();
        return;
      }

      await handleCmdExecution(cmd, args);
    }

    handleCwdMsg();
  });

  rl.on('close', () => {
    handleUserLeavingMsg(username);
  });
}

fileManager();
