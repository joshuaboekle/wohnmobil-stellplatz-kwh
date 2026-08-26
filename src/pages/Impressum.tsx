import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// TODO: Platzhalter durch echte Angaben ersetzen. Pflichtangaben nach § 5 TMG
// (Diensteanbieter-Kennzeichnung) und § 18 Abs. 2 MStV (Verantwortlicher für
// journalistisch-redaktionelle Inhalte, hier i. d. R. nicht einschlägig,
// sofern keine redaktionellen Inhalte angeboten werden):
// - Vollständiger Name (bei Gewerbe: Firma inkl. Rechtsform) des Anbieters
// - Ladungsfähige Anschrift (kein Postfach)
// - Kontakt: Telefonnummer und E-Mail-Adresse
// - Bei Kleingewerbe/Gewerbe: ggf. Handelsregistereintrag, Registergericht,
//   Registernummer, USt-IdNr. (falls vorhanden)
// - Bei Vermietung als Nebentätigkeit ohne Gewerbe: Name und Anschrift genügen,
//   ggf. rechtliche Beratung einholen, ob eine gewerbliche Anmeldung nötig ist
export default function Impressum() {
  return (
    <div className="flex min-h-screen flex-col bg-royal-blue">
      <NavBar />
      <main className="mx-auto w-full max-w-md flex-1 px-3 py-16 sm:px-10">
        <h1 className="mb-8 font-display text-h1 text-arctis-white">Impressum</h1>

        <div className="flex flex-col gap-6 font-display text-body-lg text-arctis-white">
          <section>
            <h2 className="mb-1 font-display text-h3">Angaben gemäß § 5 TMG</h2>
            <p>
              [Name / Firma folgt]
              <br />
              [Straße Hausnummer folgt]
              <br />
              [PLZ Ort folgt]
            </p>
          </section>

          <section>
            <h2 className="mb-1 font-display text-h3">Kontakt</h2>
            <p>
              Telefon: [Telefonnummer folgt]
              <br />
              E-Mail: [E-Mail-Adresse folgt]
            </p>
          </section>

          <section>
            <h2 className="mb-1 font-display text-h3">Umsatzsteuer-ID</h2>
            <p>[Falls vorhanden: USt-IdNr. gemäß § 27a UStG folgt]</p>
          </section>

          <section>
            <h2 className="mb-1 font-display text-h3">Haftungsausschluss</h2>
            <p className="text-caption opacity-80">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
              Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
              deren Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
