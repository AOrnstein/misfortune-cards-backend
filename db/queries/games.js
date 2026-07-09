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

/** Get all games by user id */
export async function getGamesByUserId(userId) {
  const sql = `
    SELECT 
      g.id,
      g.name,
      g.dm_id,
      g.created_at,
      gu.is_dm
    FROM
      games_users gu
      JOIN games g ON gu.game_id = g.id
    WHERE gu.user_id = $1
    ORDER BY g.created_at DESC;
  `;
  const { rows: games } = await db.query(sql, [userId]);
  return games;
}

/** Get game details by id. */
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

/** Update game state */

export async function updateGameState(
  gameId,
  currentCardId,
  isRevealed,
  currentCardFacing,
) {
  const sql = `
  UPDATE games
  SET
    current_card_id = $1,
    is_revealed = $2,
    current_card_facing = $3, 
    state_updated = NOW()
  WHERE id = $4
  RETURNING *
  `;

  const {
    rows: [game],
  } = await db.query(sql, [
    currentCardId,
    isRevealed,
    currentCardFacing,
    gameId,
  ]);
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
    SET invite_code = gen_random_uuid()
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
