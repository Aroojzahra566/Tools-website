import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-create-strong-passwords";
export const metadata = postMetadata(SLUG);

const s = {
  rules: "The three rules: long, random, unique",
  length: "Why length beats complexity",
  decide: "Step 1: Decide whether you’ll store it or type it",
  generator: "Step 2a: Create a strong password with a generator",
  passphrase: "Step 2b: Create a strong passphrase by hand",
  complex: "Step 3: Make it fit the website’s rules",
  save: "Step 4: Save it and add a second factor",
  accounts: "Creating passwords for different accounts",
  mistakes: "Common password creation mistakes",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> to create a strong password, make it long, random and unique to one
        account. For passwords a password manager stores for you, generate 16 or more random characters. For the few
        you must remember, roll dice to pick five or more random words and join them into a passphrase. Then save the
        password before you submit it, and turn on multifactor authentication.
      </p>
      <p>
        This tutorial takes you through both methods step by step, from scratch, including how to deal with fussy
        website rules and which kind of password suits which account.
      </p>

      <ToolCallout tool="password-generator">
        Create a long, random password with the characters you choose. It is generated in your browser using
        cryptographically secure randomness and never sent anywhere.
      </ToolCallout>

      <h2 id="rules">{s.rules}</h2>
      <p>
        Attackers rarely type guesses into a login page one at a time. More often, they test enormous numbers of
        guesses against a leaked password database, or try passwords already leaked from other websites. A strong
        password resists both, because it is:
      </p>
      <ul>
        <li>
          <strong>Long</strong>, so there are too many combinations to try them all.
        </li>
        <li>
          <strong>Random</strong>, so it isn’t in the word lists and patterns attackers try first. People are bad at
          being random, so let a computer or dice do it.
        </li>
        <li>
          <strong>Unique</strong>, so a leak from one website doesn’t unlock your other accounts.
        </li>
      </ul>
      <p>
        The US Cybersecurity and Infrastructure Security Agency (CISA) gives the same advice in its guide to{" "}
        <a href="https://www.cisa.gov/secure-our-world/use-strong-passwords" rel="noopener">
          using strong passwords
        </a>
        , recommending at least 16 characters.
      </p>

      <h2 id="length">{s.length}</h2>
      <p>
        Each extra random character multiplies the number of possible passwords. The table shows how long it would
        take to try every combination at one trillion guesses per second.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Random password</th>
              <th scope="col">Entropy</th>
              <th scope="col">Time to try them all</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8 characters, letters and digits (62 options)</td>
              <td>about 48 bits</td>
              <td>about 4 minutes</td>
            </tr>
            <tr>
              <td>12 lowercase letters (26 options)</td>
              <td>about 56 bits</td>
              <td>about 26 hours</td>
            </tr>
            <tr>
              <td>16 characters, letters, digits and symbols (87 options)</td>
              <td>about 103 bits</td>
              <td>hundreds of billions of years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These figures are illustrations, not predictions. Real cracking speed depends on how a website stores
        passwords, and they apply only to passwords that are truly random. The pattern is what matters: adding length
        grows strength much faster than swapping a letter for a symbol, which is why <code>Summer2024!</code> is far
        weaker than its 11 characters suggest.
      </p>

      <h2 id="decide">{s.decide}</h2>
      <p>Before you create anything, decide how the password will be used:</p>
      <ul>
        <li>
          <strong>Stored:</strong> most passwords. A password manager fills them in, so they can be long strings of
          random characters you never see. Follow step 2a.
        </li>
        <li>
          <strong>Typed from memory:</strong> a handful of passwords, such as your computer or phone login and your
          password manager’s main password. These need to be strong and memorable. Follow step 2b.
        </li>
      </ul>

      <h2 id="generator">{s.generator}</h2>
      <ol>
        <li>
          Open the <Link href="/password-generator">Password Generator</Link> or your password manager’s generator.
        </li>
        <li>Set the length to 16 or more. Use 20 for email, banking and work accounts.</li>
        <li>Keep uppercase letters, lowercase letters, numbers and symbols switched on.</li>
        <li>
          Select <strong>Generate password</strong>, then <strong>Copy password</strong>.
        </li>
      </ol>
      <p>
        That’s it: the generator handles the randomness. For a closer look at the settings and how generators work,
        read our guide to{" "}
        <Link href="/blog/how-to-generate-a-strong-password">generating a strong password</Link>.
      </p>

      <h2 id="passphrase">{s.passphrase}</h2>
      <p>
        A passphrase is a password made of several random words. It is long, so it’s strong, and words are easier to
        remember and type than random characters. The key is that the words must be chosen at random, not by you. The
        Electronic Frontier Foundation publishes{" "}
        <a href="https://www.eff.org/dice" rel="noopener">
          word lists designed for dice
        </a>{" "}
        that make this easy:
      </p>
      <ol>
        <li>
          Download the EFF’s long word list. It has 7,776 words, one for every result of rolling five dice.
        </li>
        <li>Roll five dice and read the numbers in order, for example 4-1-3-6-2.</li>
        <li>Find that number in the list and write down the word.</li>
        <li>Repeat until you have at least five words. Use six for your password manager’s main password.</li>
        <li>
          Join the words with a separator such as a hyphen or space. If a site requires them, add a capital letter
          and a number.
        </li>
        <li>Practise typing it a few times, then store a copy somewhere safe until you know it by heart.</li>
      </ol>
      <p>Each word chosen this way adds about 12.9 bits of entropy:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Random words</th>
              <th scope="col">Entropy</th>
              <th scope="col">About as strong as</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4 words</td>
              <td>about 52 bits</td>
              <td>8 random characters</td>
            </tr>
            <tr>
              <td>5 words</td>
              <td>about 65 bits</td>
              <td>10 random characters</td>
            </tr>
            <tr>
              <td>6 words</td>
              <td>about 78 bits</td>
              <td>12 random characters</td>
            </tr>
            <tr>
              <td>7 words</td>
              <td>about 90 bits</td>
              <td>14 random characters</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The comparison uses all four character types (87 options). Don’t replace the dice with words you pick
        yourself, a favorite quote or song lyrics: those are far easier to guess. The UK National Cyber Security
        Centre’s{" "}
        <a
          href="https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/three-random-words"
          rel="noopener"
        >
          three random words
        </a>{" "}
        advice is a simpler version of the same idea.
      </p>

      <h2 id="complex">{s.complex}</h2>
      <p>
        Many websites still insist on a “complex” password: at least one uppercase letter, one lowercase letter, one
        number and one symbol. A generated password with all four types switched on meets these rules automatically.
        Complexity rules are a blunt tool, though. People satisfy them in predictable ways, which is why NIST’s{" "}
        <a href="https://pages.nist.gov/800-63-4/sp800-63b.html" rel="noopener">
          Digital Identity Guidelines
        </a>{" "}
        now tell services not to require mixtures of character types. Until every site follows that advice, here is
        how to handle the rules you meet:
      </p>
      <ul>
        <li>
          <strong>Symbols rejected?</strong> Some sites accept only certain symbols. Turn symbols off and add two or
          three characters of length to make up for it.
        </li>
        <li>
          <strong>Maximum length too short?</strong> Use the longest password the site allows, and turn on multifactor
          authentication.
        </li>
        <li>
          <strong>Passphrase rejected?</strong> Replace spaces with hyphens, capitalize one word and add a digit.
        </li>
        <li>
          <strong>Refused as “too common” or “breached”?</strong> Take the hint and create a new random password
          rather than tweaking the old one.
        </li>
      </ul>

      <h2 id="save">{s.save}</h2>
      <p>
        Save the new password in your password manager <em>before</em> you submit the form, so a random password is
        never lost if the page errors. Then turn on multifactor authentication for the account, starting with your
        email, which can reset most other passwords. Our guide to{" "}
        <Link href="/blog/how-to-create-a-secure-password">creating a secure password and protecting your accounts</Link>{" "}
        covers password managers, multifactor authentication and phishing in detail.
      </p>

      <h2 id="accounts">{s.accounts}</h2>
      <p>Every account needs its own password, but not every account needs the same kind:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Account</th>
              <th scope="col">What to create</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Password manager</td>
              <td>A 6-word random passphrase you memorize, plus multifactor authentication</td>
            </tr>
            <tr>
              <td>Computer login</td>
              <td>A 5-word or longer passphrase, because you type it often</td>
            </tr>
            <tr>
              <td>Email and banking</td>
              <td>20 or more random characters, stored in your manager, plus multifactor authentication</td>
            </tr>
            <tr>
              <td>Shopping, social media and other websites</td>
              <td>16 or more random characters, stored in your manager</td>
            </tr>
            <tr>
              <td>Home Wi-Fi</td>
              <td>
                A long passphrase that is easy to read aloud, or share it as a{" "}
                <Link href="/blog/how-to-create-a-qr-code">Wi-Fi QR code</Link>
              </td>
            </tr>
            <tr>
              <td>Work accounts</td>
              <td>Follow your employer’s policy and tools</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Starting from a word you like</strong> and decorating it with capitals, numbers and symbols.
        </li>
        <li>
          <strong>Using personal information</strong> such as names, birthdays, pets or favorite teams.
        </li>
        <li>
          <strong>Relying on predictable substitutions</strong> like <code>P@ssw0rd</code>.
        </li>
        <li>
          <strong>Creating one “base” password</strong> and changing a few characters for each site.
        </li>
        <li>
          <strong>Choosing short passwords</strong> because they’re easier to type, when a password manager could fill
          them in.
        </li>
        <li>
          <strong>Copying an example password</strong> from an article or video. Published examples end up in
          attackers’ guess lists.
        </li>
      </ul>
      <p>
        To see these mistakes side by side with strong alternatives, look at our{" "}
        <Link href="/blog/strong-password-examples-and-suggestions">strong password examples</Link>.
      </p>

      <ArticleFaq
        items={[
          {
            q: "How do I create a strong password from scratch?",
            a: "Decide whether you need to remember it. If not, use a password generator to create 16 or more random characters and save it in a password manager. If you do, roll dice to pick five or more random words from a word list and join them into a passphrase. Either way, use it for one account only.",
          },
          {
            q: "How do I create a strong password I can remember?",
            a: "Use a passphrase of five or more random, unrelated words, chosen with dice or a generator rather than by you. Avoid quotes, song lyrics and personal details, which attackers try first. Keep memorable passphrases for the few passwords you type yourself, and let a password manager remember the rest.",
          },
          {
            q: "Is a passphrase better than a short password?",
            a: "Yes. A passphrase of five random words is about as strong as 10 random characters and much easier to remember. Length is what makes a password hard to crack, and words let you reach a long length without the strain of memorizing random symbols.",
          },
          {
            q: "How can I make my password unique for each account?",
            a: "Generate a new random password for every account instead of adapting one password, and let a password manager store them. Variations such as adding the site’s name or a number to a base password are easy for attackers to predict once one version leaks.",
          },
          {
            q: "What makes a password complex?",
            a: (
              <>
                Most websites call a password complex when it mixes uppercase and lowercase letters, numbers and
                symbols. Complexity only helps when the characters are chosen at random. A strong complex password is
                16 or more random characters with no words, names or dates in it. Create one with the{" "}
                <Link href="/password-generator">Password Generator</Link> or your password manager.
              </>
            ),
          },
          {
            q: "What password mistakes should I avoid?",
            a: "Avoid reusing passwords, building passwords from words or personal details, predictable swaps such as @ for a, short passwords, and published example passwords. Also avoid storing passwords in unprotected notes or sending them by message.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        To create a strong password, decide first whether it will be stored or remembered. Generate 16 or more random
        characters for stored passwords, and use five or more dice-chosen words for the few you type. Make each
        password unique, save it before you submit it, and add multifactor authentication. Open the{" "}
        <Link href="/password-generator">Password Generator</Link> to create your next password, or browse our other{" "}
        <Link href="/tools">free tools</Link>.
      </p>
    </ArticleLayout>
  );
}
