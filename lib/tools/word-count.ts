/**
 * Text statistics for the Word Counter.
 *
 * Conventions:
 * - Words are found with Intl.Segmenter, which understands Unicode word
 *   boundaries (including languages written without spaces). Hyphenated
 *   words and contractions such as "well-known" or "don't" follow the
 *   Unicode rules: "don't" is one word, "well-known" counts as two.
 * - Characters are counted as user-perceived characters (grapheme clusters),
 *   so an emoji or an accented letter counts as one.
 * - A paragraph is any non-empty line or block of lines separated by a line break.
 */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  /** Estimated minutes to read silently. */
  readingMinutes: number;
  /** Estimated minutes to read aloud. */
  speakingMinutes: number;
}

/** Average adult silent reading speed for non-fiction (Brysbaert, 2019). */
export const READING_WPM = 238;
/** Typical conversational speaking pace. */
export const SPEAKING_WPM = 140;

const hasSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl;

function countWords(text: string): number {
  if (hasSegmenter) {
    let n = 0;
    for (const seg of new Intl.Segmenter(undefined, { granularity: "word" }).segment(text)) {
      if (seg.isWordLike) n++;
    }
    return n;
  }
  return text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function graphemes(text: string): string[] {
  if (hasSegmenter) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

function countSentences(text: string): number {
  if (hasSegmenter) {
    let n = 0;
    for (const seg of new Intl.Segmenter(undefined, { granularity: "sentence" }).segment(text)) {
      if (/[\p{L}\p{N}]/u.test(seg.segment)) n++;
    }
    return n;
  }
  return text.split(/[.!?…]+(?=\s|$)/u).filter((s) => /[\p{L}\p{N}]/u.test(s)).length;
}

export function analyzeText(text: string): TextStats {
  const chars = graphemes(text);
  const words = countWords(text);
  return {
    words,
    characters: chars.length,
    charactersNoSpaces: chars.filter((c) => !/^\s+$/u.test(c)).length,
    sentences: countSentences(text),
    paragraphs: text.split(/\r?\n/).filter((line) => line.trim().length > 0).length,
    readingMinutes: words / READING_WPM,
    speakingMinutes: words / SPEAKING_WPM,
  };
}

/** Formats minutes as "Under 1 min", "3 min" or "1 hr 5 min". */
export function formatDuration(minutes: number): string {
  if (minutes === 0) return "0 min";
  if (minutes < 1) return "Under 1 min";
  const total = Math.round(minutes);
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}
