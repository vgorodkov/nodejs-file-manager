import { EOL, arch, cpus, homedir, userInfo } from "os";

import { handleInvalidInputMsg } from "../messages/index.js";

function getEOL() {
  console.log(JSON.stringify(EOL));
}

function getCPUs() {
  const [{ model }] = cpus();
  const totalAmount = cpus().length;
  //divide by 1000 to turn MHz to GHz
  const clockRates = cpus().map((cpu) => cpu.speed / 1000 + " GHz");
  const output = {
    model: model.trim(),
    totalAmount,
    clockRates,
  };

  console.log(output);
}

function getHomeDir() {
  console.log(homedir());
}

function getSystemUsername() {
  console.log(userInfo().username);
}

function getCPUArchitecture() {
  console.log(arch());
}

export function getSystemInfo(arg) {
  switch (arg) {
    case "--EOL":
      getEOL();
      break;
    case "--cpus":
      getCPUs();
      break;
    case "--homedir":
      getHomeDir();
      break;
    case "--username":
      getSystemUsername();
      break;
    case "--architecture":
      getCPUArchitecture();
      break;
    default:
      handleInvalidInputMsg();
      break;
  }
}
