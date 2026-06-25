import db from "#db/client";

/** Creates a new deck */
export async function createDeck({ gameId, userId, cardId }) {
  const sql = `
    INSERT INTO decks
      (game_id, user_id, card_id)
    VALUES
      ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [deck],
  } = await db.query(sql, [gameId, userId, cardId]);
  return deck;
}

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

/** Sends an array of decks by specific user */
export async function getDecksByUserId(id) {
  const sql = `
    SELECT *
    FROM decks
    WHERE user_id = $1
    `;
  const { rows: decks } = await db.query(sql, [id]);
  return decks;
}
