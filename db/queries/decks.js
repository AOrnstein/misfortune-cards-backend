import db from "#db/client";

/** Fetch all cards to form game deck */
export async function getDeck({ gameId, userId }) {
  const sql = `
  SELECT 
    c.id AS card_id, 
    c.name, c.category_id, c.card_front_url, c.content, 
    d.id AS deck_entry_id 
  FROM 
    decks d INNER JOIN cards c ON d.card_id = c.id 
  WHERE 
    d.game_id = $1 AND d.user_id = $2
  `;

  const { rows = [deck] } = await db.query(sql, [gameId, userId]);
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
