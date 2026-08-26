import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import ButtonLink from "./ui/ButtonLink";
import { priceFeatures } from "../data/priceFeatures";

// Direkt sichtbar bis inkl. "Nachhaltiger Schotterrasen" (Index 5), der Rest
// klappt per Accordion auf -- so sieht man auf Anhieb die wichtigsten Punkte,
// ohne dass die Karte auf der Startseite zu lang wird.
const ALWAYS_VISIBLE_COUNT = 6;

function FeatureColumns({
  features,
  columns,
}: {
  features: typeof priceFeatures;
  // Optionale feste Spaltenaufteilung (z. B. die ursprüngliche 5/6-Teilung der
  // vollständigen Liste). Ohne Angabe wird mittig geteilt.
  columns?: [number, number];
}) {
  const split: (typeof priceFeatures)[] = columns
    ? [features.slice(0, columns[0]), features.slice(columns[0], columns[0] + columns[1])]
    : [features.slice(0, Math.ceil(features.length / 2)), features.slice(Math.ceil(features.length / 2))];

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-x-16">
      {split.map((column, colIndex) => (
        <ul key={colIndex} className="flex flex-1 flex-col gap-4">
          {column.map(({ icon: Icon, label }, i) => (
            <li key={`${label}-${i}`} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-royal-blue" aria-hidden="true" />
              <span className="font-display text-lg text-royal-blue sm:text-xl lg:text-2xl">
                {label}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function PriceCard() {
  const [infoOpen, setInfoOpen] = useState(false);
  const visibleFeatures = priceFeatures.slice(0, ALWAYS_VISIBLE_COUNT);
  const hiddenFeatures = priceFeatures.slice(ALWAYS_VISIBLE_COUNT);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 rounded-[32px] bg-arctis-white px-4 pt-6 pb-6 sm:px-6 sm:pt-8 lg:max-w-[800px] lg:px-10 lg:pt-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col text-royal-blue">
          <div className="flex items-baseline justify-between gap-2 text-[32px] leading-[1.1] sm:text-[44px] sm:leading-[50px] lg:justify-start lg:gap-8">
            <p className="font-display">Stellplatz</p>
            <p className="font-display font-medium whitespace-nowrap">85 €</p>
          </div>
          <div className="flex items-start justify-between font-display text-base opacity-60 sm:text-lg lg:justify-start lg:gap-8">
            <p>pro Monat</p>
            <p>inkl. Mwst.</p>
          </div>
        </div>

        <ButtonLink
          to="/anfrage"
          variant="primary"
          fullWidth
          className="!text-xl sm:!text-2xl lg:w-auto lg:shrink-0"
          icon={<ArrowRight className="h-6 w-6" aria-hidden="true" />}
        >
          Stellplatz buchen
        </ButtonLink>
      </div>

      {/* Mobile/Tablet: Accordion, damit die Karte nicht zu lang wird. */}
      <div className="lg:hidden">
        <FeatureColumns features={visibleFeatures} />

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setInfoOpen((prev) => !prev)}
            aria-expanded={infoOpen}
            className="flex w-full cursor-pointer items-center justify-between gap-3 font-display text-lg text-lake-blue sm:text-xl"
          >
            <span className="text-left">
              {infoOpen ? "Weniger Infos anzeigen" : "Alle Infos einblenden"}
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-6 sm:w-6 ${
                infoOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ gridTemplateRows: infoOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden pt-6">
              <FeatureColumns features={hiddenFeatures} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: alle Punkte direkt sichtbar, zweispaltig, kein Accordion. */}
      <div className="hidden lg:block">
        <FeatureColumns features={priceFeatures} columns={[5, 6]} />
      </div>
    </div>
  );
}
