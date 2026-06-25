import express from "express";
const router = express.Router();
export default router;

import { getCards } from "#db/queries/cards";

router.get("/", async (req, res) => {
  const cards = await getCards();
  res.send(cards);
});
