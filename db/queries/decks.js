import db from "#db/client";

/** @adds a card to a player's deck */
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
