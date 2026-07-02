import db from "#db/client";
import { createGameUser } from "#db/queries/gamesUsers";

/** Create a new game by the user */
export async function createGame({ name, dmId }) {
  const sql = `
    INSERT INTO games
      (name, dm_id)
    VALUES
      ($1, $2)
    RETURNING *
    `;
  const {
    rows: [game],
  } = await db.query(sql, [name, dmId]);

  // Add the DM to the game
  await createGameUser({ gameId: game.id, userId: dmId, isDm: true });

  return game;
}

/** Get a list of games by user id */
export async function getActiveGamesByUser(userId) {
  const sql = `
    SELECT 
      g.id AS game_id,
      g.name AS game_name,
      g.dm_id,
      g.created_at,
      gu.is_dm
    FROM
      games_users gu
      JOIN games g ON gu.game_id = g.id
      WHERE gu.user_id = $1
      ORDER BY g.created_at DESC;
  `;
  const { rows: activeGames } = await db.query(sql, [userId]);
  return activeGames;
}
