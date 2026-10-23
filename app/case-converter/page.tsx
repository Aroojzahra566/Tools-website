import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { CaseConverter } from "@/components/tools/case-converter";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("case-converter");

export default function Page() {
  return (
    <ToolPage
      slug="case-converter"
      intro="Change the capitalization of any text in one click. Convert to UPPERCASE, lowercase, Title Case or Sentence case, then copy the result."
      tool={<CaseConverter />}
      faqs={[
        {
          question: "What is the difference between Title Case and Sentence case?",
          answer:
            "Title Case capitalizes the main words, as in “The Lord of the Rings”. Sentence case capitalizes only the first word of each sentence (and the word “I”), as in “The lord of the rings”. Sentence case is common for web headings and is how ordinary prose is written.",
        },
        {
          question: "Which words stay lowercase in Title Case?",
          answer:
            "Short articles, conjunctions and prepositions such as a, an, the, and, but, or, of, in, on, at, to, by and for stay lowercase unless they are the first or last word, or follow a colon. Style guides (AP, Chicago, APA) differ slightly, so check your guide for important headlines.",
        },
        {
          question: "Is Title Case the same as “proper case”?",
          answer:
            "Not quite. “Proper case”, such as Excel’s PROPER function, capitalizes every word, including “of” and “the”. This converter’s Title Case keeps short words like those lowercase in the middle of a title, which is what most style guides expect.",
        },
        {
          question: "Will it keep names and abbreviations correct?",
          answer:
            "Partly. In Title Case, words already written in capitals, such as “NASA” or “PDF”, are kept as they are unless your whole text is in capitals. Sentence case cannot know which words are names, so “london” or “nasa” will stay lowercase and need correcting by hand.",
        },
        {
          question: "Does it work with languages other than English?",
          answer:
            "UPPERCASE and lowercase work with any language that has capital letters, including accented and Cyrillic characters. The Title Case rules for small words are designed for English.",
        },
        {
          question: "Is my text stored?",
          answer: "No. Conversion happens in your browser and your text is never sent to a server.",
        },
      ]}
    >
      <h2>How to convert text case</h2>
      <ol>
        <li>Type or paste your text into the <strong>Original text</strong> box.</li>
        <li>Choose a style: UPPERCASE, lowercase, Title Case or Sentence case. The result updates instantly.</li>
        <li>Select <strong>Copy result</strong>. To apply another conversion on top, select <strong>Use as input</strong>.</li>
      </ol>

      <h2>The four styles</h2>
      <ul>
        <li><strong>UPPERCASE</strong> – every letter is a capital: <code>MEETING NOTES FOR MONDAY</code>. Useful for short labels and acronyms; long passages in capitals are harder to read.</li>
        <li><strong>lowercase</strong> – every letter is small: <code>meeting notes for monday</code>. Handy for cleaning up text typed with Caps Lock on, tags and email addresses.</li>
        <li><strong>Title Case</strong> – main words are capitalized: <code>Meeting Notes for Monday</code>. Used for headlines, book titles and headings.</li>
        <li><strong>Sentence case</strong> – only the first word of each sentence is capitalized: <code>Meeting notes for monday</code>. Note that “Monday” would need fixing by hand.</li>
      </ul>

      <h2>Limitations of automatic conversion</h2>
      <p>
        Software can’t reliably tell whether a word is a name, a brand or an abbreviation. Expect to review the result
        for proper nouns (people, places, days and months), brand names with unusual capitals such as “iPhone”, and
        abbreviations followed by full stops, such as “e.g.”, which Sentence case can mistake for the end of a
        sentence.
      </p>
      <p>
        Your original text is never changed by switching styles, so you can compare all four before copying. To check
        the length of your text, use the <Link href="/word-counter">Word Counter</Link>.
      </p>
    </ToolPage>
  );
}
