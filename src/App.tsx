import VanIcon from "./components/VanIcon";
import VanMarquee from "./components/VanMarquee";
import PricingCard from "./components/PricingCard";
import arrowRightBold from "./assets/icons/arrow-right-bold.svg";

const faqItems = [
  "Hast du Fragen zu den Stellplätzen?",
  "Wann kann ich mein Fahrzeug abholen?",
  "Wie weit ist der Stellplatz von der Bahn entfernt?",
];

export default function App() {
  return (
    <div className="min-h-screen bg-brand-blue">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-brand-blue/90 px-6 py-4 backdrop-blur sm:px-10">
        <div className="font-display text-lg font-bold text-white">
          Der Abstellplatz
          <span className="ml-2 align-middle text-xs font-normal text-brand-yellow">
            Kornwestheim
          </span>
        </div>
        <a
          href="#optionen"
          className="rounded-sm bg-brand-yellow px-4 py-2 font-display text-sm font-medium text-brand-blue transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Stellplatz buchen
        </a>
      </header>

      {/* Hero */}
      <main>
        <section className="px-6 pt-10 pb-16 text-center sm:px-10">
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Wohnmobil
            <br />
            Stellplatz
          </h1>
          <p className="mt-2 font-display text-2xl text-brand-yellow sm:text-3xl">
            Kornwestheim
          </p>

          {/* Bild-/Video-Platzhalter: hier kommt das echte Motiv rein */}
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-[360px] overflow-hidden rounded-[42px] bg-gradient-to-br from-brand-blue-dark via-brand-blue to-[#0453e6] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <VanIcon className="h-20 w-32 text-white/70" />
            </div>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60">
              Foto / Video folgt
            </p>
          </div>
        </section>

        {/* Marquee-Band mit Van-Icons */}
        <VanMarquee />

        {/* Sicher stehen, sorglos starten */}
        <section className="bg-brand-blue px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-md">
            <h2 className="font-display text-3xl font-medium leading-snug text-brand-mist sm:text-4xl">
              Sicher stehen, sorglos starten.
            </h2>
            <p className="mt-6 text-lg text-brand-mist/90">
              Wir haben 35 Stellplätze in der Nähe von Stuttgart.
            </p>
            <p className="mt-4 text-lg text-brand-mist/90">
              Abgezäunt, überdacht und abgesichert.
              <br />
              <br />
              Mit der Bahn erreichbar, und weit weg vom Straßenrand.
            </p>
          </div>
        </section>

        {/* Optionen */}
        <section id="optionen" className="bg-brand-blue px-6 pb-16 sm:px-10">
          <p className="mb-6 text-center text-lg text-brand-mist">Unsere Optionen</p>
          <div className="mx-auto grid max-w-md gap-4">
            <PricingCard title="Stellplatz mit Überdachung" price="80 € pro Monat" highlighted />
            <PricingCard title="Stellplatz ohne Überdachung" price="60 € pro Monat" />
          </div>

          <div className="mx-auto mt-10 flex max-w-md justify-center">
            <button
              type="button"
              className="flex items-center gap-2 rounded-sm bg-brand-mist px-6 py-3 font-display text-lg text-brand-blue shadow-[0_14px_12px_rgba(0,0,0,0.05),0_0_2px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Karte öffnen
              <img src={arrowRightBold} alt="" className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>

          <p className="mx-auto mt-8 max-w-md text-sm text-brand-mist">
            *Übernachten ist auf dem Gelände nicht erlaubt, es handelt sich um einen Abstellplatz.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-brand-blue px-6 pb-20 sm:px-10">
          <div className="mx-auto max-w-md">
            <h2 className="mb-2 font-display text-2xl font-bold text-brand-mist">FAQ</h2>
            {faqItems.map((question) => (
              <details key={question} className="group border-b border-white/60 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg text-brand-mist marker:content-none">
                  {question}
                  <img
                    src={arrowRightBold}
                    alt=""
                    className="h-8 w-8 shrink-0 rotate-90 transition-transform group-open:-rotate-90"
                    aria-hidden="true"
                  />
                </summary>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-brand-mist/70 sm:px-10">
        © {new Date().getFullYear()} Der Abstellplatz — Kornwestheim
      </footer>
    </div>
  );
}
