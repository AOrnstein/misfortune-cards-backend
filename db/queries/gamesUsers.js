import db from "#db/client";

/** Adds a new user within a game?? */
export async function createGameUser({ gameId, userId, isDm }) {
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
