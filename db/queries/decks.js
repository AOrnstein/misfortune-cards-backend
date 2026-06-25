import db from "#db/client";

/** Sends an array of decks */
export async function getDecks() {
  const sql = `
    SELECT *
    FROM decks
    `;
  const { rows: decks } = await db.query(sql);
  return decks;
}
