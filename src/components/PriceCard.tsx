import { ArrowRight } from "lucide-react";
import ButtonLink from "./ui/ButtonLink";
import { priceFeatures } from "../data/priceFeatures";

export default function PriceCard() {
  return (
    <div className="flex w-full max-w-[370px] flex-col gap-6 rounded-[32px] bg-arctis-white px-4 pt-6 pb-6 sm:px-6 sm:pt-8 lg:max-w-[800px] lg:px-10 lg:pt-10">
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
          className="!text-lg sm:!text-xl lg:w-auto lg:shrink-0"
          icon={<ArrowRight className="h-6 w-6" aria-hidden="true" />}
        >
          Stellplatz buchen
        </ButtonLink>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-x-16">
        {[priceFeatures.slice(0, 5), priceFeatures.slice(5)].map((column, colIndex) => (
          <ul key={colIndex} className="flex flex-1 flex-col gap-4">
            {column.map(({ icon: Icon, label }, i) => (
              <li key={`${label}-${i}`} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-royal-blue" aria-hidden="true" />
                <span className="font-display text-base text-royal-blue sm:text-lg lg:text-2xl">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
