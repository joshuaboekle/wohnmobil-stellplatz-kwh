import { useEffect, useRef, useState } from "react";
import { Milestone, TrainFront, Home as HomeIcon, Copy, Check, Leaf, Phone } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PriceCard from "../components/PriceCard";
import VanMarquee from "../components/VanMarquee";
import HeroGif from "../components/ui/HeroGif";
import PlaceholderBox from "../components/ui/PlaceholderBox";
import MapEmbed from "../components/ui/MapEmbed";
import LogoAnimated from "../components/ui/LogoAnimated";
import FaqAccordion from "../components/FaqAccordion";
import { faqItems } from "../data/faq";
import manWithCamperImg from "../assets/img/man-with-camper.webp";
import schotterrasenImg from "../assets/img/schotterrasen.webp";

// Beispiel-Koordinaten (Kornwestheim) bis der echte Standort feststeht.
const STELLPLATZ_LOCATION = { lat: 48.8574518, lng: 9.1888737 };
const STELLPLATZ_ADDRESS = "Straßenname 23, 70806 Kornwestheim";
const CONTACT_EMAIL = "info@wohnmobil-stellplatz-kornwestheim.de";
const CONTACT_PHONE = "01223 3445456";

const secondaryIconButtonClassName =
  "flex shrink-0 items-center justify-center rounded-full border border-arctis-white/40 p-3 text-arctis-white transition-[filter,transform] duration-100 active:brightness-[0.84] active:scale-[0.98]";

