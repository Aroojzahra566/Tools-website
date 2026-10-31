import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-generate-a-strong-password";
export const metadata = postMetadata(SLUG);

const s = {
  steps: "How to generate a strong password in five steps",
  length: "Which length should you generate?",
  types: "Uppercase, lowercase, numbers and symbols",
  how: "How password generators work",
  every: "Generating a different password for every account",
  store: "How to copy and store a generated password safely",
  builtin: "Generators built into browsers and password managers",
  memorable: "When a generated password is the wrong choice",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> to generate a strong password, open a password generator that uses secure
        randomness, set the length to at least 16 characters, include uppercase letters, lowercase letters, numbers
        and symbols, and generate. Then save the result in a password manager before you use it. The whole process
        takes less than a minute.
      </p>
      <p>
        A generator does the one part people are bad at: being random. This guide explains which settings to choose,
        what happens inside a generator when you click the button, and how to handle the password afterwards so its
        strength isn’t wasted.
      </p>

      <ToolCallout tool="password-generator">
        Generate a random password with the length and characters you choose. It is created in your browser and never
        sent to a server.
      </ToolCallout>

      <h2 id="steps">{s.steps}</h2>
      <p>
        These steps use the free <Link href="/password-generator">QuickToolsWorld Password Generator</Link>, but the
        same choices apply to any good generator.
      </p>
      <ol>
        <li>
          <strong>Choose the length.</strong> The default is 16. Use the quick buttons (8, 12, 16, 20 or 32), the
          slider (up to 64), or type any number up to 128 in the box.
        </li>
        <li>
          <strong>Choose the character types.</strong> All four are ticked by default: uppercase letters, lowercase
          letters, numbers and symbols. Leave them on unless the website you’re signing up to restricts them.
        </li>
        <li>
          <strong>Select Generate password.</strong> The password appears with an estimated strength underneath. If
          you change the length or a character type afterwards, a new password is generated to match.
        </li>
        <li>
          <strong>Check it fits the site’s rules.</strong> If the site rejects it, adjust the settings and select{" "}
          <strong>Regenerate</strong>. Don’t edit the password by hand to make it fit.
        </li>
        <li>
          <strong>Select Copy password</strong>, paste it into the website and into your password manager, and save
          both. The eye button hides the password if someone can see your screen.
        </li>
      </ol>

      <h2 id="length">{s.length}</h2>
      <p>
        Length is the setting that matters most: with all four character types on, one more character makes the
        password 87 times harder to guess by brute force. The table shows what our generator reports with all four character types switched on. The
        bits figure is entropy: each extra bit doubles the number of guesses needed to try every combination.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Length</th>
              <th scope="col">Entropy</th>
              <th scope="col">Strength shown</th>
              <th scope="col">Good for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8 characters</td>
              <td>about 52 bits</td>
              <td>Weak</td>
              <td>Only sites that refuse anything longer</td>
            </tr>
            <tr>
              <td>12 characters</td>
              <td>about 77 bits</td>
              <td>Fair</td>
              <td>Sites with a 12-character maximum</td>
            </tr>
            <tr>
              <td>14 characters</td>
              <td>about 90 bits</td>
              <td>Strong</td>
              <td>A short minimum where 16 isn’t allowed</td>
            </tr>
            <tr>
              <td>16 characters</td>
              <td>about 103 bits</td>
              <td>Strong</td>
              <td>Most accounts (the default)</td>
            </tr>
            <tr>
              <td>20 characters</td>
              <td>about 129 bits</td>
              <td>Very strong</td>
              <td>Email, banking and work accounts</td>
            </tr>
            <tr>
              <td>32 characters</td>
              <td>about 206 bits</td>
              <td>Very strong</td>
              <td>Anything you never type by hand</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sixteen is a sensible default. It matches the minimum that the US Cybersecurity and Infrastructure Security
        Agency (CISA) recommends in its advice on{" "}
        <a href="https://www.cisa.gov/secure-our-world/use-strong-passwords" rel="noopener">
          using strong passwords
        </a>
        . Because a password manager types the password for you, there is little reason not to go longer when a site
        allows it.
      </p>

      <h2 id="types">{s.types}</h2>
      <p>
        Each character type you add makes the pool of possible characters larger, so every position in the password
        is harder to guess. Our generator uses these pools:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Character types ticked</th>
              <th scope="col">Possible characters</th>
              <th scope="col">16 characters gives</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lowercase only</td>
              <td>26</td>
              <td>about 75 bits</td>
            </tr>
            <tr>
              <td>Uppercase, lowercase and numbers</td>
              <td>62</td>
              <td>about 95 bits</td>
            </tr>
            <tr>
              <td>All four, including symbols</td>
              <td>87</td>
              <td>about 103 bits</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Symbols help, but less than you might expect. An 18-character password without symbols (about 107 bits) is
        already stronger than a 16-character password with them. So if a website rejects symbols, untick them and add
        two or three characters. You lose nothing.
      </p>
      <p>
        Whatever you tick, the generator always includes at least one character from each selected type, so the
        result satisfies the common “must contain a number and a symbol” rules.
      </p>

      <h2 id="how">{s.how}</h2>
      <p>
        A password generator is only as good as its source of randomness. A trustworthy one does three things:
      </p>
      <ul>
        <li>
          <strong>It uses a cryptographically secure random number generator.</strong> In a browser, that is the Web
          Crypto API’s <code>crypto.getRandomValues()</code>. General-purpose functions such as JavaScript’s{" "}
          <code>Math.random()</code> are fine for games but not designed to be unpredictable.
        </li>
        <li>
          <strong>It picks every character with equal probability.</strong> A common shortcut, taking a random number
          modulo the pool size, makes some characters slightly more likely than others. Our generator avoids this with
          a technique called rejection sampling.
        </li>
        <li>
          <strong>It generates the password on your device.</strong> A generator that creates passwords on a server
          could, in principle, log them. Ours runs entirely in your browser; the password is not sent, saved or logged.
        </li>
      </ul>
      <p>
        The strength meter is a calculation, not a test: length multiplied by log₂ of the pool size. It is accurate
        for randomly generated passwords only. A password you typed yourself, such as <code>Summer2026!</code>, would
        look strong by that formula and still be one of the first guesses an attacker tries.
      </p>

      <h2 id="every">{s.every}</h2>
      <p>
        A generator makes it easy to give every account its own password, which stops one website’s data breach from
        unlocking your other accounts. A simple routine works for any new account or password change:
      </p>
      <ol>
        <li>Open the sign-up or change-password page.</li>
        <li>Generate a new password. Never reuse an earlier one, even with a character changed.</li>
        <li>Save it in your password manager first, with the website address and your username.</li>
        <li>Paste it into the website and submit.</li>
        <li>Check the password manager fills it in correctly next time you sign in.</li>
      </ol>
      <p>
        Saving before submitting matters. If the page errors or you close the tab, a random password that exists only
        on your clipboard is gone, and you’ll need to reset it.
      </p>

      <h2 id="store">{s.store}</h2>
      <p>
        A generated password is strongest while nobody else has seen it. Copying it carefully keeps it that way:
      </p>
      <ul>
        <li>
          <strong>Paste it into a password manager,</strong> not a notes app, a spreadsheet, an email to yourself or a
          screenshot. Those are rarely encrypted and often synced to several places.
        </li>
        <li>
          <strong>Be aware of clipboard history.</strong> Windows (Win + V), some phone keyboards and clipboard apps keep
          a history of copied text. Our tool doesn’t clear your clipboard, so copy something else afterwards if that
          applies to you.
        </li>
        <li>
          <strong>Don’t keep the generator tab open on a shared screen.</strong> The password stays visible until you
          leave the page or generate another. Use the eye button to hide it.
        </li>
      </ul>
      <p>
        If you don’t use a password manager yet, our guide to{" "}
        <Link href="/blog/how-to-create-a-secure-password">creating secure passwords and protecting your accounts</Link>{" "}
        explains how they work and what to look for.
      </p>

      <h2 id="builtin">{s.builtin}</h2>
      <p>
        Chrome, Safari, Edge, Firefox and dedicated password managers can all generate a password for you while you
        fill in a sign-up form, and save it in the same step. That is often the most convenient option. A standalone
        generator is useful when you want to choose the exact length and characters, when a site rejects the
        browser’s suggestion, or when you store passwords somewhere else. Our article on{" "}
        <Link href="/blog/strong-password-examples-and-suggestions">strong password suggestions</Link> covers how to
        get one from Chrome or an iPhone, and what to do when the suggestion doesn’t appear.
      </p>

      <h2 id="memorable">{s.memorable}</h2>
      <p>
        Random characters are ideal for passwords a manager fills in, but awkward for the few you type yourself: your
        computer login, your phone, a smart TV or the main password of your password manager. For those, a passphrase
        of five or more randomly chosen words is easier to type and still strong. Our step-by-step guide on{" "}
        <Link href="/blog/how-to-create-strong-passwords">how to create a strong password</Link> shows how to build
        one with dice and a word list.
      </p>

      <ArticleFaq
        items={[
          {
            q: "How do I generate a strong password?",
            a: (
              <>
                Use a generator that relies on secure randomness, such as our{" "}
                <Link href="/password-generator">Password Generator</Link>. Set the length to 16 characters or more,
                keep uppercase, lowercase, numbers and symbols ticked, and select Generate password. Save the result in
                a password manager before you submit it to the website.
              </>
            ),
          },
          {
            q: "How long should a generated password be?",
            a: "At least 16 characters for most accounts, and 20 or more for email, banking and anything you never type yourself. Use 8 or 12 only when a website won’t accept anything longer, and turn on two-factor authentication for that account.",
          },
          {
            q: "Are random password generators safe to use?",
            a: "A good one is. Look for a generator that creates the password on your device rather than on a server, and that uses a cryptographically secure source of randomness. Ours runs in your browser with the Web Crypto API and does not send, save or log the password.",
          },
          {
            q: "Should passwords include symbols?",
            a: "Include them when the website allows, because they enlarge the pool of possible characters. They are not essential: a password without symbols that is two or three characters longer is just as strong. If a site rejects certain symbols, turn symbols off and increase the length.",
          },
          {
            q: "Can I generate a password based on a word?",
            a: "You can, but it makes the password weaker. Attackers test dictionary words with common changes, such as capital letters, swapped characters and numbers on the end, before anything else. If you want something memorable, use a passphrase of several randomly chosen words instead of one word you picked yourself.",
          },
          {
            q: "Can a generated password be easy to remember?",
            a: "Random characters rarely are, and they don’t need to be, because a password manager remembers them. For the few passwords you have to type, generate a passphrase of five or more random words instead. It is longer but far easier to recall and type.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        To generate a strong password, choose at least 16 characters, keep all four character types on unless a site
        objects, and let a secure generator do the rest. Save every password in a password manager before you use it,
        and generate a new one for each account. Open the{" "}
        <Link href="/password-generator">Password Generator</Link> to create your next one, or browse our other{" "}
        <Link href="/tools">free online tools</Link>.
      </p>
    </ArticleLayout>
  );
}
