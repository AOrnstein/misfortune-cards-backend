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

/** Get all players in a game */
export async function getPlayersByGameId(gameId) {
  const sql = `
    SELECT gu.user_id AS id, u.username AS name, gu.is_dm
    FROM 
      games_users gu
      JOIN users u ON gu.user_id = u.id
    WHERE gu.game_id = $1
  `;
  const { rows } = await db.query(sql, [gameId]);
  return rows;
}

/** Get a single player's membership in a game */
export async function getGameUser(gameId, userId) {
  const sql = `
    SELECT *
    FROM games_users
    WHERE game_id = $1
      AND user_id = $2
    `;
  const {
    rows: [gameUser],
  } = await db.query(sql, [gameId, userId]);
  return gameUser;
}

/** Delete a player from a game */
export async function deleteGameUser(gameId, userId) {
  const sql = `
    DELETE FROM games_users
    WHERE game_id = $1 
      AND user_id = $2
    RETURNING *  
  `;
  const {
    rows: [gameUser],
  } = await db.query(sql, [gameId, userId]);
  return gameUser;
}
