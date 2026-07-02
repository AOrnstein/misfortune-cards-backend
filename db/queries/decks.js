import db from "#db/client";

/** Initialize the deck by inserting the entire card list */
export async function initializeGameDeck({ gameId, dmId, cardId }) {
  const sql = `
  INSERT INTO decks
    (game_id, user_id, card_id)
  VALUES 
    ($1, $2, card.id 
    FROM cards WHERE card.id = $3)
  RETURNING *
  `;

  const {
    rows: [deck],
  } = await db.query(sql, [gameId, dmId, cardId]);
  return deck;
}

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
