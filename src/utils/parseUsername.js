export function parseUsername() {
  const args = process.argv.slice(2);
  let username = "";

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg.startsWith("--username")) {
      username = arg.split("=")[1];
    }
  }

  return username?.trim() || "User";
}
