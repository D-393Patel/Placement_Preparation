const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "with",
  "you",
  "your"
]);

export function auditContent(text) {
  const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const usefulWords = words.filter((word) => !STOP_WORDS.has(word));
  const frequencies = new Map();

  for (const word of usefulWords) {
    frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
  }

  const topKeywords = [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([word, count]) => ({ word, count }));

  return {
    wordCount: words.length,
    tone: classifyTone(text),
    topKeywords,
    health: {
      passed: words.length > 8 && topKeywords.length > 0,
      checks: ["word-count", "tone-classification", "keyword-extraction"]
    }
  };
}

function classifyTone(text) {
  const lower = text.toLowerCase();
  const actionWords = ["build", "ship", "launch", "run", "fix", "improve"];
  const calmWords = ["clear", "simple", "steady", "careful", "focused"];

  const actionScore = actionWords.filter((word) => lower.includes(word)).length;
  const calmScore = calmWords.filter((word) => lower.includes(word)).length;

  if (actionScore > calmScore) return "action-oriented";
  if (calmScore > actionScore) return "calm";
  return "neutral";
}
