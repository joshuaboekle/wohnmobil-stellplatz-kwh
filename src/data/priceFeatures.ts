import {
  Cctv,
  Fence,
  Plug,
  Scan,
  Ruler,
  Leaf,
  Clock,
  CalendarCheck,
  CalendarDays,
  ShieldX,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type PriceFeature = { icon: LucideIcon; label: string };

export const priceFeatures: PriceFeature[] = [
  { icon: Cctv, label: "Videoüberwacht" },
  { icon: Fence, label: "Eingezäunt" },
  { icon: Plug, label: "inkl. 10 kWh Strom p. M." },
  { icon: Scan, label: "8×3 Meter groß" },
  { icon: Ruler, label: "6m breite Einfahrt und unbegrenzte Höhe" },
  { icon: Leaf, label: "Nachhaltiger Schotterrasen" },
  { icon: Clock, label: "24/7 Zugang per Karte" },
  { icon: CalendarCheck, label: "Monatliche Zahlung" },
  { icon: CalendarDays, label: "mind. Laufzeit 12 Monate" },
  { icon: ShieldX, label: "3 Monate Kündigungsfrist" },
  { icon: Wallet, label: "Keine Kaution" },
];
