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

export async function getCards() {
  const sql = `
    SELECT * 
    FROM cards`;

  const { rows: cards } = await db.query(sql);
    return cards;
}

export async function getCardById(id) {
  const sql = `
    SELECT *
    FROM cards
    WHERE id = $1`;

  const { rows: [card], } = await db.query(sql, [id]);
    return card;
}