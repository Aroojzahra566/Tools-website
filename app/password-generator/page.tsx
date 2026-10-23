import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { toolMetadata } from "@/lib/metadata";
import { CHARACTER_SETS } from "@/lib/tools/password";

export const metadata = toolMetadata("password-generator");

export default function Page() {
  return (
    <ToolPage
      slug="password-generator"
      intro="Generate a strong, random password in one click. Choose the length and which characters to include, then copy it straight into your account or password manager."
      tool={<PasswordGenerator />}
      faqs={[
        {
          question: "Is it safe to generate a password on a website?",
          answer:
            "This generator runs entirely in your browser. The password is created on your device with the Web Crypto API and is never sent to a server, saved or logged. It exists only on this page until you leave or generate a new one.",
        },
        {
          question: "How random are the passwords?",
          answer:
            "Each character is chosen with crypto.getRandomValues(), the browser’s cryptographically secure random number generator. A technique called rejection sampling makes every allowed character equally likely, and the final order is shuffled with the same secure source. Math.random(), which is not designed for security, is never used.",
        },
        {
          question: "How long should my password be?",
          answer:
            "Use at least 16 characters with all four character types for important accounts. When a site limits which symbols you can use, make the password longer instead. Length adds more strength than complexity.",
        },
        {
          question: "What does the strength estimate mean?",
          answer:
            "It shows the approximate entropy in bits: the password length multiplied by log₂ of the number of possible characters. Each extra bit doubles the number of guesses an attacker would need on average. It applies only to randomly generated passwords. No password is unbreakable, and a strong password still needs to be kept private and unique.",
        },
        {
          question: "Should I write my passwords down?",
          answer:
            "The safest approach is a reputable password manager, which stores every password securely so you only need to remember one strong master password. Turn on two-factor authentication wherever it is offered.",
        },
      ]}
    >
      <h2>How to generate a password</h2>
      <ol>
        <li>Set the length with the slider or type a number from 4 to 128.</li>
        <li>Tick the character types you want: uppercase, lowercase, numbers and symbols.</li>
        <li>Select <strong>Generate password</strong>. Changing an option creates a new password that matches it.</li>
        <li>Select <strong>Copy password</strong> and paste it where you need it, ideally into a password manager.</li>
      </ol>

      <h2>How this generator works</h2>
      <p>
        The generator first picks one character from every type you selected, so each one is always represented. It
        fills the remaining length from the combined pool of allowed characters, then shuffles the result with a
        Fisher–Yates shuffle. Every random choice comes from your browser’s cryptographically secure random number
        generator.
      </p>
      <p>The character sets are:</p>
      <ul>
        <li><strong>Uppercase:</strong> <code>{CHARACTER_SETS.uppercase}</code></li>
        <li><strong>Lowercase:</strong> <code>{CHARACTER_SETS.lowercase}</code></li>
        <li><strong>Numbers:</strong> <code>{CHARACTER_SETS.numbers}</code></li>
        <li><strong>Symbols:</strong> <code>{CHARACTER_SETS.symbols}</code></li>
      </ul>

      <h2>Understanding password strength</h2>
      <p>
        With all four types enabled there are 87 possible characters, so each one adds about 6.4 bits of entropy. An
        8-character password has about 52 bits, a 12-character password about 77 bits, a 16-character password about
        103 bits, and a 20-character password about 129 bits. Using numbers only, the
        same 16 characters give just 53 bits, which shows why a varied character set and a longer length both matter.
      </p>

      <h2>8, 12, 16 or 20 characters: which length should you choose?</h2>
      <ul>
        <li><strong>8 characters:</strong> only when a website won’t accept more. It is the minimum many services allow, not a good target.</li>
        <li><strong>12 characters:</strong> a reasonable minimum for less important accounts that also use two-factor authentication.</li>
        <li><strong>16 characters:</strong> the default here, and the length CISA recommends as a minimum. A good choice for most accounts.</li>
        <li><strong>20 or more:</strong> for email, banking and your password manager, or whenever you’re storing the password rather than typing it.</li>
      </ul>
      <p>
        Use the length buttons above the slider to switch quickly. For more detail, read our guide on{" "}
        <Link href="/blog/how-to-create-strong-passwords">how to create strong passwords</Link>.
      </p>

      <h2>Good password habits</h2>
      <ul>
        <li>Use a different password for every account, so one leak cannot unlock the others.</li>
        <li>Store passwords in a password manager rather than in notes, documents or chat messages.</li>
        <li>Turn on two-factor authentication for email, banking and social media accounts.</li>
        <li>Change a password promptly if a service tells you it has been involved in a data breach.</li>
      </ul>
      <p>
        Need to share a Wi-Fi password with guests? You can turn it into a scannable code with the{" "}
        <Link href="/qr-code-generator">QR Code Generator</Link>.
      </p>
    </ToolPage>
  );
}
