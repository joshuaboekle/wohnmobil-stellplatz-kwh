import { Link } from "react-router-dom";

type FooterProps = {
  variant?: "light" | "dark";
};

export default function Footer({ variant = "light" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      className={`flex flex-col items-center justify-between gap-4 border-t px-3 py-8 text-center font-display text-sm sm:flex-row sm:px-10 sm:text-left ${
        isDark
          ? "border-arctis-white/10 bg-royal-blue text-arctis-white/70"
          : "border-royal-blue/10 bg-arctis-white text-royal-blue/70"
      }`}
    >
      <p>© {new Date().getFullYear()} Wohnmobil-Stellplatz-Kornwestheim</p>
      <Link
        to="/impressum"
        className={`underline underline-offset-2 ${isDark ? "hover:text-arctis-white" : "hover:text-royal-blue"}`}
      >
        Impressum
      </Link>
    </footer>
  );
}
