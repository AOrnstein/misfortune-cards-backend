import express from "express";
const router = express.Router();
export default router;

import { getCards, getCardById } from "#db/queries/cards";

// Get the card category and an array of all cards
router.get("/", async (req, res) => {
  const cards = await getCards();
  res.send(cards);
});

router.param("id", async (req, res, next, id) => {
  const card = await getCardById(id);
  if (!card) return res.status(404).send("Card not found.");
  req.card = card;
  next();
});

// Get a specific card by ID
router.get("/:id", (req, res) => {
  res.send(req.card);
});
