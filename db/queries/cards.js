import db from "#db.client";

/** Sends array of all cards */
export async function getCards() {
  const sql = `
    SELECT *
    FROM cards
    `;
  const { rows: cards } = await db.query(sql);
  return cards;
}

/** Sends specific card by id */
export async function getCardById(id) {
  const sql = `
    SELECT *
    FROM cards
    WHERE id = $1
    `;
  const {
    rows: [card],
  } = await db.query(sql, [id]);
  return card;
}
