// Inhalte aus der Notion "FAQ Database" (nur Einträge mit "Sichtbar" = true).
// Statisch übernommen, da die Seite ein reines Frontend ohne Backend ist und
// der Notion-API-Token nicht im Browser offengelegt werden darf.
export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Wann ist die Miete für den Stellplatz fällig?",
    answer:
      "Die Miete ist monatlich im Voraus, jeweils zum 1. eines Monats, zu bezahlen. Die Zahlung erfolgt bequem per Dauerauftrag.",
  },
  {
    question: "Kann ich den Stellplatz vorab besichtigen?",
    answer:
      "Ja. Eine Besichtigung ist nach vorheriger Terminvereinbarung möglich. Senden Sie uns dazu einfach eine Anfrage über das Kontaktformular. Wir melden uns anschließend persönlich bei Ihnen zurück.",
  },
  {
    question: "Gibt es eine Kaution?",
    answer: "Nein. Für die Anmietung wird keine Kaution verlangt.",
  },
  {
    question: "Gibt es eine Mindestmietdauer?",
    answer:
      "Ja. Der Mietvertrag wird jeweils für 12 Monate abgeschlossen. Er verlängert sich automatisch um weitere 12 Monate, sofern er nicht spätestens drei Monate vor Ende der jeweiligen Vertragslaufzeit gekündigt wird.",
  },
  {
    question: "Ist Strom am Stellplatz verfügbar und im Mietpreis enthalten?",
    answer:
      "Ja. Für jeden Stellplatz steht an einem Stromverteiler eine Steckdose zur Verfügung. Je nach Lage des Stellplatzes muss das Stromkabel bis zum Stromverteiler geführt werden. 10 kWh Strom pro Monat sind bereits im Mietpreis enthalten.\nDer Strom ist ausschließlich für kleinere Anwendungen wie die Ladungserhaltung der Fahrzeugbatterie oder das Aussaugen des Fahrzeugs vorgesehen. Das Laden von Elektrofahrzeugen, Powerstations oder anderen größeren Stromspeichern ist nicht gestattet.",
  },
  {
    question: "Darf auf dem Gelände übernachtet oder gecampt werden?",
    answer:
      "Nein. Es handelt sich ausschließlich um einen Abstellplatz und nicht um einen Campingplatz oder touristischen Wohnmobilstellplatz. Übernachten, Wohnen und Campen auf dem Gelände sind daher nicht gestattet.",
  },
];
