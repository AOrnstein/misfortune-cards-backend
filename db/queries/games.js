import db from "#db/client";

/** Create a new game by the user */
export async function createGame({ name, dmId }) {
  const sql = `
    INSERT INTO games
      (name, dm_id)
    VALUES
      ($1, $2,)
    RETURNING *
    `;
  const {
    rows: [game],
  } = await db.query(sql, [name, dmId]);
  return game;
}
