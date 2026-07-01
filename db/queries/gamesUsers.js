import db from "#db/client";

/** Add a user to a game */
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

/** Get a list of games by user id */
export async function getActiveGamesByUser(userId) {
  const sql = `
    SELECT *
    FROM games_users
    WHERE user_id = $1
    `;
  const { rows: activeGames } = await db.query(sql, [userId]);
  return activeGames;
}
