import db from "#db/client";

/** Add a player to a game */
export async function createGameUser({ gameId, userId, isDm = false }) {
  const sql = `
    INSERT INTO games_users
      (game_id, user_id, is_dm)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [gameUser],
  } = await db.query(sql, [gameId, userId, isDm]);
  return gameUser;
}

/** Delete a player from a game */
export async function deleteGameUser({ gameId, userId }) {
  const sql = `
    DELETE FROM games_users
    WHERE gameId = $1 
      AND userId = $2
    RETURNING *  
  `;
  const {
    rows: [gameUser],
  } = await db.query(sql, [gameId, userId]);
  return gameUser;
}
