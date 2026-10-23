import { isValidElement, type ReactNode } from "react";

/** Plain text of a React node (strings plus the text inside links and other elements). */
export function nodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

/** FAQPage structured data built from the same questions and answers shown on the page. */
export function faqPageData(items: { question: string; answer: ReactNode }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: nodeText(item.answer).replace(/\s+/g, " ").trim() },
    })),
  };
}
