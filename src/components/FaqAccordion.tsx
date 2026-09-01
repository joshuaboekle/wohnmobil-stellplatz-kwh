import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../data/faq";

type FaqAccordionProps = {
  items: FaqItem[];
};

// Rendert einfache Auszeichnungen aus den Notion-Inhalten: **fett** und
// [Linktext](/pfad oder https://...). Interne Links (mit "/" beginnend)
// nutzen React Router, externe Links öffnen in einem neuen Tab.
function renderFaqAnswer(text: string): ReactNode[] {
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      const linkText = match[2];
      const href = match[3];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={key++} to={href} className="underline">
            {linkText}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {linkText}
          </a>
        ),
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-arctis-white/20">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-start justify-between gap-6 py-4 text-left font-display text-body-lg text-arctis-white"
            >
              {item.question}
              <ChevronDown
                className={`h-7 w-7 shrink-0 text-arctis-white transition-transform duration-300 sm:h-8 sm:w-8 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="whitespace-pre-line pb-4 font-display text-body text-arctis-white/90">
                    {renderFaqAnswer(item.answer)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
