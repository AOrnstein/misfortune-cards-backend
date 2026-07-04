import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { 
    addCardToDeck,
    removeCardFromDeck,
    getDeckByGameAndUser,
    getDecksByGameId
 } from "#db/queries/decks";

router.use(requireUser);

// Gets the deck for the logged-in user for a game. 
router.get("/games/:gameId/deck", async (req, res) => {
    const { gameId } = req.params;
    const userId = req.user.id;

    const deck = await getDeckByGameAndUser(gameId, userId);

    res.send(deck);
});

// Gets all decks for a game.
router.get("/games/:gameId/decks", async (req, res) => {
    const { gameId } = req.params;

    const decks = await getDecksByGameId(gameId);

    res.send(decks);
});

// Adds a card to the logged-in user's deck for a game.
router.post(
    "/games/:gameId/deck/cards", 
    requireBody(["cardId"]),
    async (req, res) => {

    const { gameId } = req.params;
    const { cardId } = req.body;
    const userId = req.user.id;

    const deck = await addCardToDeck(gameId, userId, cardId);

    res.status(201).send(deck);
});

// Removes a card from the logged-in user's deck.
router.delete("/games/:gameId/deck/cards/:cardId", async (req, res) => {
    const { gameId, cardId } = req.params;
    const userId = req.user.id;

    await removeCardFromDeck(gameId, cardId, userId);

    res.status(204).send();
});