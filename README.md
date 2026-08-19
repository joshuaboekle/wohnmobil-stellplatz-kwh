# Der Abstellplatz – Kornwestheim

Website für den Wohnmobil-Stellplatz in Kornwestheim. Aktueller Stand: erste
Landingpage auf Basis des Figma-Prototyps ("Prototyp-Start").

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) (Van-Icon-Marquee)

## Voraussetzungen

- Node.js ≥ 20 (getestet mit v22)
- npm

## Erste Schritte

```bash
npm install
npm run dev
```

Der Dev-Server läuft danach unter **http://localhost:5173** mit Hot Reload.

## Weitere Befehle

| Befehl            | Beschreibung                                  |
| ------------------ | ---------------------------------------------- |
| `npm run dev`       | Startet den lokalen Entwicklungsserver          |
| `npm run build`     | Type-Check + Produktions-Build nach `dist/`     |
| `npm run preview`   | Baut nicht neu, dient nur zum lokalen Preview eines vorhandenen `dist/`-Builds |
| `npm run lint`      | Linting mit Oxlint                              |

## Projektstruktur

```
src/
├── App.tsx                 # Landingpage (Hero, Marquee, Optionen)
├── components/
│   ├── VanIcon.tsx          # Platzhalter-Icon fürs CI (→ ersetzen)
│   └── PricingCard.tsx      # Preis-Karte für die Stellplatz-Optionen
├── index.css                # Tailwind-Import + Design-Tokens (Farben, Fonts)
└── main.tsx                 # Einstiegspunkt
```

## Design-Tokens

Definiert in `src/index.css` (`@theme`-Block):

| Token                  | Wert       | Verwendung                     |
| ----------------------- | ---------- | -------------------------------- |
| `--color-brand-blue`     | `#013ACC`  | Primärfarbe / Hintergrund        |
| `--color-brand-blue-dark`| `#012E9E`  | Verlauf im Hero-Platzhalter      |
| `--color-brand-yellow`   | `#EBFE77`  | Akzentfarbe (CTA, Marquee)       |
| `--color-brand-mist`     | `#F3F8FC`  | Heller Hintergrund (Cards, Footer-Text) |

## Offene Punkte / TODO

Diese Punkte fehlen noch bewusst und werden ersetzt, sobald Material vorliegt:

- [ ] **Logo & echtes CI** – aktuell Platzhalter-Icon (`VanIcon.tsx`)
- [ ] **Echte Fotos/Video** im Hero – aktuell Gradient-Platzhalter
- [ ] **Schriftart "Apfel Grotezk"** (proprietär) – aktuell Space Grotesk (Headlines) + Inter (Fließtext) als Übergangslösung
- [ ] **Weitere Flows** aus Figma (Buchung, weitere Screens) noch nicht umgesetzt
- [ ] **Q&A-Anbindung an Notion**
- [ ] **Buchungsanfrage per Mail** (Formular + Versand-/Verwaltungslogik)

## Herkunft des Designs

Basiert auf dem Figma-File ["Der Abstellplatz – Kornwestheim"](https://www.figma.com/design/T0SQdY1pw2JE4RQoE117rK/Der-Abstellplatz---Kornwestheim),
Frame `Prototyp-Start`.
