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
    SELECT *
    FROM games_users
    WHERE user_id = $1
    `;
  const { rows: activeGames } = await db.query(sql, [userId]);
  return activeGames;
}
