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

/** Sends a specific deck by id */
export async function getDeckById(id) {
  const sql = `
    SELECT *
    FROM decks
    WHERE id = $1
    `;
  const { rows: deck } = await db.query(sql);
  return deck;
}
