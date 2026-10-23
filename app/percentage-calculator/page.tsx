import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { PercentageCalculator } from "@/components/tools/percentage-calculator";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("percentage-calculator");

export default function Page() {
  return (
    <ToolPage
      slug="percentage-calculator"
      intro="Solve the most common percentage problems instantly: a percentage of a number, what percent one number is of another, and the percentage increase or decrease between two values."
      tool={<PercentageCalculator />}
      faqs={[
        {
          question: "How do I calculate a percentage of a number?",
          answer:
            "Divide the percentage by 100 and multiply by the number. For example, 20% of 150 is 0.20 × 150 = 30.",
        },
        {
          question: "How do I calculate my percentage of marks?",
          answer:
            "Divide the marks you obtained by the total marks and multiply by 100. For example, 68 out of 80 is 85%. For several subjects, add up all obtained marks and all total marks first: 847 out of 1,100 is 77%.",
        },
        {
          question: "What is the difference between percentage change and percentage difference?",
          answer:
            "Percentage change measures how much a value moved from a starting point, so the direction matters: 40 to 60 is a 50% increase. Percentage difference compares two values with no starting point by dividing their difference by their average: 40 and 60 differ by 40%.",
        },
        {
          question: "Why can’t I calculate a percentage change from zero?",
          answer:
            "Percentage change compares the difference to the starting value. When the starting value is 0, that means dividing by zero, which has no defined answer. Describe the change as an absolute amount instead, for example “up from 0 to 25”.",
        },
        {
          question: "What happens with negative numbers?",
          answer:
            "All the calculators accept negative values. For percentage change, the difference is divided by the absolute (positive) size of the starting value, so a change from −50 to −25 is shown as a 50% increase, because the value went up.",
        },
        {
          question: "Is a 50% increase followed by a 50% decrease back to the start?",
          answer:
            "No. 100 increased by 50% is 150, but 150 decreased by 50% is 75. Each percentage is calculated from a different starting value.",
        },
        {
          question: "How many decimal places are shown?",
          answer:
            "Results are rounded to at most six decimal places, with trailing zeros removed. Numbers can include a decimal point and commas as thousands separators, such as 1,250.75.",
        },
      ]}
    >
      <h2>How to use the percentage calculator</h2>
      <ol>
        <li>Find the calculator that matches your question.</li>
        <li>Enter the two values. The result appears as soon as both are filled in.</li>
        <li>Select <strong>Copy result</strong> to copy the answer, or <strong>Clear</strong> to start again.</li>
      </ol>

      <h2>The formulas explained</h2>
      <h3>What is X% of Y?</h3>
      <p>
        Multiply Y by X divided by 100: <code>(X ÷ 100) × Y</code>. A percentage means “per hundred”, so 20% is 20 out of
        every 100, or 0.2. <strong>Example:</strong> a 15% tip on a $60 bill is 0.15 × 60 = $9.
      </p>
      <h3>X is what percent of Y?</h3>
      <p>
        Divide the part by the whole and multiply by 100: <code>(X ÷ Y) × 100</code>. <strong>Example:</strong> if you
        scored 42 out of 50 on a test, 42 ÷ 50 × 100 = 84%.
      </p>
      <h3>Percentage increase from X to Y</h3>
      <p>
        Subtract the starting value from the new value, divide by the starting value, and multiply by 100:{" "}
        <code>(Y − X) ÷ |X| × 100</code>. <strong>Example:</strong> rent rising from $1,200 to $1,320 is
        (1,320 − 1,200) ÷ 1,200 × 100 = a 10% increase.
      </p>
      <h3>Percentage decrease from X to Y</h3>
      <p>
        Subtract the new value from the starting value, divide by the starting value, and multiply by 100:{" "}
        <code>(X − Y) ÷ |X| × 100</code>. <strong>Example:</strong> a jacket reduced from $80 to $60 is
        (80 − 60) ÷ 80 × 100 = 25% off.
      </p>
      <p>
        If you enter values that move in the opposite direction, for example a “decrease” where the new value is higher,
        the calculator tells you it is actually an increase rather than showing a confusing negative number.
      </p>

      <h3>Percentage difference between X and Y</h3>
      <p>
        Use this when neither value is the starting point, for example comparing prices in two shops. Divide the
        difference by the average of the two values: <code>|X − Y| ÷ ((|X| + |Y|) ÷ 2) × 100</code>.{" "}
        <strong>Example:</strong> $40 and $60 differ by 20, and their average is 50, so the percentage difference is
        20 ÷ 50 × 100 = 40%. Unlike a percentage change, the result is the same whichever value you enter first.
      </p>

      <h2>How to calculate the percentage of marks</h2>
      <p>
        Use the “X is what percent of Y?” calculator: enter the marks you obtained as X and the total marks as Y. The
        formula is <code>marks obtained ÷ total marks × 100</code>.
      </p>
      <ul>
        <li>
          <strong>One exam:</strong> 68 out of 80 is 68 ÷ 80 × 100 = 85%.
        </li>
        <li>
          <strong>Several subjects:</strong> add up all the marks you obtained and all the maximum marks first, then
          divide. For example, 847 out of 1,100 is 847 ÷ 1,100 × 100 = 77%. Don’t average the subject percentages
          unless every subject has the same total.
        </li>
      </ul>
      <p>
        Converting a CGPA or GPA to a percentage uses formulas that differ between universities and boards, so use
        the method your institution publishes.
      </p>

      <h2>Percentage points vs. percent</h2>
      <p>
        When a rate changes from 4% to 5%, it has risen by one <em>percentage point</em> but by 25 <em>percent</em>{" "}
        (because 1 is 25% of 4). News reports and financial documents use these terms differently, so it is worth
        checking which one is meant.
      </p>
      <p>
        Working with text instead of numbers? The <Link href="/word-counter">Word Counter</Link> gives instant word and
        character totals.
      </p>
    </ToolPage>
  );
}
