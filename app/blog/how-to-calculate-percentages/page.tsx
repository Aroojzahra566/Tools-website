import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-calculate-percentages";
export const metadata = postMetadata(SLUG);

const s = {
  meaning: "What a percentage means",
  of: "How to find a percentage of a number",
  what: "How to find what percent one number is of another",
  increase: "How to calculate a percentage increase",
  decrease: "How to calculate a percentage decrease",
  marks: "How to calculate the percentage of marks",
  difference: "How to calculate the percentage difference between two numbers",
  shopping: "Shopping discounts, worked step by step",
  everyday: "Everyday uses",
  calculator: "Using the Percentage Calculator",
  mistakes: "Common mistakes",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> most percentage questions use one of three formulas.
      </p>
      <ul>
        <li>
          <strong>X% of Y</strong> = (X ÷ 100) × Y. For example, 15% of 80 = 0.15 × 80 = 12.
        </li>
        <li>
          <strong>X as a percentage of Y</strong> = (X ÷ Y) × 100. For example, 45 out of 60 = 0.75 × 100 = 75%.
        </li>
        <li>
          <strong>Percentage change</strong> = (new − original) ÷ |original| × 100. For example, from 50 to 65 = 15 ÷ 50
          × 100 = a 30% increase.
        </li>
      </ul>
      <p>
        The rest of this guide explains each formula with worked examples, including shopping discounts and the
        mistakes that trip people up most often.
      </p>

      <ToolCallout tool="percentage-calculator">
        Enter two numbers and get the answer instantly, with the formula shown for each calculation.
      </ToolCallout>

      <h2 id="meaning">{s.meaning}</h2>
      <p>
        “Per cent” means “per hundred”. A percentage is a way of writing a fraction with 100 as the bottom number, so 25%
        means 25 out of every 100, or 25 ÷ 100 = 0.25. Converting between the two forms is the key to every percentage
        calculation:
      </p>
      <ul>
        <li>
          To turn a percentage into a decimal, divide by 100: 7% = 0.07, and 150% = 1.5.
        </li>
        <li>
          To turn a decimal into a percentage, multiply by 100: 0.4 = 40%, and 0.025 = 2.5%.
        </li>
      </ul>
      <p>
        Percentages make it easy to compare amounts of different sizes. Scoring 18 out of 20 and 45 out of 50 sounds
        different, but both are 90%.
      </p>

      <h2 id="of">{s.of}</h2>
      <p>
        <strong>Formula:</strong> result = (X ÷ 100) × Y
      </p>
      <p>
        Convert the percentage to a decimal, then multiply. For example, to find 12% of 250:
      </p>
      <ol>
        <li>12 ÷ 100 = 0.12</li>
        <li>0.12 × 250 = 30</li>
      </ol>
      <p>
        So 12% of 250 is 30. A quick mental check: 10% of any number is that number divided by 10, so 10% of 250 is 25.
        The answer of 30 should be a little more than that, and it is.
      </p>

      <h2 id="what">{s.what}</h2>
      <p>
        <strong>Formula:</strong> percentage = (X ÷ Y) × 100
      </p>
      <p>
        Divide the part by the whole, then multiply by 100. For example, if you scored 42 out of 48 on a test:
      </p>
      <ol>
        <li>42 ÷ 48 = 0.875</li>
        <li>0.875 × 100 = 87.5%</li>
      </ol>
      <p>
        The whole (Y) can’t be zero, because you can’t divide by zero. “What percent of 0 is 5?” has no meaningful
        answer, and a good calculator should say so rather than show an error value like “Infinity”.
      </p>

      <h2 id="increase">{s.increase}</h2>
      <p>
        <strong>Formula:</strong> increase = (new value − original value) ÷ |original value| × 100
      </p>
      <p>
        The <strong>original value</strong> is the reference point. Always divide by the value you started from, not
        the new one. For example, if your rent rises from $2,000 to $2,500 a month:
      </p>
      <ol>
        <li>Find the difference: 2,500 − 2,000 = 500</li>
        <li>Divide by the original value: 500 ÷ 2,000 = 0.25</li>
        <li>Multiply by 100: 0.25 × 100 = 25% increase</li>
      </ol>
      <p>
        If the result is negative, the value actually went down. The vertical bars around the original value mean its
        absolute value (the number without its sign). That keeps the direction right when the starting value is
        negative: going from −20 to −10 is a 50% increase, because the value moved up.
      </p>

      <h2 id="decrease">{s.decrease}</h2>
      <p>
        <strong>Formula:</strong> decrease = (original value − new value) ÷ |original value| × 100
      </p>
      <p>
        This is the same calculation with the subtraction reversed, so a fall gives a positive number. For example, if
        your monthly phone bill drops from $80 to $60:
      </p>
      <ol>
        <li>Find the difference: 80 − 60 = 20</li>
        <li>Divide by the original value: 20 ÷ 80 = 0.25</li>
        <li>Multiply by 100: 0.25 × 100 = 25% decrease</li>
      </ol>
      <p>
        For both increases and decreases, the original value can’t be zero. A change from 0 to 5 can’t be expressed as a
        percentage, because there is no starting amount to compare with. In that case, describe the change in absolute
        terms instead, such as “up by 5”.
      </p>

      <h2 id="marks">{s.marks}</h2>
      <p>
        <strong>Formula:</strong> percentage = marks obtained ÷ total marks × 100
      </p>
      <p>
        This is the “X is what percent of Y” calculation. For one exam, 68 out of 80 is 68 ÷ 80 × 100 = 85%. For a
        whole result across several subjects, add everything up first:
      </p>
      <ol>
        <li>Add the marks you obtained in every subject, for example 847.</li>
        <li>Add the maximum marks for every subject, for example 1,100.</li>
        <li>Divide and multiply by 100: 847 ÷ 1,100 × 100 = 77%.</li>
      </ol>
      <p>
        Avoid averaging the percentages of individual subjects unless every subject has the same maximum marks.
        Otherwise subjects with smaller totals count for more than they should. Converting a CGPA or GPA to a
        percentage is different again: universities and boards publish their own formulas, so use the one your
        institution specifies.
      </p>

      <h2 id="difference">{s.difference}</h2>
      <p>
        <strong>Formula:</strong> difference = |X − Y| ÷ ((|X| + |Y|) ÷ 2) × 100
      </p>
      <p>
        Percentage <em>change</em> needs a starting value. When you compare two values on an equal footing, such as the
        price of the same item in two shops, use the percentage <em>difference</em> instead. It divides the gap by the
        average of the two values. For prices of $40 and $60:
      </p>
      <ol>
        <li>Difference: |40 − 60| = 20</li>
        <li>Average: (40 + 60) ÷ 2 = 50</li>
        <li>20 ÷ 50 × 100 = 40%</li>
      </ol>
      <p>
        Swapping the two values gives the same answer, which is the point of this formula. Compare that with percentage
        change: going from 40 to 60 is a 50% increase, but going from 60 to 40 is a 33.3% decrease.
      </p>

      <h2 id="shopping">{s.shopping}</h2>
      <h3>Finding a sale price</h3>
      <p>
        A $120 jacket is 25% off. The discount is 25% of 120 = 0.25 × 120 = $30, so you pay 120 − 30 = $90. A shortcut
        is to multiply by what remains: 25% off leaves 75%, and 0.75 × 120 = $90.
      </p>
      <h3>Stacked discounts</h3>
      <p>
        An item is 20% off, with an extra 10% off at the checkout. That is <em>not</em> 30% off. The second discount
        applies to the already reduced price. On a $100 item: 100 × 0.8 = $80, then 80 × 0.9 = $72, a total saving of
        28%.
      </p>
      <h3>Finding the original price</h3>
      <p>
        A sale price is $64 after 20% off. What was the original price? The $64 is 80% of the original, so divide by
        0.8: 64 ÷ 0.8 = $80. Adding 20% to the sale price (64 × 1.2 = $76.80) gives the wrong answer, because the
        discount was calculated on the original price, not the sale price.
      </p>
      <h3>Adding sales tax</h3>
      <p>
        A $40 purchase with 8% sales tax costs 40 × 1.08 = $43.20. Multiplying by 1.08 adds the original 100% and the
        8% tax in one step.
      </p>

      <h2 id="everyday">{s.everyday}</h2>
      <ul>
        <li>
          <strong>Tipping:</strong> an 18% tip on a $55 bill is 0.18 × 55 = $9.90.
        </li>
        <li>
          <strong>Grades:</strong> 42 correct answers out of 48 is 87.5%.
        </li>
        <li>
          <strong>Pay rises:</strong> a raise from $20.00 to $21.50 an hour is (21.50 − 20.00) ÷ 20.00 × 100 = 7.5%.
        </li>
        <li>
          <strong>Budgeting:</strong> spending $450 of a $1,800 monthly budget on food is 450 ÷ 1,800 × 100 = 25%.
        </li>
        <li>
          <strong>Progress:</strong> 3,000 steps toward a 10,000-step goal is 30% complete.
        </li>
      </ul>

      <h2 id="calculator">{s.calculator}</h2>
      <p>
        The <Link href="/percentage-calculator">Percentage Calculator</Link> has a separate panel for each calculation in
        this guide: X% of Y, X as a percentage of Y (which also works for marks), increase, decrease and difference:
      </p>
      <ol>
        <li>Find the panel that matches your question, such as “What is X% of Y?”.</li>
        <li>Type your two numbers. Decimals work, and you can include thousands separators like 1,250.</li>
        <li>The answer appears as you type, with a sentence explaining it and the formula used.</li>
        <li>
          Select <strong>Copy result</strong> to copy the answer, or <strong>Clear</strong> to start again.
        </li>
      </ol>
      <p>
        If you enter something that isn’t a number, or a calculation would divide by zero, the calculator explains the
        problem instead of showing a misleading result.
      </p>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Dividing by the wrong number.</strong> Percentage change always compares with the original value. From
          80 to 100 is a 25% increase, but from 100 to 80 is a 20% decrease.
        </li>
        <li>
          <strong>Expecting increases and decreases to cancel out.</strong> Increasing 100 by 10% gives 110, but then
          decreasing 110 by 10% gives 99, not 100.
        </li>
        <li>
          <strong>Adding stacked discounts.</strong> 20% off plus 10% off is 28% off, not 30%.
        </li>
        <li>
          <strong>Confusing percent with percentage points.</strong> An interest rate rising from 4% to 5% has gone up
          by one percentage point, which is a 25% increase in the rate itself.
        </li>
        <li>
          <strong>Forgetting to convert.</strong> 15% of 80 is 0.15 × 80, not 15 × 80.
        </li>
      </ul>

      <ArticleFaq
        items={[
          {
            q: "How do I calculate a percentage on a phone calculator?",
            a: "Use the decimal form. For 15% of 80, type 0.15 × 80 = 12. For what percent 45 is of 60, type 45 ÷ 60 × 100 = 75. Many calculators also have a % key, but its behavior varies between models.",
          },
          {
            q: "Can a percentage be more than 100%?",
            a: "Yes. A value can grow by more than 100%: going from 50 to 150 is a 200% increase. Something can also be more than 100% of a reference, such as 120% of last year’s sales. A decrease can’t exceed 100% for a quantity that can’t go below zero.",
          },
          {
            q: "What is the difference between percentage change and percentage difference?",
            a: "Percentage change compares a new value with a specific original value, so the direction matters. Percentage difference compares two values with no clear starting point by dividing their difference by their average, so 40 and 60 differ by 40% whichever comes first.",
          },
          {
            q: "Why can’t I calculate a percentage increase from zero?",
            a: "The formula divides by the original value, and dividing by zero is undefined. Any increase from zero would be infinitely large in percentage terms, so it is better to describe it as an absolute change.",
          },
          {
            q: "How do I reverse a percentage to find the original number?",
            a: "Divide by the remaining fraction. If $64 is the price after 20% off, it is 80% of the original, so 64 ÷ 0.8 = $80. If $43.20 includes 8% tax, the price before tax was 43.20 ÷ 1.08 = $40.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        Nearly every percentage question comes down to one of three ideas: take a percentage of a number, express one
        number as a percentage of another, or measure the change from an original value. Convert percentages to
        decimals, always divide by the right reference value, and remember that zero can’t be a starting point. For
        quick answers with the working shown, use the{" "}
        <Link href="/percentage-calculator">Percentage Calculator</Link>.
      </p>
    </ArticleLayout>
  );
}
