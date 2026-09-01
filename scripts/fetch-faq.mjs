// Holt die FAQ-Inhalte zur Build-Zeit aus Notion und schreibt sie nach
// src/data/faq.ts. Läuft automatisch vor "npm run build" (siehe
// package.json "prebuild"), kann aber auch manuell mit
// "npm run fetch:faq" ausgeführt werden.
//
// Voraussetzungen:
// - Eine interne Notion-Integration (https://www.notion.so/my-integrations)
//   mit Leserechten auf die "FAQ Database" (in Notion: "..." > "Verbindungen"
//   > die Integration hinzufügen).
// - Der Integration-Token als Umgebungsvariable NOTION_TOKEN (z. B. in einer
//   lokalen .env-Datei oder als Vercel-Projekt-Umgebungsvariable).
//
// Ohne NOTION_TOKEN wird die vorhandene src/data/faq.ts unverändert
// gelassen, damit lokale Builds ohne Notion-Zugriff weiterhin funktionieren.
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "../src/data/faq.ts");

// Node lädt .env-Dateien nicht automatisch (anders als Vite für den
// Client-Build). Für lokale Läufe hier minimal selbst einlesen, ohne
// vorhandene process.env-Werte (z. B. von Vercel) zu überschreiben.
async function loadDotEnv() {
  try {
    const content = await readFile(path.join(__dirname, "../.env"), "utf-8");
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (!match) continue;
      const [, key, rawValue = ""] = match;
      if (process.env[key] === undefined) {
        process.env[key] = rawValue.replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // Keine .env vorhanden – z. B. auf Vercel, wo Variablen direkt gesetzt sind.
  }
}

await loadDotEnv();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_FAQ_DATABASE_ID =
  process.env.NOTION_FAQ_DATABASE_ID ?? "3b980786-8e98-8059-b770-c7a762db3aee";
const NOTION_VERSION = "2022-06-28";

if (!NOTION_TOKEN) {
  console.warn(
    "[fetch-faq] NOTION_TOKEN nicht gesetzt – überspringe Notion-Abruf, src/data/faq.ts bleibt unverändert.",
  );
  process.exit(0);
}

function richTextToMarkdown(richText) {
  return richText
    .map((run) => {
      let text = run.plain_text;
      if (run.annotations?.bold) {
        text = `**${text}**`;
      }
      if (run.href) {
        text = `[${text}](${run.href})`;
      }
      return text;
    })
    .join("");
}

async function queryFaqDatabase() {
  const results = [];
  let cursor;

  do {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_FAQ_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { property: "Sichtbar", checkbox: { equals: true } },
          sorts: [{ property: "Reihenfolge", direction: "ascending" }],
          start_cursor: cursor,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `[fetch-faq] Notion-API-Fehler ${response.status}: ${await response.text()}`,
      );
    }

    const data = await response.json();
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return results;
}

function pageToFaqItem(page) {
  // Die Frage wird als Button-Label ohne Markdown-Rendering ausgegeben,
  // daher hier nur der reine Text (keine **Fett**-Auszeichnung).
  const question = page.properties.Frage.title.map((run) => run.plain_text).join("").trim();
  const answer = richTextToMarkdown(page.properties.Antwort.rich_text).trim();
  return { question, answer };
}

function escapeForTs(text) {
  return text.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function renderFaqFile(items) {
  const entries = items
    .map(
      (item) => `  {
    question: \`${escapeForTs(item.question)}\`,
    answer: \`${escapeForTs(item.answer)}\`,
  },`,
    )
    .join("\n");

  return `// Automatisch generiert aus der Notion "FAQ Database" (nur Einträge mit
// "Sichtbar" = true, sortiert nach "Reihenfolge"). NICHT manuell bearbeiten –
// Änderungen bitte in Notion vornehmen und "npm run fetch:faq" bzw. den
// nächsten Build abwarten. Siehe scripts/fetch-faq.mjs.
export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
${entries}
];
`;
}

const pages = await queryFaqDatabase();

if (pages.length === 0) {
  console.warn(
    "[fetch-faq] Notion-Abfrage lieferte keine sichtbaren FAQ-Einträge – src/data/faq.ts bleibt unverändert.",
  );
  process.exit(0);
}

const items = pages.map(pageToFaqItem);
await writeFile(OUTPUT_PATH, renderFaqFile(items), "utf-8");
console.log(`[fetch-faq] ${items.length} FAQ-Einträge aus Notion nach src/data/faq.ts geschrieben.`);
