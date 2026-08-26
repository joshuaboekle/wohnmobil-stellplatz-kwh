import { Link } from "react-router-dom";
import logoSymbol from "../assets/logo/Logo-Symbol.svg";
import ButtonLink from "./ui/ButtonLink";

type NavBarProps = {
  // Blendet Logo + CTA gemeinsam erst ein, sobald z. B. die Karte aus dem
  // Viewport gescrollt wurde. Ohne Angabe ist die NavBar immer sichtbar.
  visible?: boolean;
  // Blendet den "Stellplatz buchen"-CTA aus, z. B. auf dem Erfolgs-Screen
  // nach einer abgeschickten Anfrage, wo nur noch das Logo als Home-Link bleibt.
  showCta?: boolean;
};

export default function NavBar({ visible = true, showCta = true }: NavBarProps) {
  return (
    <header
      className={`sticky top-3 z-20 px-3 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-4 sm:px-4 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full bg-arctis-white px-3 py-2 shadow-lg shadow-royal-blue/10 sm:px-4 sm:py-2.5">
        <Link to="/" className="min-w-0 shrink-0">
          <span
            role="img"
            aria-label="Wohnmobil Stellplatz Kornwestheim"
            className="block h-8 w-20 bg-royal-blue sm:h-9 sm:w-[92px]"
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
        </Link>
        {showCta && (
          <ButtonLink
            to="/anfrage"
            variant="primary"
            className="shrink-0 !px-4 !py-2 !text-base sm:!px-6 sm:!py-2.5 sm:!text-lg"
          >
            Stellplatz buchen
          </ButtonLink>
        )}
      </div>
    </header>
  );
}
