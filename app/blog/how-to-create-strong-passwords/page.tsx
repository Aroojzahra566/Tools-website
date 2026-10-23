import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-create-strong-passwords";
export const metadata = postMetadata(SLUG);

const s = {
  strong: "What makes a password strong",
  length: "Why length matters most",
  random: "Randomness and unpredictability",
  reuse: "Why reusing passwords is risky",
  generator: "How to generate a strong password",
  settings: "Choosing the length and character types",
  storage: "Storing passwords safely",
  mfa: "Add multifactor authentication",
  mistakes: "Common password mistakes",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> a strong password is long, random and used for only one account. Aim for at
        least 16 random characters, or a passphrase of several unrelated random words. Store your passwords in a
        password manager, and turn on multifactor authentication wherever it is offered.
      </p>
      <p>
        No password makes an account impossible to break into, but these habits make the most common attacks far less
        likely to succeed. This guide explains why each one matters and how to put them into practice.
      </p>

      <ToolCallout tool="password-generator">
        Generate long, random passwords with the characters you choose. They are created in your browser using
        cryptographically secure randomness and are never sent anywhere.
      </ToolCallout>

      <h2 id="strong">{s.strong}</h2>
      <p>
        Attackers rarely type guesses into a login page one at a time. More often, they get hold of a leaked database
        of password hashes and use fast computers to test enormous numbers of guesses, or they try passwords already
        leaked from other websites. A strong password resists both approaches. It is:
      </p>
      <ul>
        <li>
          <strong>Long</strong>, so there are too many possible combinations to try them all.
        </li>
        <li>
          <strong>Random</strong>, so it doesn’t appear in the word lists and patterns attackers try first.
        </li>
        <li>
          <strong>Unique</strong>, so a leak from one website doesn’t unlock your other accounts.
        </li>
      </ul>
      <p>
        The US Cybersecurity and Infrastructure Security Agency (CISA) gives the same three-part advice in its guide to{" "}
        <a href="https://www.cisa.gov/secure-our-world/use-strong-passwords" rel="noopener">
          using strong passwords
        </a>
        , recommending at least 16 characters.
      </p>

      <h2 id="length">{s.length}</h2>
      <p>
        Each extra character multiplies the number of possible passwords. Strength is often measured in bits of
        entropy, calculated as the length multiplied by log₂ of the number of possible characters. This formula only
        applies to passwords that are truly random. The table shows how long it would take to try every possible
        combination at one trillion guesses per second.
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
        These figures are illustrations, not predictions. Real cracking speed depends heavily on how a website stores
        passwords, and on average an attacker would find a password after trying about half the combinations. The
        pattern is what matters: length grows strength much faster than swapping a letter for a symbol.
      </p>

      <h2 id="random">{s.random}</h2>
      <p>
        People are bad at being random. We choose real words, names, dates and keyboard patterns, then make predictable
        changes like capitalizing the first letter, replacing “o” with “0” and adding “1!” at the end. Password-cracking
        tools are built around exactly these habits, so <code>Summer2024!</code> is much weaker than its length
        suggests.
      </p>
      <p>
        True randomness has to come from a computer or from something like dice. A good password generator uses a
        cryptographically secure random number generator. Ordinary random functions in programming languages, such as
        JavaScript’s <code>Math.random()</code>, are fine for games but are not designed to be unpredictable enough for
        security.
      </p>
      <p>
        Random passphrases are a good alternative when you need to remember or type a password, for example for your
        computer login or your password manager. Several genuinely random, unrelated words are long, strong and easier
        to remember than random characters. The UK National Cyber Security Centre explains a simple version of this in
        its advice on{" "}
        <a
          href="https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/three-random-words"
          rel="noopener"
        >
          using three random words
        </a>
        .
      </p>

      <h2 id="reuse">{s.reuse}</h2>
      <p>
        Data breaches are common, and leaked email and password pairs are widely traded. Attackers feed them into
        automated tools that try the same combinations on many other websites, an attack called{" "}
        <strong>credential stuffing</strong>. If you reuse a password, one breach at a small website can expose your
        email, bank or social media accounts.
      </p>
      <p>
        A unique password for every account limits the damage of any single breach to that one account. You can check
        whether your email address has appeared in known breaches at{" "}
        <a href="https://haveibeenpwned.com/" rel="noopener">
          Have I Been Pwned
        </a>
        , and change the passwords for any affected accounts.
      </p>

      <h2 id="generator">{s.generator}</h2>
      <p>
        The <Link href="/password-generator">Password Generator</Link> creates passwords with your browser’s Web Crypto
        API, a cryptographically secure source of randomness. Each character is picked without bias, and the password
        is never sent to a server, saved or logged.
      </p>
      <ol>
        <li>
          Open the <Link href="/password-generator">Password Generator</Link>.
        </li>
        <li>Set the length with the slider, or type a number up to 128 in the box. The default is 16.</li>
        <li>
          Choose which character types to include: uppercase letters, lowercase letters, numbers and symbols. The
          password always contains at least one character from each type you select.
        </li>
        <li>
          Select <strong>Generate password</strong>. Use <strong>Regenerate</strong> for a new one, or the eye button
          to hide it from anyone looking at your screen.
        </li>
        <li>
          Select <strong>Copy password</strong> and paste it straight into the website’s sign-up form and your password
          manager.
        </li>
      </ol>
      <p>
        The tool also shows an estimated strength, using the same length × log₂(character set) calculation described
        above. It is a guide, not a guarantee.
      </p>

      <h2 id="settings">{s.settings}</h2>
      <ul>
        <li>
          <strong>Use 16 or more characters</strong> for passwords stored in a password manager. Longer is better when
          the website allows it, and you never need to type or remember them.
        </li>
        <li>
          <strong>Include all four character types</strong> when you can, because a larger character set adds strength
          to every character.
        </li>
        <li>
          <strong>Turn off symbols if a website rejects them.</strong> Add a few extra characters to make up for the
          smaller character set.
        </li>
        <li>
          <strong>Use a long passphrase</strong> for the few passwords you must type from memory, such as your password
          manager’s main password.
        </li>
      </ul>
      <p>
        US government guidance points the same way. NIST’s{" "}
        <a href="https://pages.nist.gov/800-63-4/sp800-63b.html" rel="noopener">
          Digital Identity Guidelines (SP 800-63B)
        </a>{" "}
        tell services to require at least 15 characters for passwords used on their own, to allow passwords of at least
        64 characters, and to stop forcing users to change passwords on a schedule unless there is evidence they have
        been compromised.
      </p>

      <h2 id="storage">{s.storage}</h2>
      <p>
        Nobody can remember dozens of long, random, unique passwords, and you shouldn’t try. A{" "}
        <strong>password manager</strong> generates, stores and fills in your passwords, so you only need to remember
        one strong main password. Many browsers and phones include one for free, and there are dedicated apps too. The
        NCSC’s guide to{" "}
        <a
          href="https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/password-managers"
          rel="noopener"
        >
          password managers
        </a>{" "}
        explains how they work and what to look for.
      </p>
      <p>
        Avoid storing passwords in unprotected notes, spreadsheets, emails or chat messages. If you write a password on
        paper, keep it somewhere private and away from your device.
      </p>

      <h2 id="mfa">{s.mfa}</h2>
      <p>
        Multifactor authentication (MFA), also called two-step verification, asks for something extra after your
        password, such as a code from an authenticator app, a prompt on your phone, a hardware security key or a
        passkey. Even if your password is stolen, an attacker still needs that second factor.
      </p>
      <p>
        Turn it on first for your email account, because email is used to reset the passwords of almost everything
        else. Then add it to banking, shopping, social media and cloud storage. CISA’s{" "}
        <a href="https://www.cisa.gov/secure-our-world/turn-mfa" rel="noopener">
          guide to turning on MFA
        </a>{" "}
        covers the options.
      </p>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Reusing passwords</strong>, or reusing them with small changes like adding a number.
        </li>
        <li>
          <strong>Using personal information</strong> such as names, birthdays, pets or favorite teams.
        </li>
        <li>
          <strong>Relying on predictable substitutions</strong> like <code>P@ssw0rd</code>.
        </li>
        <li>
          <strong>Choosing short passwords</strong> because they’re easier to type, when a password manager could fill
          them in for you.
        </li>
        <li>
          <strong>Sharing passwords</strong> by email or text message.
        </li>
        <li>
          <strong>Ignoring breach alerts</strong> from websites or your password manager.
        </li>
      </ul>

      <ArticleFaq
        items={[
          {
            q: "How long should my password be?",
            a: "Use at least 16 random characters for passwords kept in a password manager. For a passphrase you need to remember, use several random, unrelated words. Longer is stronger, as long as the website accepts it.",
          },
          {
            q: "Is it safe to use an online password generator?",
            a: (
              <>
                It depends on how it works. Choose one that generates passwords in your browser with cryptographically
                secure randomness and doesn’t send them anywhere. The{" "}
                <Link href="/password-generator">QuickToolsWorld Password Generator</Link> works this way. A password
                manager’s built-in generator is another good option.
              </>
            ),
          },
          {
            q: "Should I change my passwords regularly?",
            a: "Current guidance, including NIST’s, says forced periodic changes tend to lead to weaker, predictable passwords. Change a password when there is a reason to, such as a breach, suspicious activity or if you shared it.",
          },
          {
            q: "Are passkeys better than passwords?",
            a: "Passkeys are designed to resist phishing and can’t be reused across websites, so they are a strong option where they are available. You will still need good passwords for many services, and for your password manager itself.",
          },
          {
            q: "Can a strong password guarantee my account is safe?",
            a: "No. A strong, unique password protects against guessing and reuse attacks, but not against phishing pages, malware or a breach that exposes passwords in plain text. Combine strong passwords with multifactor authentication and caution about where you sign in.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        Strong password security comes down to a few habits: make every password long and random, never reuse one,
        keep them in a password manager, and add multifactor authentication to your important accounts. To create your
        next password, open the <Link href="/password-generator">Password Generator</Link>.
      </p>
    </ArticleLayout>
  );
}
