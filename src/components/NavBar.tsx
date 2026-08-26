import { Link } from "react-router-dom";
import logoSymbol from "../assets/logo/Logo-Symbol.svg";
import logoHorizontal from "../assets/logo/Logo-Horizontal.svg";
import ButtonLink from "./ui/ButtonLink";

type NavBarProps = {
  // Blendet Logo + CTA gemeinsam erst ein, sobald z. B. die Karte aus dem
  // Viewport gescrollt wurde. Ohne Angabe ist die NavBar immer sichtbar.
  visible?: boolean;
  // Blendet den "Stellplatz buchen"-CTA aus, z. B. auf dem Erfolgs-Screen
  // nach einer abgeschickten Anfrage, wo nur noch das Logo als Home-Link bleibt.
  showCta?: boolean;
  // Löst die NavBar aus dem Layoutfluss (position: fixed statt sticky), damit
  // sie über Inhalte (z. B. das Hero-Video) schwebt, statt deren Höhe zu
  // reservieren. Für Seiten ohne Hero (Impressum, Erfolgs-Screen) bleibt der
  // Default (sticky), da dort ohnehin immer Platz für die NavBar gebraucht wird.
  overlay?: boolean;
};

export default function NavBar({ visible = true, showCta = true, overlay = false }: NavBarProps) {
  return (
    <header
      className={`${overlay ? "fixed inset-x-0" : "sticky"} top-3 z-20 flex justify-center px-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-4 sm:px-4 ${
        visible ? "translate-y-0" : "pointer-events-none -translate-y-[150%]"
      }`}
    >
      <div className="mx-auto flex w-fit max-w-full items-center gap-8 rounded-full border border-arctis-white/40 bg-arctis-white/70 px-4 py-2.5 shadow-[0_8px_30px_-14px_rgba(2,1,129,0.35)] backdrop-blur-xl backdrop-saturate-150">
        <Link to="/" className="min-w-0 shrink-0">
          <span
            role="img"
            aria-label="Wohnmobil Stellplatz Kornwestheim"
            className="block h-9 w-9 bg-royal-blue sm:hidden"
            style={{
              maskImage: `url("${logoSymbol}")`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "left center",
              WebkitMaskImage: `url("${logoSymbol}")`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "left center",
            }}
          />
          <span
            role="img"
            aria-label="Wohnmobil Stellplatz Kornwestheim"
            className="hidden h-8 bg-royal-blue sm:block sm:w-[112px]"
            style={{
              maskImage: `url("${logoHorizontal}")`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "left center",
              WebkitMaskImage: `url("${logoHorizontal}")`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "left center",
            }}
          />
        </Link>
        {showCta && (
          <ButtonLink
            to="/anfrage"
            variant="primary"
            className="shrink-0 !px-6 !py-2.5 !text-lg"
          >
            Stellplatz buchen
          </ButtonLink>
        )}
      </div>
    </header>
  );
}
