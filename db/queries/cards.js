import db from "#db/client";

/** Add a new card for the category */
export async function createCard({ name, categoryId, cardFrontUrl, content }) {
  const sql = `
    INSERT INTO cards
      (name, category_id, card_front_url, content)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [card],
  } = await db.query(sql, [name, categoryId, cardFrontUrl, content]);
  return card;
}
