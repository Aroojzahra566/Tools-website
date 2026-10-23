/**
 * Text case transformations for the Case Converter.
 *
 * Title Case follows a simplified headline style: every word is capitalized
 * except short articles, conjunctions and prepositions (unless they start or
 * end the text). Words already written in capitals, such as "NASA", are kept
 * unless the whole input is in capitals.
 */

export type CaseMode = "upper" | "lower" | "title" | "sentence";

const MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "if", "in", "into", "nor",
  "of", "off", "on", "onto", "or", "per", "so", "than", "the", "to", "up", "via", "vs", "with", "yet",
]);

const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu;

function capitalize(word: string): string {
  const [first = "", ...rest] = Array.from(word);
  return first.toLocaleUpperCase() + rest.join("");
}

function isAllCaps(text: string): boolean {
  const letters = text.replace(/[^\p{L}]/gu, "");
  return letters.length > 0 && letters === letters.toLocaleUpperCase() && letters !== letters.toLocaleLowerCase();
}

function toTitleCase(text: string): string {
  const keepCaps = !isAllCaps(text);
  const lastIndex = (text.match(WORD)?.length ?? 0) - 1;
  let i = -1;

  return text.replace(WORD, (word: string, offset: number) => {
    i++;
    // Keep acronyms like "NASA" or "PDF" when the input is not entirely uppercase.
    if (keepCaps && word.length > 1 && isAllCaps(word)) return word;
    const lower = word.toLocaleLowerCase();
    // Capitalize the first word of the text and the first word after a colon or line break.
    const before = text.slice(0, offset);
    const startsPhrase = i === 0 || /[:.!?—–]\s*$|\n\s*$/u.test(before);
    if (!startsPhrase && i !== lastIndex && MINOR_WORDS.has(lower)) return lower;
    return capitalize(lower);
  });
}

function toSentenceCase(text: string): string {
  const lower = text.toLocaleLowerCase();
  // Capitalize the first letter of the text and of each sentence or line.
  let result = lower.replace(/(^|[.!?…]\s+|\n\s*)(["'“‘(\[]*)(\p{L})/gu, (_m, lead: string, quote: string, letter: string) => lead + quote + letter.toLocaleUpperCase());
  // The pronoun "I" and its contractions.
  result = result.replace(/(?<![\p{L}\p{N}])i(?=(?:['’](?:m|ll|d|ve|s))?(?![\p{L}\p{N}]|\.\p{L}))/gu, "I");
  return result;
}

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toLocaleUpperCase();
    case "lower":
      return text.toLocaleLowerCase();
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
  }
}
