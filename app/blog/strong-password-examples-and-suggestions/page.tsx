import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "strong-password-examples-and-suggestions";
export const metadata = postMetadata(SLUG);

const s = {
  looks: "What a strong password looks like",
  traits: "Six characteristics of a strong password",
  patterns: "Why predictable patterns are easy to guess",
  length: "How long should a suggested password be?",
  words: "Random words: a suggestion you can remember",
  get: "How to get a strong password suggestion",
  missing: "Why your browser isn’t suggesting a strong password",
  reuse: "Never reuse a suggestion or an example",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> a strong password looks like random noise. It is at least 16 characters
        long, mixes uppercase and lowercase letters, numbers and symbols in no recognizable order, and contains no
        words, names or dates you chose yourself. The easiest way to get one is to accept the suggestion from your
        browser or password manager, or to use a password generator.
      </p>
      <p>
        This guide shows the difference between weak and strong passwords with examples, explains the patterns that
        make passwords guessable, and walks through getting a strong suggestion in Chrome, on an iPhone and with our
        generator.
      </p>

      <blockquote>
        <strong>The examples here are for illustration only.</strong> Any password published online, including every
        example on this page, should be treated as already known to attackers. Never use one for a real account.
        Generate your own instead.
      </blockquote>

      <ToolCallout tool="password-generator">
        Get a fresh strong password suggestion in one click, with the length and characters you choose.
      </ToolCallout>

      <h2 id="looks">{s.looks}</h2>
      <p>
        Weak passwords tend to look reasonable to people, which is exactly why attackers try them first. Strong ones
        look meaningless.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Example (don’t use)</th>
              <th scope="col">Verdict</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>password123</code>
              </td>
              <td>Weak</td>
              <td>One of the most common passwords in breach lists</td>
            </tr>
            <tr>
              <td>
                <code>Summer2026!</code>
              </td>
              <td>Weak</td>
              <td>A season, a year and a symbol: a textbook pattern</td>
            </tr>
            <tr>
              <td>
                <code>P@ssw0rd</code>
              </td>
              <td>Weak</td>
              <td>Character swaps like @ for a and 0 for o are tried automatically</td>
            </tr>
            <tr>
              <td>
                <code>Jennifer1987</code>
              </td>
              <td>Weak</td>
              <td>A name and a birth year can often be found online</td>
            </tr>
            <tr>
              <td>
                <code>qwertyuiop</code>
              </td>
              <td>Weak</td>
              <td>A row of the keyboard</td>
            </tr>
            <tr>
              <td>
                <code>{"Dd}RcK35KAx_sOdb"}</code>
              </td>
              <td>Strong</td>
              <td>16 random characters from all four character types</td>
            </tr>
            <tr>
              <td>
                <code>znZgR9WQwrtt4a3fuB</code>
              </td>
              <td>Strong</td>
              <td>18 random characters; long enough not to need symbols</td>
            </tr>
            <tr>
              <td>
                <code>plaza-ember-mostly-crater-violin</code>
              </td>
              <td>Strong</td>
              <td>Five randomly chosen, unrelated words</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The strong examples were created by a random process, not invented by a person. That is the real difference:
        how a password was made matters more than how complicated it looks.
      </p>

      <h2 id="traits">{s.traits}</h2>
      <p>Use this checklist to judge any password, including one suggested to you:</p>
      <ol>
        <li>
          <strong>Long:</strong> 16 or more characters, or five or more random words.
        </li>
        <li>
          <strong>Random:</strong> created by a generator, a password manager or dice, not chosen by you.
        </li>
        <li>
          <strong>Unique:</strong> used for one account and nowhere else.
        </li>
        <li>
          <strong>Free of personal details:</strong> no names, birthdays, pets, addresses or favorite teams.
        </li>
        <li>
          <strong>Not a known password:</strong> not something that appears in breach lists, song lyrics or quotes.
        </li>
        <li>
          <strong>Private:</strong> never shared by email or chat, and not stored in plain text.
        </li>
      </ol>
      <p>
        A password that passes the first five is difficult to guess. The sixth keeps it that way. Our guide to{" "}
        <Link href="/blog/how-to-create-a-secure-password">creating a secure password</Link> covers that side in
        detail.
      </p>

      <h2 id="patterns">{s.patterns}</h2>
      <p>
        Password-cracking tools don’t just try every combination in order. They start with lists of leaked passwords
        and dictionary words, then apply the changes people usually make. These patterns are among the first they test:
      </p>
      <ul>
        <li>
          <strong>Capital first, number and symbol last:</strong> <code>Welcome1!</code>
        </li>
        <li>
          <strong>Years and dates:</strong> <code>Football2026</code>, <code>march0315</code>
        </li>
        <li>
          <strong>Keyboard walks:</strong> <code>1qaz2wsx</code>, <code>asdfgh</code>
        </li>
        <li>
          <strong>Character swaps:</strong> <code>$unsh1ne</code>
        </li>
        <li>
          <strong>Repeated or doubled words:</strong> <code>monkeymonkey</code>
        </li>
        <li>
          <strong>The site’s own name:</strong> <code>Netflix2026</code>
        </li>
      </ul>
      <p>
        Each of these follows rules a computer can predict, so the number of guesses needed is tiny compared with a
        random password of the same length.
      </p>

      <h2 id="length">{s.length}</h2>
      <p>
        Many sites accept 8 characters, but a site’s minimum is not a recommendation. Here is what current guidance
        says:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Situation</th>
              <th scope="col">Suggested length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Password stored in a password manager</td>
              <td>16 to 20 characters or more (CISA recommends at least 16)</td>
            </tr>
            <tr>
              <td>Password used without a second factor</td>
              <td>
                At least 15 characters (the minimum in{" "}
                <a href="https://pages.nist.gov/800-63-4/sp800-63b.html" rel="noopener">
                  NIST SP 800-63B
                </a>
                )
              </td>
            </tr>
            <tr>
              <td>Site with a low maximum length</td>
              <td>The longest the site allows, plus multifactor authentication</td>
            </tr>
            <tr>
              <td>Password you type from memory</td>
              <td>A passphrase of five or more random words</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If you need a specific length, such as 8, 12 or 14 characters, our{" "}
        <Link href="/password-generator">Password Generator</Link> creates any length from 4 to 128. The guide to{" "}
        <Link href="/blog/how-to-generate-a-strong-password">generating a strong password</Link> compares how strong
        each length is.
      </p>

      <h2 id="words">{s.words}</h2>
      <p>
        Random words make good suggestions for passwords you have to remember, as long as a random process chooses
        them. Compare:
      </p>
      <ul>
        <li>
          <strong>Weak:</strong> <code>iloveyoutoo</code> or a line from a song. These are phrases people already say,
          so they appear in cracking word lists.
        </li>
        <li>
          <strong>Strong:</strong> five or more unrelated words picked at random from a large word list, such as{" "}
          <code>plaza-ember-mostly-crater-violin</code> above.
        </li>
      </ul>
      <p>
        The UK National Cyber Security Centre recommends a simple version of this approach, combining{" "}
        <a
          href="https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/three-random-words"
          rel="noopener"
        >
          three random words
        </a>
        . Our <Link href="/blog/how-to-create-strong-passwords">step-by-step guide to creating a strong password</Link>{" "}
        shows how to pick the words with dice, and how many you need.
      </p>

      <h2 id="get">{s.get}</h2>
      <p>
        You don’t have to invent a strong password. These tools will suggest one, and the first two save it for you
        at the same time.
      </p>
      <h3>In Google Chrome</h3>
      <ol>
        <li>Sign in to Chrome on your computer.</li>
        <li>Open the sign-up page of a website and select the password box.</li>
        <li>
          Select <strong>Use strong password</strong>. If it doesn’t appear, right-click the password box and choose{" "}
          <strong>Generate password</strong>.
        </li>
        <li>
          Review the preview, select <strong>Use suggested password</strong>, and finish signing up.
        </li>
      </ol>
      <p>
        Google says the generated password is saved to your Google Account automatically. The steps are from{" "}
        <a href="https://support.google.com/chrome/answer/7570435" rel="noopener">
          Chrome’s help page on passwords
        </a>
        .
      </p>
      <h3>On an iPhone, iPad or Mac</h3>
      <p>
        When you create an account in Safari or a supported app and password AutoFill is turned on, Apple devices
        usually offer a strong password in the password field. Accept it, and it is saved to your Apple passwords. If
        the site has strict rules, the <strong>Other Options</strong> menu offers variations, for example one without
        special characters.
      </p>
      <h3>In other browsers and password managers</h3>
      <p>
        Edge, Firefox and dedicated password managers have similar features, usually offered when you select a new
        password box or through the manager’s own generator.
      </p>
      <h3>With the QuickToolsWorld Password Generator</h3>
      <p>
        Open the <Link href="/password-generator">Password Generator</Link>, choose the length and character types,
        and select <strong>Generate password</strong>. It’s useful when you want full control over the settings, or
        when a browser suggestion is rejected by a site’s rules. Remember to save the result in your password manager.
      </p>

      <h2 id="missing">{s.missing}</h2>
      <p>If Chrome or another browser doesn’t offer a suggested password, check these common causes:</p>
      <ul>
        <li>
          <strong>You aren’t signed in to Chrome,</strong> which its help page lists as the first step.
        </li>
        <li>
          <strong>Password saving is turned off</strong> in your browser’s password manager settings.
        </li>
        <li>
          <strong>The website doesn’t mark the box as a new password,</strong> so the browser can’t tell it’s a sign-up
          form. In Chrome, try right-clicking the box and choosing Generate password.
        </li>
        <li>
          <strong>You use a different password manager,</strong> whose extension may replace the browser’s own
          suggestion.
        </li>
      </ul>
      <p>
        If none of these helps, generate a password with a standalone tool and save it in your password manager
        manually.
      </p>

      <h2 id="reuse">{s.reuse}</h2>
      <p>
        A suggestion is only strong for the account it was made for. Using one generated password on two sites brings
        back the risk that unique passwords remove: a breach at one site exposes the other. Get a fresh suggestion for
        every account.
      </p>

      <ArticleFaq
        items={[
          {
            q: "What does a strong password look like?",
            a: "It looks random, for example 16 or more characters mixing uppercase and lowercase letters, numbers and symbols with no words or dates in them, or five or more unrelated random words. If you can see a word, a name, a year or a keyboard pattern in it, it is probably weaker than it looks.",
          },
          {
            q: "What makes a password difficult to guess?",
            a: "Length and randomness. Attackers try leaked passwords, dictionary words and common patterns first, so a password created by a random process, rather than chosen by a person, avoids all of those shortcuts. Each extra random character multiplies the number of guesses needed.",
          },
          {
            q: "How can I get a strong password suggestion?",
            a: (
              <>
                Let your browser or password manager suggest one when you sign up for an account; Chrome, Safari, Edge
                and Firefox can all do this. Or use our <Link href="/password-generator">Password Generator</Link> to
                choose the exact length and characters. Either way, save the password in a password manager.
              </>
            ),
          },
          {
            q: "Should I use random words in a password?",
            a: "Yes, if a random process chooses them and you use enough of them. Five or more unrelated words picked with dice or a generator make a strong passphrase that is easier to type than random characters. Words you pick yourself, or a familiar phrase, are much easier to guess.",
          },
          {
            q: "Is it safe to use a password suggested by Google or Apple?",
            a: "Yes. Browser and device suggestions are randomly generated and saved in your password manager straight away, which is safer than inventing a password yourself. Protect the account the passwords are saved to with a strong password and multifactor authentication.",
          },
          {
            q: "Can I use one of the example passwords on this page?",
            a: "No. Any password published online should be treated as known to attackers, however random it looks. Use the examples to understand what strong passwords look like, then generate your own.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        A strong password is long, random and unique, and it looks like meaningless characters or unrelated words.
        Patterns that people find natural, such as names, years and swapped letters, are the first ones attackers
        try. Instead of inventing a password, accept your browser’s suggestion or create one with the{" "}
        <Link href="/password-generator">Password Generator</Link>, and never reuse it. More{" "}
        <Link href="/tools">free tools</Link> are available for other everyday tasks.
      </p>
    </ArticleLayout>
  );
}
