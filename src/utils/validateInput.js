export function validateInput(cmd, args) {
  const allowedCmds = {
    '.exit': 0,
    up: 0,
    cd: 1,
    ls: 0,
    cat: 1,
    add: 1,
    rn: 2,
    cp: 2,
    rm: 1,
    mv: 2,
    os: 1,
    hash: 1,
    compress: 2,
    decompress: 2,
  };

  return args.length === allowedCmds[cmd] || false;
}
