import express from "express";
const router = express.Router();
export default router;

import { getCards, getCardById, getCardsByCategoryId } from "#db/queries/cards";
import { getDefaultCardCategory } from "#db/queries/cardCategories";

// Get the default card category and an array of all cards in the category
router.get("/", async (req, res) => {
  const category = getDefaultCardCategory();
  const cards = await getCardsByCategoryId(category?.id);
  res.send({ category, cards });
});
