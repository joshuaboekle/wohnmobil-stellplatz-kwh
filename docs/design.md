# Design-Dokumentation

Quelle: Figma-File ["Der Abstellplatz – Kornwestheim"](https://www.figma.com/design/T0SQdY1pw2JE4RQoE117rK/Der-Abstellplatz---Kornwestheim).

Stand: 2026-08-21. Das File enthält **zwei Design-Generationen**:

1. **"Prototyp-Start"** (Node `133:358`) — der ursprüngliche, einzelne Mobile-Screen, auf dessen Basis die aktuelle Landingpage im Code gebaut wurde.
2. **"Explorations"** (Seite `0:1`) — eine deutlich weiterentwickelte, vollständige Screen-Sammlung mit echtem Logo, neuer Farbpalette, Mobile- **und** Desktop-Varianten sowie einem kompletten Buchungs-Flow. Dies ist der aktuelle, maßgebliche Design-Stand.

Dieses Dokument beschreibt primär Generation 2 ("Explorations"), da sie den aktuellen Stand des Designs abbildet. Wo relevant, ist auf Abweichungen zum bereits umgesetzten Code (Generation 1) hingewiesen.

## Inhalt

- [Markenidentität](#markenidentität)
- [Farbpalette](#farbpalette)
- [Typografie](#typografie)
- [Navigation](#navigation)
- [Screen: Start (Mobile & Desktop)](#screen-start-mobile--desktop)
- [Screen: Buchungsformular "Stellplatz anfragen"](#screen-buchungsformular-stellplatz-anfragen)
- [Komponenten-Inventar](#komponenten-inventar)
- [Abgleich mit aktuellem Code](#abgleich-mit-aktuellem-code)
- [Offene Punkte / TODO](#offene-punkte--todo)

## Markenidentität

Es existiert ein echtes Logo (kein Platzhalter mehr) in zwei Teilen, die als eigenständige Assets exportiert werden:

- **Icon**: stilisiertes Van-Symbol (Node-Name `Logo`)
- **Wordmark**: "Wohnmobil Stellplatz Kornwestheim" als eigenes SVG (Node-Name `Wohnmobil Stellplatz Kornwestheim`)

Beide erscheinen oben auf den Start-Screens (Mobile wie Desktop) übereinander bzw. nebeneinander. Auf der Visual-Design-Seite gibt es zusätzlich 4 Logo-Lockup-Varianten (horizontal/vertikal, hell/dunkel) zur Auswahl für z. B. Footer oder Favicon.

## Farbpalette

Aktuell gültige Palette (aus den Start-/Buchungs-Screens, als Figma-Variablen definiert):

| Name | Variable | Hex | Verwendung |
| --- | --- | --- | --- |
| Royal Blue | `--royal-blue` | `#020181` | Primärfarbe / Haupt-Hintergrund |
| Arctis White | `--arctis-white` | `#EFFFFF` | Card-/Formular-Hintergrund, heller Textblock-Hintergrund |
| Lake Blue | `--lake-blue` | `#5888EA` | Interaktions-/Akzentfarbe: ausgewählte Auswahl-Buttons, Formular-CTA "Stellplatz anfragen", Links ("Alle Infos einblenden"), ausgefüllte Formularwerte |
| Powder Blue | `--powder-blue` | `#D0E6FD` | Eingabefeld-Rahmen, dezenter Button-Hintergrund (z. B. Karten-Pin-Button) |

**Diese Palette ersetzt die im Prototyp-Start-Frame verwendete und aktuell im Code (`src/index.css`) hinterlegte Palette:**

| Token (Code, veraltet) | Wert |
| --- | --- |
| `--color-brand-blue` | `#013ACC` |
| `--color-brand-blue-dark` | `#012E9E` |
| `--color-brand-yellow` | `#EBFE77` |
| `--color-brand-mist` | `#F3F8FC` |

→ Die neue Palette (Royal Blue / Arctis White / Lake Blue / Powder Blue) sollte vor dem nächsten Code-Update mit dem Designer/Auftraggeber final abgenommen und dann in `src/index.css` übernommen werden — inkl. Anpassung aller Komponenten, die aktuell `brand-yellow`/`brand-mist` nutzen.

## Typografie

Schriftart durchgängig: **Apfel Grotezk** (proprietär, Dateien nicht im Figma-File enthalten) in drei Schnitten:

| Figma-Stilname | Code-Bedeutung | Verwendung |
| --- | --- | --- |
| H2 | Fett (700), 44px, Zeilenhöhe 43px | Sektions-Headlines ("Sicher stehen, sorglos starten.", "Unser nachhaltiger Schotterrasen", "Interesse an einem Stellplatz?") |
| Body/Medium | Mittel (500), 24px | Betonter Fließtext, z. B. Preis "85 €", FAQ-Fragen |
| Body/Regular | Regular (400), 24px | Standard-Fließtext, Formular-Labels, Button-Text |

Im Code aktuell ersetzt durch **Space Grotesk** (Headlines) + **Inter** (Fließtext) als Übergangslösung, siehe [README.md](../README.md).

## Navigation

Einfache NavBar, auf Mobile wie Desktop gleich aufgebaut:

- Links: Logo (Icon, kompakt)
- Rechts: Button "Stellplatz buchen" (führt vermutlich zum Buchungsformular)

## Screen: Start (Mobile & Desktop)

Nodes: `Mobile/Start` (145:5749, 402×5740) und `Desktop/Start` (196:9262, 1280×4556). Inhaltlich identisch, nur im Layout unterschiedlich (Desktop: teils zweispaltig). Beide simulieren die Gerätechrome (Statusbar, Adresszeile) — das ist **keine** echte Website-UI und wird nicht übernommen.

Aufbau von oben nach unten:

1. **Logo-Header** (Icon + Wordmark)
2. **Hero-Bild/Video**: großformatiger, abgerundeter Bereich mit Platzhalter-Motiv ("Follow Me Wow GIF" — Drittanbieter-Placeholder, kein finales Material) + Play/Pause-Button
3. **Pricing Card** "Stellplatz — 85 € pro Monat, inkl. MwSt.":
   - Text: "Einfacher Preis. Keine komplizierten Tarife."
   - CTA-Button "Stellplatz buchen" (Royal Blue Button in weißer Card)
   - Feature-Liste (11 Punkte, mit Icons):
     - Videoüberwacht
     - Eingezäunt
     - inkl. 10 kWh Strom p. M.
     - 8×3 Meter groß
     - 6m breite Einfahrt und unbegrenzte Höhe
     - Nachhaltiger Schotterrasen
     - 24/7 Zugang per Karte
     - Monatliche Zahlung
     - mind. Laufzeit 12 Monate
     - 3 Monate Kündigungsfrist
     - Keine Kaution
   - Footnote: *„Übernachten ist auf dem Gelände nicht erlaubt, es handelt sich um einen Abstellplatz."*
4. **Van-Marquee**: horizontal scrollende Van-Illustrationen (identisch zum Prototyp-Start, bereits im Code umgesetzt)
5. **"Sicher stehen, sorglos starten."**:
   - "Der Abstellplatz liegt zentral zwischen Stuttgart und Ludwigsburg."
   - Standortvorteile: "5 Min. zur A81" / "10 Min. zu Fuß zum Bahnhof Kornwestheim" / "Betreiber wohnt nebenan"
   - Foto/Karten-Bild (Platzhalter, Screenshot-Asset)
   - Adresse "Straßenname 23, 70806 Kornwestheim" + runder Karten-Pin-Button
6. **FAQ** (Akkordeon, 4 Einträge — teils mit dupliziertem Eintrag "Wie weit ist der Stellplatz von der Bahn entfernt?"):
   - "Wann kann ich mein Fahrzeug abholen?"
   - "Wie weit ist der Stellplatz von der Bahn entfernt?"
   - "Welche Fahrzeuge können abgestellt werden?" *(im Screen aufgeklappt dargestellt)*: Antworttext — *„Der Stellplatz eignet sich für: Wohnmobile, Wohnwagen, Campervans, Campingbusse, Bootsanhänger, Pkw-Anhänger, Motorräder, Oldtimer, Transporter, weitere Fahrzeuge nach Absprache. Voraussetzung: Das Fahrzeug muss während der gesamten Mietdauer über einen bestehenden Versicherungsschutz verfügen. Für jede Art von Schäden, die an den abgestellten Objekten entstehen, übernimmt der Vermieter gegenüber dem Mieter keinerlei Haftung."*
   - (zweiter, identischer Eintrag "Wie weit ist der Stellplatz von der Bahn entfernt?" — wirkt wie ein Duplikat/Platzhalter im Figma-File)
7. **Persönliche Vorstellung**: "Das bin ich mit meinem eigenen Camper." + Foto-Platzhalter + Kontaktblock: "Hier kannst du mich erreichen." — Name (nur Desktop sichtbar: "Simon Greiner"), Telefon "012233445456", E-Mail "info@wohnmobil-stellplatz-kwh.de"
8. **"Unser nachhaltiger Schotterrasen"**: Icon, Bild-Platzhalter, Erklärtext zu Versickerung/Nachhaltigkeit gegenüber Asphalt
9. **Footer** (nur im Desktop-Screen sichtbar): "© 2026 Wohmobil-Stellplatz-Kornwestheim" + Link "Impressum"

## Screen: Buchungsformular "Stellplatz anfragen"

Eigenständiger Flow, in 3 Formular-Zuständen + 1 Bestätigungsscreen erfasst, jeweils als Mobile- und Desktop-Variante:

- `Mobile/ContactForm/NotFilled` (171:7941) — leeres Formular
- `ContactForm/Filled` (171:8446) — ausgefülltes Beispiel
- ein dritter Zustand (171:8590, vermutlich Lade-/Validierungs-Zustand — noch nicht im Detail ausgelesen)
- `ContactForm/Feedback` (171:8713) — Bestätigung
- `Desktop/ContactForm` (200:9704) — Desktop-Variante des leeren Formulars, zweispaltig

**Aufbau:**

1. Header: Zurück-Pfeil + "Stellplatz anfragen"
2. Headline "Interesse an einem Stellplatz?"
3. Eingeklappte Preis-Zusammenfassung (85 €/Monat) mit Link "Alle Infos einblenden"
4. **Fahrzeugtyp** (Pflichtfeld, Button-Grid 2×4, Single-Select — ausgewählt = Lake-Blue-Hintergrund): Wohnmobil, Wohnwagen, Anhänger, Bootsanhänger, Motorrad, Oldtimer, Transporter, Sonstiges
5. **Fahrzeuggröße**: Länge / Breite (Zahlenfelder, in Metern; Beispielwerte im "Filled"-Screen: 6m × 3m)
6. **Mietbeginn*** (Datumsfeld; Beispiel: "November 2026")
7. **Nachricht** (optionales Freitextfeld)
8. **Kontaktdaten**: Name* / E-Mail-Adresse* / Telefonnummer (optional)
9. Hinweistext: *„Senden Sie uns einfach eine unverbindliche Anfrage. Wir melden uns anschließend persönlich bei Ihnen zurück."*
10. CTA-Button "Stellplatz anfragen" (Lake Blue, volle Breite)
11. Bestätigungsscreen nach Absenden: "Anfrage gesendet." / "Wir melden uns bald bei Ihnen."

→ Das ist der im README als offen markierte Punkt **"Buchungsanfrage per Mail (Formular + Versand-/Verwaltungslogik)"**. Das Formular selbst ist im Figma-File jetzt vollständig spezifiziert.

## Komponenten-Inventar

| Komponente | Beschreibung | Status im Code |
| --- | --- | --- |
| NavBar | Logo + "Stellplatz buchen"-Button | teilweise vorhanden ([App.tsx](../src/App.tsx) Header), Logo fehlt noch |
| Pricing Card (erweitert) | Preis + CTA + 11 Feature-Zeilen mit Icons | nur einfache Variante (Titel/Preis/CTA) vorhanden, [PricingCard.tsx](../src/components/PricingCard.tsx) |
| Van-Marquee | 3 SVG-Van-Illustrationen, endlos-Loop | ✓ umgesetzt, [VanMarquee.tsx](../src/components/VanMarquee.tsx) |
| FAQ-Akkordeon | Frage + Pfeil-Icon, aufklappbar mit Antworttext | Grundgerüst vorhanden (nur Fragen, keine Antworten), [App.tsx](../src/App.tsx) |
| Standort-Card | Adresse + Foto/Karte + Pin-Button | nicht umgesetzt |
| Kontakt-/Vorstellungs-Block | Foto + Name/Telefon/E-Mail | nicht umgesetzt |
| Nachhaltigkeits-Sektion | Icon + Bild + Erklärtext | nicht umgesetzt |
| Buchungsformular (mehrstufig) | Fahrzeugtyp-Auswahl, Maße, Datum, Nachricht, Kontaktdaten, Bestätigung | nicht umgesetzt |
| Footer mit Impressum-Link | Copyright + Impressum | nur einfacher Copyright-Footer vorhanden |

## Abgleich mit aktuellem Code

| Bereich | Explorations-Design | Code-Stand | Status |
| --- | --- | --- | --- |
| Grundlayout (Hero, Marquee, "Sicher stehen…", Optionen, FAQ) | ✓ (erweitert) | Basis vorhanden (aus Prototyp-Start) | teilweise, Erweiterung nötig |
| Logo | echtes Icon + Wordmark vorhanden | Platzhalter (`VanIcon.tsx`) | offen |
| Farbpalette | Royal Blue/Arctis White/Lake Blue/Powder Blue | alte Prototyp-Palette | zu klären, dann migrieren |
| Preis-Feature-Liste | 11 Punkte vorhanden | nicht vorhanden | offen |
| Standort-Sektion mit Karte/Foto | ✓ | nicht vorhanden | offen |
| FAQ-Antworttexte | mind. 1 Antwort bekannt (weitere über Notion verfügbar) | nur Fragen, keine Antworten | offen |
| Persönliche Vorstellung / Kontakt | ✓ | nicht vorhanden | offen |
| Nachhaltigkeits-Sektion | ✓ | nicht vorhanden | offen |
| Desktop-Layout | eigener Screen vorhanden | Code ist aktuell nur für Mobile ausgelegt (kein Desktop-spezifisches Layout) | offen |
| Buchungsformular | vollständig spezifiziert (3 Zustände + Bestätigung, Mobile + Desktop) | nicht vorhanden | offen — größter TODO-Block |
| Footer mit Impressum | ✓ | nur Copyright | offen |
| Schriftart Apfel Grotezk | referenziert, Datei fehlt | Space Grotesk + Inter als Ersatz | offen (Lizenz/Datei nötig) |

## Offene Punkte / TODO

- [ ] Farbpalette mit Designer/Auftraggeber final abstimmen (Prototyp- vs. Explorations-Palette), dann `src/index.css`-Tokens migrieren
- [ ] Logo-Assets (Icon + Wordmark) herunterladen und `VanIcon.tsx`-Platzhalter ersetzen
- [ ] Dritten Formular-Zustand (Node `171:8590`) im Detail auslesen — vermutlich Lade- oder Validierungszustand
- [ ] Restliche FAQ-Antworttexte klären (nur "Welche Fahrzeuge…" ist im Design ausformuliert) — mit Notion-Q&A-Einträgen abgleichen
- [ ] Klären, ob ein responsives Desktop-Layout in Code umgesetzt werden soll (aktuell nur Mobile-first ohne Desktop-Anpassungen) oder ob die Desktop-Variante separat/später kommt
- [ ] Buchungsformular als eigene Route/Komponente umsetzen (größter offener Block)
- [ ] Apfel-Grotezk-Lizenz/Dateien beschaffen
- [ ] Klären, wer "Simon Greiner" ist (im Desktop-Kontaktblock genannt, im Mobile-Block fehlt der Name) — vermutlich Betreiber/Ansprechpartner
