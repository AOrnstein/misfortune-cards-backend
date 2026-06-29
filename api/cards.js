import express from "express";
const router = express.Router();
export default router;

import { getCards, getCardById } from "#db/queries/cards";

// Get an array of all cards

router.get("/", async (req, res) => {
  const cards = await getCards();
  res.send(cards);
});

// Get a specific card by ID

router.param("id", async (req, res, next, id) => {
  const card = await getCardById(id);
  if (!card) return res.status(404).send("Card not found.");
  req.card = card;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.card);
});
