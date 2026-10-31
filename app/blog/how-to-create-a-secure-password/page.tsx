import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-create-a-secure-password";
export const metadata = postMetadata(SLUG);

const s = {
  difference: "Strong password vs secure password",
  stolen: "How passwords are actually stolen",
  create: "How to create a secure password",
  reuse: "Why password reuse is so dangerous",
  managers: "Use a password manager",
  mfa: "Turn on multifactor authentication",
  phishing: "Phishing: don’t hand your password over",
  breach: "What to do if a password is exposed",
  change: "Should you change passwords regularly?",
  mistakes: "Common password security mistakes",
  plan: "A simple plan for securing your accounts",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> to create a secure password, generate a long, random password that you use
        for one account only, store it in a password manager, and protect the account with multifactor
        authentication. Then keep it secure: never type it into a page you reached from an unexpected link, and change
        it straight away if the service reports a breach.
      </p>
      <p>
        Most advice stops at making a password hard to guess. But many accounts are taken over without anyone guessing
        anything: the password is reused, phished or leaked. This guide covers the habits that protect a password after
        you’ve created it.
      </p>

      <ToolCallout tool="password-generator">
        Start with a strong, random password. It is created in your browser and never sent to our servers.
      </ToolCallout>

      <h2 id="difference">{s.difference}</h2>
      <p>
        The terms are often used interchangeably, but it helps to separate them. Strength is a property of the password
        itself. Security depends on how the password is used and protected.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Comparison</span>
              </th>
              <th scope="col">Strong password</th>
              <th scope="col">Secure password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Protects against</th>
              <td>Guessing and cracking</td>
              <td>Guessing, reuse, phishing and leaks</td>
            </tr>
            <tr>
              <th scope="row">Depends on</th>
              <td>Length and randomness</td>
              <td>Strength, plus uniqueness, safe storage and a second factor</td>
            </tr>
            <tr>
              <th scope="row">Example of failure</th>
              <td>A short password cracked from a leaked database</td>
              <td>A strong password reused on a site that was breached</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A strong password is the starting point. A secure one is strong <em>and</em> handled well.
      </p>

      <h2 id="stolen">{s.stolen}</h2>
      <p>Knowing how attackers get passwords shows which habits matter most:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Attack</th>
              <th scope="col">How it works</th>
              <th scope="col">What protects you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Credential stuffing</td>
              <td>Email and password pairs leaked from one site are tried automatically on many others.</td>
              <td>A unique password for every account</td>
            </tr>
            <tr>
              <td>Phishing</td>
              <td>A fake sign-in page, email or message tricks you into entering your password.</td>
              <td>Password manager autofill, multifactor authentication, passkeys</td>
            </tr>
            <tr>
              <td>Cracking a leaked database</td>
              <td>Stolen password hashes are tested offline against billions of guesses.</td>
              <td>Long, random passwords</td>
            </tr>
            <tr>
              <td>Guessing</td>
              <td>Common passwords and personal details are tried against a login page.</td>
              <td>Random passwords with no personal information</td>
            </tr>
            <tr>
              <td>Malware</td>
              <td>Software on your device records keystrokes or steals saved data.</td>
              <td>Updated software, multifactor authentication</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Only two of these five attacks are stopped by a strong password alone. The others need the habits in the rest
        of this guide.
      </p>

      <h2 id="create">{s.create}</h2>
      <ol>
        <li>
          <strong>Make it long and random.</strong> Use a{" "}
          <Link href="/password-generator">password generator</Link> or your password manager, with 16 or more
          characters. Our guide to{" "}
          <Link href="/blog/how-to-generate-a-strong-password">generating a strong password</Link> explains which
          settings to choose.
        </li>
        <li>
          <strong>Use it for one account only.</strong> Generate a fresh password for every site.
        </li>
        <li>
          <strong>Save it in a password manager</strong> before you submit it.
        </li>
        <li>
          <strong>Add a second factor</strong> to the account, such as an authenticator app or a passkey.
        </li>
        <li>
          <strong>Set up recovery options</strong> you control, such as a current phone number and backup codes stored
          safely, so you aren’t locked out later.
        </li>
      </ol>
      <p>
        For the few passwords you have to type from memory, such as your password manager’s main password, follow our{" "}
        <Link href="/blog/how-to-create-strong-passwords">step-by-step guide to creating a strong password</Link> by
        hand with a random passphrase.
      </p>

      <h2 id="reuse">{s.reuse}</h2>
      <p>
        Data breaches happen to large and small companies alike, and leaked email and password pairs are bought, sold
        and shared. Attackers load them into tools that try each pair on email providers, shops, banks and social
        networks. This is credential stuffing, and it works because many people use the same password in several
        places.
      </p>
      <p>
        Reusing a password with a small change, such as <code>Holiday2025</code> becoming <code>Holiday2026</code>, is
        not much better. Once attackers have one version, the variations are easy to try. A unique, unrelated password
        for every account means a breach at one site exposes that site only.
      </p>

      <h2 id="managers">{s.managers}</h2>
      <p>
        Nobody can remember dozens of random passwords, and nobody should try. A password manager generates, stores
        and fills in your passwords, so you only need to remember one strong main password. Your saved passwords are
        stored encrypted.
      </p>
      <ul>
        <li>
          <strong>Built-in managers</strong> come with Chrome, Edge, Firefox, Safari and Apple, Google and Microsoft
          accounts. They are free and easy to start with.
        </li>
        <li>
          <strong>Dedicated password managers</strong> work across different browsers and devices and often add
          features such as secure sharing and breach alerts.
        </li>
      </ul>
      <p>Whichever you choose, protect it properly:</p>
      <ul>
        <li>Give it a long, unique main password or passphrase that you use nowhere else.</li>
        <li>Turn on multifactor authentication for the password manager or the account it belongs to.</li>
        <li>Set up its recovery method, because losing access to it means losing access to everything inside.</li>
      </ul>
      <p>
        The UK National Cyber Security Centre’s guide to{" "}
        <a
          href="https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/password-managers"
          rel="noopener"
        >
          password managers
        </a>{" "}
        covers how they work and what to look for.
      </p>

      <h2 id="mfa">{s.mfa}</h2>
      <p>
        Multifactor authentication (MFA), also called two-step verification, asks for a second proof that it’s you
        after your password. If your password is stolen, the attacker still needs that second factor. Not every option
        is equally strong:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Second factor</th>
              <th scope="col">How it works</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Passkey or security key</td>
              <td>Your device or a physical key confirms the sign-in</td>
              <td>Designed to resist phishing</td>
            </tr>
            <tr>
              <td>Authenticator app</td>
              <td>A code that changes every 30 seconds, or a prompt to approve</td>
              <td>A good choice for most accounts</td>
            </tr>
            <tr>
              <td>Text message (SMS) code</td>
              <td>A one-time code sent to your phone number</td>
              <td>Much better than nothing, but codes can be phished or intercepted</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Start with your email account, because it can reset the passwords of almost everything else. Then add MFA to
        banking, shopping, social media and cloud storage. CISA’s guide to{" "}
        <a href="https://www.cisa.gov/secure-our-world/turn-mfa" rel="noopener">
          turning on MFA
        </a>{" "}
        explains the options.
      </p>
      <p>
        A <strong>passkey</strong> can also replace the password entirely. It is stored on your device or in your
        password manager and unlocked with your fingerprint, face or device PIN. Passkeys can’t be reused across
        sites or typed into a fake page, so they are worth turning on wherever they are offered.
      </p>

      <h2 id="phishing">{s.phishing}</h2>
      <p>
        No password is strong enough to survive being typed into a fake website. Phishing messages create urgency, such
        as a locked account, a failed delivery or an unpaid invoice, and link to a convincing copy of a real sign-in
        page. CISA’s guide to{" "}
        <a href="https://www.cisa.gov/secure-our-world/recognize-and-report-phishing" rel="noopener">
          recognizing and reporting phishing
        </a>{" "}
        lists the warning signs. A few habits help:
      </p>
      <ul>
        <li>Go to important sites by typing the address or using a bookmark, not by following links in messages.</li>
        <li>
          Treat it as a warning if your password manager doesn’t offer to fill in your password. Managers match the
          exact web address, so a lookalike domain gets nothing.
        </li>
        <li>Never share a sign-in code with anyone who contacts you, even if they claim to be from the company.</li>
      </ul>

      <h2 id="breach">{s.breach}</h2>
      <p>
        If a service tells you about a breach, your password manager shows an alert, or you notice activity you don’t
        recognize, act quickly:
      </p>
      <ol>
        <li>Change the password for that account to a new, randomly generated one.</li>
        <li>Change it anywhere else you used the same or a similar password.</li>
        <li>Turn on multifactor authentication if it wasn’t on already.</li>
        <li>Sign out of other sessions and review connected apps, forwarding rules and recovery details.</li>
      </ol>
      <p>
        You can check whether your email address appears in known breaches at{" "}
        <a href="https://haveibeenpwned.com/" rel="noopener">
          Have I Been Pwned
        </a>
        .
      </p>

      <h2 id="change">{s.change}</h2>
      <p>
        Not on a fixed schedule. NIST’s{" "}
        <a href="https://pages.nist.gov/800-63-4/sp800-63b.html" rel="noopener">
          Digital Identity Guidelines (SP 800-63B)
        </a>{" "}
        tell services not to force periodic password changes, because people respond with small, predictable edits.
        Change a password when there’s a reason: a breach, suspicious activity, or after sharing it with someone. The
        same guidelines ask services to accept long passwords, allow pasting so password managers work, and reject
        passwords known to have been breached.
      </p>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Reusing a password</strong> on more than one site, even with a small change.
        </li>
        <li>
          <strong>Keeping passwords in plain text</strong>, such as notes apps, spreadsheets or emails to yourself.
        </li>
        <li>
          <strong>Sharing passwords</strong> by text message or chat. Use your password manager’s sharing feature
          instead.
        </li>
        <li>
          <strong>Leaving email without MFA</strong>, which puts every account it can reset at risk.
        </li>
        <li>
          <strong>Ignoring breach alerts</strong> from services or your password manager.
        </li>
        <li>
          <strong>Signing in on shared computers</strong> and staying signed in, or saving passwords in a browser that
          other people use.
        </li>
      </ul>

      <h2 id="plan">{s.plan}</h2>
      <p>You don’t have to fix every account at once. Work through them in order of importance:</p>
      <ol>
        <li>Choose a password manager and give it a strong, unique main password.</li>
        <li>Secure your main email account: a new random password and multifactor authentication.</li>
        <li>Do the same for banking, payment apps and your phone’s app store or cloud account.</li>
        <li>Replace any password you have used on more than one site, starting with the most important accounts.</li>
        <li>Check your email address on Have I Been Pwned and change any password that appears in a breach.</li>
        <li>Add new accounts to the password manager as you sign in to them over the following weeks.</li>
      </ol>

      <ArticleFaq
        items={[
          {
            q: "How can I create a secure password?",
            a: (
              <>
                Generate a long, random password of 16 or more characters with a tool such as our{" "}
                <Link href="/password-generator">Password Generator</Link>, use it for one account only, and save it in
                a password manager. Then protect the account with multifactor authentication, so a stolen password
                alone isn’t enough to sign in.
              </>
            ),
          },
          {
            q: "What is the safest way to manage passwords?",
            a: "Use a reputable password manager with a strong, unique main password and multifactor authentication turned on. It stores your passwords encrypted, fills them in only on the matching website, and lets you use a different random password everywhere without remembering any of them.",
          },
          {
            q: "Why should I avoid reusing passwords?",
            a: "When one website is breached, attackers try the leaked email and password on many other websites automatically. If you reused the password, those accounts are exposed too. A unique password limits the damage to the one site that was breached.",
          },
          {
            q: "Are password managers safe to use?",
            a: "Security agencies including the UK’s NCSC recommend them, because the alternative is usually reused or weak passwords. Passwords are stored encrypted, and a manager won’t fill them in on a lookalike phishing site. Protect the manager itself with a strong main password and multifactor authentication.",
          },
          {
            q: "Is it safe to save passwords in my browser?",
            a: "For most people, yes, provided your device has a screen lock, your browser account has multifactor authentication, and nobody else uses your browser profile. Built-in managers in Chrome, Safari, Edge and Firefox store passwords encrypted and can generate strong ones for you.",
          },
          {
            q: "Can a strong password guarantee my account is safe?",
            a: "No. A strong, unique password protects against guessing and reuse attacks, but not against phishing, malware or a breach at the service itself. Combine it with multifactor authentication and care about where you sign in.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        A secure password is more than a strong one. Generate a long, random password, use it for one account, keep it
        in a password manager and back it up with multifactor authentication. Watch for phishing, and change passwords
        when there’s a breach rather than on a schedule. Create your next password with the{" "}
        <Link href="/password-generator">Password Generator</Link>, or browse our other{" "}
        <Link href="/tools">free tools</Link>.
      </p>
    </ArticleLayout>
  );
}
