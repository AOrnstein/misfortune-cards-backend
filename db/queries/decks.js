import db from "#db/client";

/** Add card to the player's deck for the game */
export async function addCardToDeck({ gameId, userId, cardId }) {
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

/** Gets deck by the game that the specific user is in */
export async function getDeckByGameAndUser(gameId, userId) {
  const sql = `
    SELECT *
    FROM decks
    WHERE game_id = $1 AND user_id = $2
  `;
  const {
    rows: [deck],
  } = await db.query(sql, [gameId, userId]);
  return deck;
}
/** Gets all decks for a specific game */
export async function getDecksByGameId(gameId) {
  const sql = `
    SELECT *
    FROM decks
    WHERE game_id = $1
  `;
  const { rows: decks } = await db.query(sql, [gameId]);
  return decks;
}
/** Removes a card from the player's deck */
export async function removeCardFromDeck({ gameId, cardId, userId }) {
  const sql = `
    DELETE FROM decks
    WHERE game_id = $1 AND card_id = $2 AND user_id = $3
  `;
  await db.query(sql, [gameId, cardId, userId]);
}
