import db from "#db/client";

/** Adds a new card category to database */
export async function createCardCategory({
  name,
  cardBackUrl,
  cardSize,
  description,
}) {
  const sql = `
    INSERT INTO card_categories
      (name, card_back_url, card_size, description)
    VALUES
      ($1, $2, $3. $4)
    RETURNING *
    `;
  const {
    rows: [cardCategory],
  } = await db.query(sql, [name, cardBackUrl, cardSize, description]);
  return cardCategory;
}
