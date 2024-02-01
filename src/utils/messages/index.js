import { strings } from '../../constants/strings.js';

export function handleUserGreetingMsg(username) {
  console.log(`${strings.greeting}, ${username}!\n`);
}

export function handleUserLeavingMsg(username) {
  console.log(`${strings.farewell}, ${username}, goodbye!\n`);
}

export function handleCwdMsg() {
  console.log(`${strings.cwd} ${process.cwd()}\n`);
}

export function handleInvalidInputMsg() {
  console.error(strings.invalidInput + '\n');
}