export default function Home() {
  const priceCardRef = useRef<HTMLDivElement>(null);
  const [priceCardIntersecting, setPriceCardIntersecting] = useState(false);
  const [hasSeenPriceCard, setHasSeenPriceCard] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const navBarVisible = hasSeenPriceCard && !priceCardIntersecting;

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(STELLPLATZ_ADDRESS);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    const target = priceCardRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPriceCardIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) setHasSeenPriceCard(true);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-royal-blue">
      <NavBar visible={navBarVisible} overlay />

      <main>
        {/* Hero */}
        <section className="px-3 pt-10 pb-6 text-center sm:px-10 sm:pt-14 sm:pb-16 lg:flex lg:h-[640px] lg:px-0 lg:pt-0 lg:pb-0 lg:text-left">
          <h1 className="lg:flex lg:h-full lg:flex-1 lg:flex-col lg:justify-center lg:px-10 xl:px-16">
            <LogoAnimated
              className="mx-auto h-auto w-full max-w-[220px] lg:mx-auto lg:max-w-[360px]"
            />
            <span className="sr-only">Wohnmobil Stellplatz Kornwestheim</span>
          </h1>

          <div className="animate-blur-in relative z-0 mx-0 mt-12 mb-0 aspect-square w-full sm:mx-auto sm:mt-10 sm:mb-0 sm:max-w-[400px] lg:relative lg:mx-0 lg:mt-0 lg:mb-0 lg:aspect-auto lg:h-full lg:w-auto lg:max-w-none lg:flex-1 [animation-delay:150ms]">
            <HeroGif className="size-full lg:!rounded-tl-none lg:!rounded-tr-none lg:!rounded-br-none lg:!rounded-bl-[32px]" />
          </div>
        </section>

        {/* Preis */}
        <section className="flex flex-col items-center gap-6 px-3 pt-6 pb-16 sm:px-10 sm:py-16">
          <p className="max-w-[322px] text-center font-display text-body-lg text-arctis-white">
            Einfacher Preis.
            <br />
            Keine komplizierten Tarife.
          </p>
          <div ref={priceCardRef} className="w-full">
            <PriceCard />
          </div>
          <p className="max-w-[370px] text-center font-display text-body text-arctis-white lg:max-w-[800px] lg:text-nowrap">
            *Übernachten ist auf dem Gelände nicht erlaubt, es handelt sich um einen Abstellplatz.
          </p>
        </section>

        <div className="bg-arctis-white">
          <VanMarquee />

          {/* Sicher stehen, sorglos starten */}
          <section className="flex items-center justify-center px-3 pt-16 pb-12 sm:px-10 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16">
            <div className="flex w-full max-w-md flex-col gap-8 lg:max-w-5xl lg:flex-row lg:items-center lg:gap-16">
              <div className="flex flex-1 flex-col gap-8">
                <MapEmbed
                  lat={STELLPLATZ_LOCATION.lat}
                  lng={STELLPLATZ_LOCATION.lng}
                  label="Standort des Stellplatzes (Beispiel-Location)"
                />
                <div className="flex items-center justify-between">
                  <p className="font-display text-body-lg text-royal-blue">
                    Straßenname 23
                    <br />
                    70806 Kornwestheim
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    aria-label="Adresse kopieren"
                    className="flex shrink-0 items-center justify-center rounded-full border border-royal-blue/40 p-3 text-royal-blue transition-[filter,transform] duration-100 active:brightness-[0.84] active:scale-[0.98]"
                  >
                    {addressCopied ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-8">
                <h2 className="font-display text-h2 text-royal-blue">
                  Sicher stehen,
                  <br />
                  sorglos starten.
                </h2>
                <p className="font-display text-body-lg text-royal-blue">
                  Der Abstellplatz liegt zentral zwischen Stuttgart und Ludwigsburg.
                </p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-2.5 font-display text-body-lg text-royal-blue">
                    <Milestone className="h-6 w-6 shrink-0" aria-hidden="true" />
                    5 Min. zur A81
                  </li>
                  <li className="flex items-center gap-2.5 font-display text-body-lg text-royal-blue">
                    <TrainFront className="h-6 w-6 shrink-0" aria-hidden="true" />
                    10 Min. zu Fuß zum Bahnhof Kornwestheim
                  </li>
                  <li className="flex items-center gap-2.5 font-display text-body-lg text-royal-blue">
                    <HomeIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Betreiber wohnt nebenan
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Nachhaltigkeit */}
        <section className="flex items-center justify-center bg-arctis-white px-3 pt-16 pb-24 sm:px-10 sm:pt-16 sm:pb-28">
          <div className="flex w-full max-w-md flex-col gap-8 lg:max-w-5xl lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-1 flex-col items-start gap-8">
              <Leaf className="h-14 w-14 text-royal-blue sm:h-16 sm:w-16" aria-hidden="true" />
              <h2 className="font-display text-h2 text-royal-blue">
                Unser nachhaltiger Schotterrasen
              </h2>
              <PlaceholderBox className="h-72 w-full sm:h-80">
                <img
                  src={schotterrasenImg}
                  alt="Nachhaltiger Schotterrasen als Stellfläche"
                  className="h-full w-full object-cover"
                />
              </PlaceholderBox>
            </div>
            <p className="flex-1 font-display text-body-lg text-royal-blue">
              Statt Asphalt setzen wir auf Schotterrasen.
              <br />
              <br />
              Er lässt Regenwasser natürlich versickern, füllt damit das Grundwasser und hält den
              Boden lebendig.
              <br />
              <br />
              Für Ihr Fahrzeug macht das keinen Unterschied, die Stellfläche bleibt eben, stabil
              und ganzjährig einsatzbereit.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-royal-blue px-3 py-16 sm:px-10">
          <div className="mx-auto max-w-md lg:max-w-2xl">
            <h2 className="mb-2 font-display text-h2 text-arctis-white">
              Fragen und Antworten
            </h2>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* Persönliche Vorstellung */}
        <section className="flex items-center justify-center bg-royal-blue px-3 py-16 sm:px-10">
          <div className="flex w-full max-w-md flex-col gap-8 lg:max-w-5xl lg:flex-row lg:items-end lg:gap-16">
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="font-display text-h2 text-arctis-white">
                Immer ein Auge drauf.
              </h2>
              <div className="flex flex-col gap-4">
                <p className="font-display text-body-lg text-arctis-white">
                  Hi. Ich bin Simon und wohne direkt neben dem Abstellplatz.
                </p>
                <p className="font-display text-body-lg text-arctis-white">
                  Da ich selbst Camper bin, weiß ich, dass Ihr Fahrzeug einen sicheren Unterschlupf
                  braucht.
                </p>
              </div>
              <PlaceholderBox className="h-72 w-full sm:h-80">
                <img
                  src={manWithCamperImg}
                  alt="Simon, der Betreiber, vor seinem eigenen Camper"
                  className="h-full w-full object-cover"
                />
              </PlaceholderBox>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <h3 className="font-display text-h3 text-arctis-white">
                Gibt es noch Fragen?
              </h3>
              <div className="w-full divide-y divide-arctis-white/20 rounded-2xl">
                <div className="flex items-center justify-between gap-4 py-4">
                  <p className="font-display text-body-lg text-arctis-white">
                    {CONTACT_EMAIL}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="E-Mail-Adresse kopieren"
                    className={secondaryIconButtonClassName}
                  >
                    {emailCopied ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 py-4">
                  <p className="font-display text-body-lg text-arctis-white">
                    {CONTACT_PHONE}
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                    aria-label="Anrufen"
                    className={secondaryIconButtonClassName}
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="dark" />
    </div>
  );
}
