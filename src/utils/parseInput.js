export function parseInput(input) {
  const regex = /"([^"]+)"|'([^']+)'\s*|\S+/g;
  const parts = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    parts.push(match[1] || match[2] || match[0]);
  }
  const cmd = parts[0];
  const args = parts.slice(1);
  return { cmd, args };
}
