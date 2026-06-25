import db from "#db/client";

/** Creates a new game */
export async function createGame({ name, dmId, createdAt }) {
  const sql = `
    INSERT INTO games
      (name, dm_id, created_at)
    VALUES
      ($1, $2,)
    RETURNING *
    `;
  const {
    rows: [game],
  } = await db.query(sql, [name, dmId, createdAt]);
  return game;
}

/** Sends all games that are in progress */
