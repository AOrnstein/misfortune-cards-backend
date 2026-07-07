import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { 
    addCardToDeck,
    removeCardFromDeck,
    getDeckByGameId
 } from "#db/queries/decks";

router.use(requireUser);

// Gets all decks for a game.
router.get("/games/:gameId/deck", async (req, res) => {
    const { gameId } = req.params;

    const deck = await getDeckByGameId(gameId);

    res.send(deck);
});

// Adds a card to the logged-in user's deck for a game.
router.post(
    "/games/:gameId/deck/cards", 
    requireBody(["cardId"]),
    async (req, res) => {

    const { gameId } = req.params;
    const { cardId } = req.body;

    const deck = await addCardToDeck({ gameId, cardId });

    res.status(201).send(deck);
});

// Removes a card from the logged-in user's deck.
router.delete("/games/:gameId/deck/cards/:cardId", async (req, res) => {
    const { gameId, cardId } = req.params;

    await removeCardFromDeck({ gameId, cardId });

    res.status(204).send();
});