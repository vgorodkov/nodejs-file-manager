import { strings } from "../../constants/strings.js";
import { EOL } from "os";

export function handleUserGreetingMsg(username) {
  console.log(`${strings.greeting}, ${username}!${EOL}`);
}

export function handleUserLeavingMsg(username) {
  console.log(`${strings.farewell}, ${username}, goodbye!${EOL}`);
}

export function handleCwdMsg() {
  console.log(`${strings.cwd} ${process.cwd()}${EOL}`);
}

export function handleInvalidInputMsg() {
  console.error(strings.invalidInput);
}

export function handleOperationFailedMsg() {
  console.error(strings.executionError);
}
