import db from "#db/client";
import domtData from "#data/deck-of-many-things" with { type: "json" };
import { createUser } from "#db/queries/users";
import { createCardCategory } from "#db/queries/cardCategories";
import { createCard } from "#db/queries/cards";
import { createGame } from "#db/queries/games";
import { createGameUser } from "#db/queries/gamesUsers";
import { addCardToDeck } from "#db/queries/decks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

/** Seed the DB */
async function seed() {
  const userDm = await createUser("foo", "bar");
  const userPlayer = await createUser("bar", "foo");

  // seed with Deck of Many Things
  const [cardCategory, cards] = await initDbWithDeckOfManyThings();

  const game = await createGame({
    name: "Sample Game",
    dmId: userDm.id,
  });

  await createGameUser({
    gameId: game.id,
    userId: userPlayer.id,
  });

  for (const card of cards) {
    await addCardToDeck({
      gameId: game.id,
      userId: userPlayer.id,
      cardId: card.id,
    });
  }
}

/**
 * initialize the DB with the Deck of Many Things
 * @returns [cardCategory, cards[]]
 */
async function initDbWithDeckOfManyThings() {
  const category = await createCardCategory({
    name: domtData.name,
    description: domtData.description,
    cardSize: JSON.stringify(domtData.card_size),
    cardBackUrl: domtData.card_back_url,
  });

  const cards = [];
  for (const card of domtData.cards) {
    cards.push(
      await createCard({
        name: card.name,
        categoryId: category.id,
        description: card.description,
        cardFrontUrl: card.image_url,
        content: {
          upright: card.upright,
          reversed: card.reversed,
        },
      }),
    );
  }
  return [category, cards];
}
