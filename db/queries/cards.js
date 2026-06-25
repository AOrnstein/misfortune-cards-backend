import db from "#db/client";

/** @adds a new card to database */
export async function createCard({ name, category, cardFrontUrl, content }) {
  const sql = `
    INSERT INTO cards
      (name, category, card_front_url, content)
    VALUES
      ($1, $2, $3. $4)
    RETURNING *
    `;
  const {
    rows: [card],
  } = await db.query(sql, [name, category, cardFrontUrl, content]);
  return card;
}
