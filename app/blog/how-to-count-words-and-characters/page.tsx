import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";
import { READING_WPM, SPEAKING_WPM } from "@/lib/tools/word-count";

const SLUG = "how-to-count-words-and-characters";
export const metadata = postMetadata(SLUG);

const s = {
  what: "What a word counter measures",
  difference: "Words versus characters",
  spaces: "Character count with and without spaces",
  sentences: "How sentences and paragraphs are counted",
  steps: "How to count words and characters online",
  limits: "Common word and character limits",
  uses: "When an accurate count matters",
  differences: "Why counters sometimes disagree",
  tips: "Tips for hitting a word or character limit",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> paste your text into an online word counter and it shows the number of
        words, characters, sentences and paragraphs straight away. A <strong>word</strong> is a run of letters or
        digits, while a <strong>character</strong> is every single letter, digit, punctuation mark and, in most counts,
        every space. When a limit is set in characters, check whether it includes spaces, because the two figures can
        differ by 15–20% in ordinary English text.
      </p>
      <p>
        This guide explains what each number means, how spaces, sentences and paragraphs are counted, the limits you
        are most likely to meet, and why two tools can give slightly different totals for the same text.
      </p>

      <ToolCallout tool="word-counter">
        Count words, characters with and without spaces, sentences and paragraphs as you type, with reading and
        speaking time estimates. Your text stays in your browser.
      </ToolCallout>

      <h2 id="what">{s.what}</h2>
      <p>A word counter reads your text and reports several separate measurements:</p>
      <ul>
        <li>
          <strong>Words:</strong> how many words the text contains. This is what essays, articles and reports are
          usually measured in.
        </li>
        <li>
          <strong>Characters:</strong> every letter, digit, punctuation mark, symbol and space. Social media posts,
          text messages and many application forms are measured this way.
        </li>
        <li>
          <strong>Characters without spaces:</strong> the same count with spaces, tabs and line breaks removed. Some
          translators and publishers use this figure for pricing.
        </li>
        <li>
          <strong>Sentences and paragraphs:</strong> useful for checking readability and structure, such as whether a
          paragraph has grown too long.
        </li>
        <li>
          <strong>Reading and speaking time:</strong> estimates of how long the text takes to read silently or deliver
          as a speech.
        </li>
      </ul>

      <h2 id="difference">{s.difference}</h2>
      <p>
        Word count and character count measure different things, and one can’t be converted exactly into the other.
        Take the sentence <code>Write clearly. Count carefully!</code>:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Measurement</th>
              <th scope="col">Result</th>
              <th scope="col">What is counted</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Words</td>
              <td>4</td>
              <td>Write, clearly, Count, carefully</td>
            </tr>
            <tr>
              <td>Characters (with spaces)</td>
              <td>31</td>
              <td>26 letters, 2 punctuation marks and 3 spaces</td>
            </tr>
            <tr>
              <td>Characters (no spaces)</td>
              <td>28</td>
              <td>The same, minus the 3 spaces</td>
            </tr>
            <tr>
              <td>Sentences</td>
              <td>2</td>
              <td>Each ends with a full stop or exclamation mark</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Average word length varies with the subject and writing style, so a text with long technical words uses more
        characters per word than a children’s story. If a limit is given in characters, count characters. Don’t
        estimate them from the word count.
      </p>

      <h2 id="spaces">{s.spaces}</h2>
      <p>
        Spaces <em>are</em> characters, and most character limits include them. In the example above, three spaces make
        the difference between 31 and 28 characters. In ordinary English prose, spaces make up roughly one character
        in every six.
      </p>
      <p>Which figure should you use?</p>
      <ul>
        <li>
          <strong>Use the count with spaces</strong> for social media posts, text messages, meta descriptions and most
          online forms. If the instructions don’t say, assume spaces count. That is the safer choice, because the total
          with spaces is always the larger number.
        </li>
        <li>
          <strong>Use the count without spaces</strong> only when the instructions say so explicitly, for example some
          translation quotes and publishing contracts.
        </li>
      </ul>
      <p>
        Line breaks count too. In the <Link href="/word-counter">Word Counter</Link>, the “Characters” figure includes
        spaces, tabs and line breaks, and an emoji or accented letter counts as one character, matching what you see
        on screen. Other systems may count some emoji as two characters, which is worth remembering if a limit is very
        tight.
      </p>

      <h2 id="sentences">{s.sentences}</h2>
      <p>
        <strong>Sentences</strong> are usually split at a full stop, question mark or exclamation mark followed by a
        space or the end of the text. Abbreviations make this harder: a counter has to decide whether the full stop in
        “a.m.” or “e.g.” ends a sentence. Good counters use language rules to get most of these right, but treat the
        sentence count as a close estimate rather than an exact figure.
      </p>
      <p>
        <strong>Paragraphs</strong> are usually counted as blocks of text separated by line breaks. Here is a short
        message and how the Word Counter reads it:
      </p>
      <pre>
        <code>{"Dear team,\n\nThanks for your help this week. The report is ready.\nPlease send comments by Friday."}</code>
      </pre>
      <ul>
        <li>
          <strong>17 words.</strong>
        </li>
        <li>
          <strong>4 sentences:</strong> “Dear team,” sits on its own line, so it counts as one, followed by the three
          sentences below it.
        </li>
        <li>
          <strong>3 paragraphs:</strong> every non-empty line counts as a paragraph, and the blank line is ignored.
        </li>
      </ul>
      <p>
        Word processors may treat a single line break inside a paragraph differently, so if your paragraph count is
        important, check that the text has the line breaks you expect after pasting.
      </p>

      <h2 id="steps">{s.steps}</h2>
      <ol>
        <li>
          Open the <Link href="/word-counter">Word Counter</Link>.
        </li>
        <li>
          Type in the text box, or paste text from a document, email or web page. Pasted text keeps its line breaks, so
          paragraphs are counted as they appear.
        </li>
        <li>
          Read the totals next to the editor: words, characters, characters without spaces, sentences, paragraphs, and
          reading and speaking time. They update with every change.
        </li>
        <li>Edit the text in place until it fits your limit, watching the numbers change as you go.</li>
        <li>
          Select <strong>Copy text</strong> to copy the edited version back into your document or form, or{" "}
          <strong>Clear</strong> to start again.
        </li>
      </ol>
      <p>
        Counting happens in your browser, and the text isn’t uploaded or stored. Word boundaries come from your
        browser’s built-in language rules, so text in languages such as Urdu, Hindi, Arabic and Spanish is counted as
        well as English. Chinese and Japanese don’t separate words with spaces, so their word counts are estimates,
        and the character count is often more useful for them.
      </p>
      <p>
        Reading time is calculated at {READING_WPM} words per minute and speaking time at {SPEAKING_WPM} words per
        minute. For a 1,000-word text, that is about {Math.round(1000 / READING_WPM)} minutes to read and about{" "}
        {Math.round(1000 / SPEAKING_WPM)} minutes to read aloud. Treat both as averages: real speed depends on the
        reader and how complex the text is.
      </p>

      <h2 id="limits">{s.limits}</h2>
      <p>
        These are some limits people often check text against. Platforms and institutions change their rules, so
        always confirm the current limit in the official instructions.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Where</th>
              <th scope="col">Limit</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Common App personal essay (US college applications)</td>
              <td>250–650 words</td>
              <td>Measured in words, not characters.</td>
            </tr>
            <tr>
              <td>UCAS personal statement (UK universities, 2026 entry onwards)</td>
              <td>4,000 characters</td>
              <td>
                Spread across three questions, with at least 350 characters for each answer. Spaces count. See{" "}
                <a
                  href="https://www.ucas.com/applying/applying-to-university/writing-your-personal-statement/how-to-write-your-personal-statement-for-2026-entry-onwards"
                  rel="noopener"
                >
                  UCAS’s guidance
                </a>
                .
              </td>
            </tr>
            <tr>
              <td>Post on X (formerly Twitter)</td>
              <td>280 characters</td>
              <td>For standard accounts. Links and some characters are counted differently by X itself.</td>
            </tr>
            <tr>
              <td>Single SMS text message</td>
              <td>160 characters</td>
              <td>
                Falls to 70 characters if the message contains emoji or letters outside the basic character set. Longer
                messages are split into parts.
              </td>
            </tr>
            <tr>
              <td>Meta description for a web page</td>
              <td>No fixed limit</td>
              <td>Google often shortens descriptions in search results after roughly 150–160 characters.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        School and university assignments usually set their own word range, such as 1,500–2,000 words. Many allow a
        margin of around 10% either way, but that is a convention, not a rule, so ask your instructor and check whether
        headings, footnotes, quotations and the reference list are included.
      </p>

      <h2 id="uses">{s.uses}</h2>
      <ul>
        <li>
          <strong>Academic writing:</strong> essays, dissertations and abstracts often have strict word limits, and
          going over can cost marks.
        </li>
        <li>
          <strong>Applications:</strong> college essays, scholarship forms, grant proposals and job applications
          frequently cut off text that is too long, sometimes without warning.
        </li>
        <li>
          <strong>Professional writing:</strong> press releases, product descriptions and executive summaries work best
          when they are short and focused.
        </li>
        <li>
          <strong>Speeches and presentations:</strong> speaking time tells you whether a talk fits its slot before you
          rehearse it.
        </li>
        <li>
          <strong>Websites and social media:</strong> page titles, meta descriptions, captions and posts all have
          practical or enforced character limits.
        </li>
        <li>
          <strong>Translation and copywriting:</strong> quotes are often priced per word or per character, so both
          sides need the same count.
        </li>
      </ul>

      <h2 id="differences">{s.differences}</h2>
      <p>
        Different tools can disagree by a few words on the same text, because there is no single rule for what counts
        as a word. Take <code>It’s 2026, and state-of-the-art tools cost $0.</code>:
      </p>
      <ul>
        <li>
          The <Link href="/word-counter">Word Counter</Link> follows the Unicode word rules built into your browser. It
          counts “It’s” as one word and splits “state-of-the-art” at the hyphens, giving 10 words.
        </li>
        <li>
          A program that only splits text at spaces would count “state-of-the-art” and “$0.” as one word each, giving
          7.
        </li>
      </ul>
      <p>Other things that commonly cause differences:</p>
      <ul>
        <li>
          <strong>Hyphenated words</strong> such as “e-mail” or “well-known”.
        </li>
        <li>
          <strong>Numbers, times and symbols</strong>, for example “9:30”, “$0” or “50%”.
        </li>
        <li>
          <strong>Web addresses and email addresses</strong>, which some tools treat as one word and others split
          into parts.
        </li>
        <li>
          <strong>Text that doesn’t paste</strong>, such as text inside images, and sometimes footnotes, text boxes or
          comments in a document.
        </li>
        <li>
          <strong>Languages without spaces</strong>, such as Chinese and Japanese, where word boundaries have to be
          estimated.
        </li>
      </ul>
      <p>
        If an exact count decides whether your submission is accepted, use the count shown by the system you are
        submitting to, and leave yourself a small margin.
      </p>

      <h2 id="tips">{s.tips}</h2>
      <p>To cut words without losing meaning:</p>
      <ul>
        <li>Remove filler phrases: “in order to” becomes “to”, and “due to the fact that” becomes “because”.</li>
        <li>Delete sentences that repeat a point you have already made.</li>
        <li>Prefer active verbs: “the team approved the plan” is shorter than “the plan was approved by the team”.</li>
        <li>Replace a long list of examples with the one or two strongest.</li>
      </ul>
      <p>When you need to reach a minimum, add substance, not padding:</p>
      <ul>
        <li>Add a specific example, figure or source that supports your argument.</li>
        <li>Explain the “why” behind a claim, or address an obvious objection.</li>
        <li>Check the brief for any question you haven’t yet answered.</li>
      </ul>
      <p>
        Need to fix capitalization while you edit, such as a heading typed with Caps Lock on? The{" "}
        <Link href="/case-converter">Case Converter</Link> changes text to sentence case, title case, uppercase or
        lowercase in one click. You can find every free tool on the <Link href="/tools">tools page</Link>.
      </p>

      <ArticleFaq
        items={[
          {
            q: "How can I count words online?",
            a: (
              <>
                Paste your text into an online word counter such as the{" "}
                <Link href="/word-counter">QuickToolsWorld Word Counter</Link>. It shows the word count immediately,
                along with characters, sentences, paragraphs and reading time, and updates as you edit. Your text is
                counted in your browser and isn’t uploaded.
              </>
            ),
          },
          {
            q: "Do spaces count as characters in a character limit?",
            a: "Usually, yes. Most character limits, including those for social media posts, text messages and many application forms, count every space and line break. Only use a count without spaces when the instructions specifically ask for one.",
          },
          {
            q: "What is the difference between words and characters?",
            a: "A word is a run of letters or digits separated by spaces or punctuation. A character is any single letter, digit, punctuation mark, symbol or space. “Write clearly.” is 2 words but 14 characters, including the space and the full stop.",
          },
          {
            q: "Why do different word counters give different totals?",
            a: "Tools follow different rules for hyphenated words, contractions, numbers, web addresses and symbols, and some skip footnotes or text boxes. The difference is usually a few words in a long document. When a limit is strict, rely on the count shown by the system you are submitting to.",
          },
          {
            q: "Do headings and references count toward a word limit?",
            a: "It depends on the rules you are given. Many universities exclude the reference list and sometimes headings, tables or appendices, while others count everything. Check your assignment brief or ask, and remember that an online counter counts whatever text you paste into it.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        Words and characters measure different things: use the word count for essays and articles, and the character
        count, usually including spaces, for posts, messages and forms. Sentence and paragraph counts help you check
        structure, and small differences between tools come from different rules, not errors. To check your own text,
        open the <Link href="/word-counter">Word Counter</Link>, and for more step-by-step guides, browse the{" "}
        <Link href="/blog">blog</Link>.
      </p>
    </ArticleLayout>
  );
}
