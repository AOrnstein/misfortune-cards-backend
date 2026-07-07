import db from "#db/client";

/** Add card to the player's deck for the game */
export async function addCardToDeck({ gameId, cardId }) {
  const sql = `
    INSERT INTO decks
      (game_id, card_id)
    VALUES
      ($1, $2)
    RETURNING *
    `;

  const {
    rows: [card],
  } = await db.query(sql, [gameId, cardId]);
  return card;
}

/** Get deck for a specific game */
export async function getDeckByGameId(gameId) {
  const sql = `
    SELECT *
    FROM decks
    WHERE game_id = $1
  `;

  const { rows: deck } = await db.query(sql, [gameId]);
  return deck;
}

/** Remove a card from the player's deck */
export async function removeCardFromDeck({ gameId, cardId }) {
  const sql = `
    DELETE FROM decks
    WHERE game_id = $1 AND card_id = $2
    RETURNING *
  `;

  const {
    rows: [card],
  } = await db.query(sql, [gameId, cardId]);
  return card;
}
