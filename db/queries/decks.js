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
    rows: [decks],
  } = await db.query(sql, [gameId, cardId]);
  return decks;
}

/** Gets all decks for a specific game */
export async function getDeckByGameId(gameId) {
  const sql = `
    SELECT *
    FROM decks
    WHERE game_id = $1
  `;

  const { rows: [decks] } = await db.query(sql, [gameId]);
  return decks;
}

/** Removes a card from the player's deck */
export async function removeCardFromDeck({ gameId, cardId }) {
  const sql = `
    DELETE FROM decks
    WHERE game_id = $1 AND card_id = $2
  `;

  await db.query(sql, [gameId, cardId]);
}
