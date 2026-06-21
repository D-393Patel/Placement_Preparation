export function formatStatus({ did, left, call }) {
  return [
    "What I Did",
    ...did.map((item) => `- ${item}`),
    "",
    "What's Left",
    ...left.map((item) => `- ${item}`),
    "",
    "What Needs Your Call",
    ...call.map((item) => `- ${item}`)
  ].join("\n");
}
