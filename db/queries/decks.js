import db from "#db/client";

// Adds a card to a player's deck //
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
/**
 * Gets all decks from the database.
 * @returns An array of deck objects.
 */
export async function getDecks() {
  const sql = `
    SELECT *
    FROM decks`;

  const { rows: decks } = await db.query(sql);
  return decks; 
}
/**
 * Gets a deck by its ID.
 * @param {number} id - The ID of the deck to retrieve.
 * @returns The deck with the matching ID.
 */
export async function getDeckById(id) {
  const sql = `
    SELECT *
    FROM decks
    WHERE id = $1`;

  const { rows: [deck], } = await db.query(sql, [id]);
  return deck
}
/**
 * Gets all decks associated with a specific game ID.
 * @param {number} gameId - ID of the game.
 * @returns An array of deck objects associated with the game ID.
 */
export async function getDecksByGameId(gameId) {
  const sql = `
    SELECT *
    FROM decks
    WHERE game_id = $1`; 

  const { rows: decks } = await db.query(sql, [gameId]);
  return decks;
}