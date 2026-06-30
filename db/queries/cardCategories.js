import db from "#db/client";

const DEFAULT_CARD_CATEGORY = process.env.DEFAULT_DECK;

/** Create a new card category */
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
      ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [cardCategory],
  } = await db.query(sql, [name, cardBackUrl, cardSize, description]);
  return cardCategory;
}

/** @returns CardCategory with the given id */
export async function getCardCategoryById(id) {
  const sql = `
      SELECT *
      FROM card_categories
      WHERE
        id = $1
    `;
  const {
    rows: [cardCategory],
  } = await db.query(sql, [id]);
  return cardCategory;
}

/**
 * Get the default CardCategory
 * @returns Default CardCategory if DEFAULT_DECK env varible is diefined and exists
 * @returns First CardCategory in the table if no default is defined or found
 */
export async function getDefaultCardCategory() {
  console.log(DEFAULT_CARD_CATEGORY);
  if (DEFAULT_CARD_CATEGORY) {
    const sql = `
      SELECT *
      FROM card_categories
      WHERE
        name = $1
    `;
    const {
      rows: [cardCategory],
    } = await db.query(sql, [DEFAULT_CARD_CATEGORY]);
    if (cardCategory) return cardCategory;
  }

  // fallback if no default or default does not exist
  return await getCardCategoryById(1);
}
