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

/** Get a game by id */
export async function getGameById(gameId) {
  const sql = `
    SELECT *
    FROM games
    WHERE id = $1
  `;
  const {
    rows: [game],
  } = await db.query(sql, [gameId]);
  return game;
}

/** Get a game by invite code */
export async function getGameByInviteCode(inviteCode) {
  const sql = `
    SELECT *
    FROM games
    WHERE invite_code = $1
  `;
  const {
    rows: [game],
  } = await db.query(sql, [inviteCode]);
  return game;
}

/**
 * Regenerate a random invite code for a specific game
 * @returns game with the new invite code
 */
export async function regenerateInviteCode(gameId) {
  const sql = `
    UPDATE games
    SET invite_code = get_random_uuid()
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [game],
  } = await db.query(sql, [gameId]);
  return game;
}

/** Delete a DM's existing game */
export async function deleteGame(gameId) {
  const sql = `
    DELETE FROM games
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [game],
  } = await db.query(sql, [gameId]);
  return game;
}
