import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { WordCounter } from "@/components/tools/word-counter";
import { toolMetadata } from "@/lib/metadata";
import { READING_WPM, SPEAKING_WPM } from "@/lib/tools/word-count";

export const metadata = toolMetadata("word-counter");

export default function Page() {
  return (
    <ToolPage
      slug="word-counter"
      intro="Paste or type any text to count its words, characters, sentences and paragraphs instantly, with an estimate of how long it takes to read."
      tool={<WordCounter />}
      faqs={[
        {
          question: "How does the word counter decide what counts as a word?",
          answer:
            "It uses your browser’s built-in Unicode word segmentation (Intl.Segmenter). Runs of letters or numbers count as words, and punctuation, spaces and emoji do not. Contractions such as “don’t” count as one word, while hyphenated words such as “well-known” count as two. Different word processors use slightly different rules, so counts may vary by a few words on long documents.",
        },
        {
          question: "Are spaces and line breaks counted as characters?",
          answer:
            "The “Characters” figure includes spaces, tabs and line breaks. “Characters (no spaces)” excludes all whitespace. Emoji and accented letters count as one character each, matching what you see on screen.",
        },
        {
          question: "How is reading time calculated?",
          answer: `Reading time divides the word count by ${READING_WPM} words per minute, a commonly cited average for adults reading non-fiction silently. Speaking time uses ${SPEAKING_WPM} words per minute. Actual speed depends on the reader and how complex the text is.`,
        },
        {
          question: "Does it count words in Urdu, Hindi, Arabic or Chinese?",
          answer:
            "Yes. Word boundaries come from your browser’s built-in language rules, so text in Urdu, Hindi, Arabic and most other languages that separate words with spaces is counted accurately, along with sentences ending in marks such as ۔ or ।. Chinese and Japanese don’t use spaces, so the browser splits them into dictionary words, and the result is an estimate. For those languages, the character count is often the more useful figure.",
        },
        {
          question: "Is there a limit on how much text I can paste?",
          answer:
            "There is no fixed limit. Very long documents (several hundred thousand words) may take a moment to count on slower devices, but typing stays responsive.",
        },
        {
          question: "Is my text saved or sent anywhere?",
          answer:
            "No. Counting happens in your browser. The text is not uploaded, stored or logged, and it disappears when you close or reload the page.",
        },
      ]}
    >
      <h2>How to use the word counter</h2>
      <ol>
        <li>Type in the text box, or paste text from a document, email or website.</li>
        <li>Read the live totals next to the editor. They update with every change.</li>
        <li>Use <strong>Copy text</strong> to copy your edited text, or <strong>Clear</strong> to start again.</li>
      </ol>

      <h2>What each number means</h2>
      <ul>
        <li><strong>Words</strong> – sequences of letters or digits, separated by spaces or punctuation.</li>
        <li><strong>Characters</strong> – every visible character plus spaces and line breaks.</li>
        <li><strong>Characters (no spaces)</strong> – the same count with all whitespace removed. Some publishers and translators price work using this number.</li>
        <li><strong>Sentences</strong> – text segments ending in a full stop, question mark or exclamation mark, or the end of the text. Abbreviations such as “e.g.” can occasionally be read as a sentence end.</li>
        <li><strong>Paragraphs</strong> – each block of text separated by a line break. Blank lines are ignored.</li>
        <li><strong>Reading and speaking time</strong> – estimates based on average reading ({READING_WPM} words per minute) and speaking ({SPEAKING_WPM} words per minute) speeds.</li>
      </ul>

      <h2>Common length limits</h2>
      <p>
        Word and character counts matter whenever a platform or assignment sets a limit. A few examples:
      </p>
      <ul>
        <li>Search result titles are often shortened after about 50–60 characters, and meta descriptions after about 150–160.</li>
        <li>Posts on X are limited to 280 characters for standard accounts.</li>
        <li>School and university essays usually set a word range, such as 1,500–2,000 words. Check whether your instructor counts headings and references.</li>
      </ul>
      <p>
        If you need to change capitalisation after editing, the <Link href="/case-converter">Case Converter</Link>{" "}
        converts text to uppercase, lowercase, title case or sentence case.
      </p>

      <h2>Example</h2>
      <p>
        The sentence <code>It’s a well-known fact: tools save time.</code> contains 8 words (“It’s” is one word,
        “well-known” is two), 40 characters including spaces, 34 without spaces, and 1 sentence.
      </p>
    </ToolPage>
  );
}
