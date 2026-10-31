import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "what-is-a-capitalization-converter";
export const metadata = postMetadata(SLUG);

const s = {
  what: "What is a capitalization converter?",
  compare: "The four capitalization styles compared",
  lower: "How to convert uppercase to lowercase",
  upper: "How to convert lowercase to uppercase",
  title: "What is title case?",
  sentence: "What is sentence case?",
  examples: "Practical examples",
  apps: "Changing case in Word, Google Docs and Excel",
  limits: "What automatic conversion can’t do",
  mistakes: "Common capitalization mistakes",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> a capitalization converter is a tool that changes which letters in your
        text are capitals, without retyping anything. You paste text in, choose a style such as UPPERCASE, lowercase,
        Title Case or Sentence case, and copy the result. It is the quickest way to fix text typed with Caps Lock on or
        to make a set of headings consistent.
      </p>
      <p>
        This guide explains each style, shows how to convert text in both directions, and covers the rules and
        mistakes worth knowing before you publish a heading or send an email.
      </p>

      <ToolCallout tool="case-converter">
        Paste your text and switch between UPPERCASE, lowercase, Title Case and Sentence case. Your original text stays
        unchanged, so you can compare styles before copying.
      </ToolCallout>

      <h2 id="what">{s.what}</h2>
      <p>
        A capitalization converter, also called a case converter, applies capitalization rules to a block of text. The
        simple styles change every letter: uppercase makes them all capitals, lowercase makes them all small. The
        other two follow writing conventions: title case capitalizes the main words, and sentence case capitalizes
        the first word of each sentence.
      </p>
      <p>
        Only the capitalization changes. Punctuation, spaces, numbers and line breaks stay exactly as you wrote them.
        The <Link href="/case-converter">QuickToolsWorld Case Converter</Link> supports the four styles below and
        processes your text in your browser, without sending it to a server.
      </p>

      <h2 id="compare">{s.compare}</h2>
      <p>Here is the same phrase in each style, exactly as our converter produces it:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Style</th>
              <th scope="col">Result</th>
              <th scope="col">Typical use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UPPERCASE</td>
              <td>
                <code>THE QUICK GUIDE TO WRITING BETTER EMAIL SUBJECT LINES</code>
              </td>
              <td>Short labels, warnings, acronyms</td>
            </tr>
            <tr>
              <td>lowercase</td>
              <td>
                <code>the quick guide to writing better email subject lines</code>
              </td>
              <td>Tags, usernames, cleaning up text</td>
            </tr>
            <tr>
              <td>Title Case</td>
              <td>
                <code>The Quick Guide to Writing Better Email Subject Lines</code>
              </td>
              <td>Headlines, book and article titles</td>
            </tr>
            <tr>
              <td>Sentence case</td>
              <td>
                <code>The quick guide to writing better email subject lines</code>
              </td>
              <td>Body text, many web and app headings</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="lower">{s.lower}</h2>
      <ol>
        <li>
          Open the <Link href="/case-converter">Case Converter</Link> and paste your text into the{" "}
          <strong>Original text</strong> box.
        </li>
        <li>
          Select <strong>lowercase</strong>. The result appears instantly.
        </li>
        <li>
          Select <strong>Copy result</strong> and paste it where you need it.
        </li>
      </ol>
      <p>
        If the text was typed with Caps Lock on, <strong>Sentence case</strong> is usually a better choice than
        lowercase, because it restores the capital at the start of each sentence:
      </p>
      <pre>
        <code>
          {"Original:      PLEASE SUBMIT YOUR TIMESHEET BY FRIDAY. THANKS!\nlowercase:     please submit your timesheet by friday. thanks!\nSentence case: Please submit your timesheet by friday. Thanks!"}
        </code>
      </pre>
      <p>
        Notice that “Friday” needs fixing by hand. A converter can’t tell which words are names; more on that below.
      </p>

      <h2 id="upper">{s.upper}</h2>
      <p>
        The process is the same: paste the text, select <strong>UPPERCASE</strong> and copy the result. Uppercase works
        with any language that has capital letters, including accented and Cyrillic characters.
      </p>
      <p>Use capitals sparingly. They suit:</p>
      <ul>
        <li>Acronyms and codes, such as NASA, PDF or a booking reference.</li>
        <li>Short labels and warnings, such as DRAFT or DO NOT ENTER.</li>
        <li>Forms or systems that require block capitals.</li>
      </ul>
      <p>
        Long passages in capitals are harder to read, because every word has the same rectangular shape, and in emails
        and messages they read as shouting.
      </p>

      <h2 id="title">{s.title}</h2>
      <p>
        Title case capitalizes the main words of a title and leaves short minor words lowercase. Our converter
        follows a simplified headline style:
      </p>
      <ul>
        <li>The first and last words are always capitalized, as is the first word after a colon.</li>
        <li>
          Short articles, conjunctions and prepositions stay lowercase in the middle of a title. The full list is a, an,
          the, and, but, or, nor, for, so, yet, if, than, as, at, by, from, in, into, of, off, on, onto, per, to, up, via,
          vs and with.
        </li>
        <li>Words already in capitals, such as NASA or PDF, are kept, unless the whole text is in capitals.</li>
      </ul>
      <p>
        Style guides disagree on the details, so check the one you need to follow. In{" "}
        <a href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case" rel="noopener">
          APA title case
        </a>
        , every word of four letters or more is capitalized, so “From” and “With” take capitals. AP style also
        capitalizes prepositions of four or more letters. Chicago and MLA lowercase prepositions whatever their
        length. After converting, adjust the few words your guide treats differently.
      </p>
      <p>
        Title case is not the same as capitalizing every word. Excel’s <code>PROPER</code> function and Google Docs’
        Title Case option capitalize every word, including “of” and “the”.
      </p>

      <h2 id="sentence">{s.sentence}</h2>
      <p>
        Sentence case capitalizes only the first word of each sentence, plus proper nouns and the pronoun “I”. It is how
        ordinary prose is written, and many organizations use it for headings too. The{" "}
        <a href="https://learn.microsoft.com/en-us/style-guide/capitalization" rel="noopener">
          Microsoft Writing Style Guide
        </a>{" "}
        and{" "}
        <a href="https://developers.google.com/style/capitalization" rel="noopener">
          Google’s developer documentation style guide
        </a>{" "}
        both use sentence case for most titles and headings, because it is easier to read and to apply consistently. APA uses{" "}
        <a href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case" rel="noopener">
          sentence case
        </a>{" "}
        for the titles of articles and books in reference lists.
      </p>
      <p>
        Our converter capitalizes the first letter of the text, of each new sentence after a full stop, question mark
        or exclamation mark, and of each new line. It also capitalizes “I” and its contractions, such as “I’m” and
        “I’ll”. Everything else becomes lowercase:
      </p>
      <pre>
        <code>
          {"Original:      i think we should meet on monday. what do you think?\nSentence case: I think we should meet on monday. What do you think?"}
        </code>
      </pre>

      <h2 id="examples">{s.examples}</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Style</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Blog post headline</td>
              <td>Title Case</td>
              <td>
                <code>A Beginner&apos;s Guide to Saving Money on Groceries</code>
              </td>
            </tr>
            <tr>
              <td>Heading with a subtitle</td>
              <td>Title Case</td>
              <td>
                <code>Why Time Management Matters: A Guide for Students</code>
              </td>
            </tr>
            <tr>
              <td>Report section heading</td>
              <td>Sentence case</td>
              <td>
                <code>Results from the 2026 survey: what we learned</code>
              </td>
            </tr>
            <tr>
              <td>A list typed on separate lines</td>
              <td>Sentence case</td>
              <td>
                <code>Notes for the team / Agenda for monday / Budget review</code>
              </td>
            </tr>
            <tr>
              <td>Hashtags or file names</td>
              <td>lowercase</td>
              <td>
                <code>budget review notes</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        In the list example, each line is converted separately (shown here with slashes), and “monday” still needs its
        capital. Choose one style for all headings in a document or website and use it consistently.
      </p>

      <h2 id="apps">{s.apps}</h2>
      <p>If your text is already in an editor, you may not need a separate tool:</p>
      <ul>
        <li>
          <strong>Microsoft Word:</strong> select the text and press Shift + F3 (on a Mac, add the Fn key if needed)
          to cycle through lowercase, UPPERCASE and Capitalize Each Word. Home › Change Case also offers Sentence case.
        </li>
        <li>
          <strong>Google Docs:</strong> Format › Text › Capitalization offers lowercase, UPPERCASE and Title Case, which
          capitalizes every word.
        </li>
        <li>
          <strong>Excel and Google Sheets:</strong> the formulas <code>=UPPER(A1)</code>, <code>=LOWER(A1)</code> and{" "}
          <code>=PROPER(A1)</code> convert the text in cell A1.
        </li>
      </ul>
      <p>
        An online converter is handy when you are working outside these apps, such as in a content management system,
        an email or a social media post, or when you want title case that keeps short words lowercase.
      </p>

      <h2 id="limits">{s.limits}</h2>
      <p>Capitalization rules depend on meaning, which software can only guess. Always review the result for:</p>
      <ul>
        <li>
          <strong>Proper nouns:</strong> sentence case lowercases names, days and places, giving “monday” and “mars”.
        </li>
        <li>
          <strong>Acronyms in sentence case:</strong> “NASA and the ESA” becomes “Nasa and the esa”. Title case keeps
          them, unless the whole text is in capitals.
        </li>
        <li>
          <strong>Brand names with unusual capitals:</strong> title case turns “iphone” into “Iphone”, not “iPhone”.
        </li>
        <li>
          <strong>Phrasal verbs:</strong> “How to set up your new iphone” becomes “How to Set up Your New Iphone”,
          although most style guides capitalize “Up” in “Set Up”.
        </li>
        <li>
          <strong>Abbreviations with full stops:</strong> “e.g.” can be mistaken for the end of a sentence, so the next
          word may be capitalized.
        </li>
      </ul>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Mixing styles</strong>, with some headings in title case and others in sentence case.
        </li>
        <li>
          <strong>Writing whole sentences in capitals</strong> for emphasis. Use bold text or clearer wording instead.
        </li>
        <li>
          <strong>Capitalizing ordinary nouns</strong> to make them seem important, such as “our Customers value
          Quality”.
        </li>
        <li>
          <strong>Forgetting proper nouns</strong> after converting to lowercase or sentence case.
        </li>
        <li>
          <strong>Ignoring the style after a colon.</strong> Guides differ: in title case the first word after a colon
          is capitalized, while in sentence case many guides keep it lowercase unless a full sentence follows.
        </li>
      </ul>

      <ArticleFaq
        items={[
          {
            q: "What is a capitalization converter?",
            a: "It is a tool that changes the capitalization of text without retyping it. You paste text, choose a style such as UPPERCASE, lowercase, Title Case or Sentence case, and copy the converted version. Only the letters’ case changes; punctuation, spacing and line breaks stay the same.",
          },
          {
            q: "How do I convert lowercase to uppercase?",
            a: (
              <>
                Paste your text into the <Link href="/case-converter">Case Converter</Link>, select UPPERCASE and then
                Copy result. In Word, select the text and press Shift + F3 until it is in capitals. In Excel or Google
                Sheets, use <code>=UPPER(A1)</code>.
              </>
            ),
          },
          {
            q: "What is title case?",
            a: "Title case capitalizes the main words of a title, such as nouns, verbs and adjectives, and keeps short words like “a”, “the”, “and” and “of” lowercase unless they come first or last. For example: “The Lord of the Rings”. Style guides such as APA, AP and Chicago differ slightly on which short words stay lowercase.",
          },
          {
            q: "What is sentence case?",
            a: "Sentence case capitalizes only the first word of each sentence, along with proper nouns and the word “I”. For example, “The Lord of the Rings” becomes “The lord of the rings” in sentence case. Many websites, apps and style guides use sentence case for headings because it is easy to read.",
          },
          {
            q: "When should I use uppercase letters?",
            a: "Use all capitals for acronyms, short labels and warnings, and forms that ask for block capitals. Avoid them for long passages, headings full of words, and emails or messages, where whole sentences in capitals are harder to read and come across as shouting.",
          },
          {
            q: "Will converting text change my punctuation or line breaks?",
            a: "No. A capitalization converter changes only whether letters are capitals. Punctuation, numbers, spaces and line breaks are kept exactly, and with our converter your original text stays in the input box so you can try another style.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        A capitalization converter switches text between UPPERCASE, lowercase, Title Case and Sentence case in one
        click. Use sentence case to fix Caps Lock text and for many headings, title case for headlines, and capitals
        only for short labels and acronyms. Then check names and acronyms by hand. Try it with the{" "}
        <Link href="/case-converter">Case Converter</Link>, check the length of your text with the{" "}
        <Link href="/word-counter">Word Counter</Link>, or browse all our <Link href="/tools">free tools</Link>.
      </p>
    </ArticleLayout>
  );
}
