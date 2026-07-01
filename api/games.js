import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { createGame, deleteGame, getGameById } from "#db/queries/games";
import { createGameUser, deleteGameUser } from "#db/queries/gamesUsers";

router.use(requireUser);

// Create a new game (Logged-in user becomes DM)
router.post("/", requireBody(["name"]), async (req, res) => {
  const game = await createGame({ name: req.body.name, dmId: req.user.id });
  res.status(201).send(game);
});

// Get the game by id for routes below
router.param("id", async (req, res, next, id) => {
  const game = await getGameById(id);
  if (!game) return res.status(404).send("Game not found");
  req.game = game;
  next();
});

// Delete a game (DM only)
router.delete("/:id", async (req, res) => {
  if (req.game.dm_id !== req.user.id) {
    return res.status(403).send("Only the DM can delete this game");
  }
  const deletedGame = await deleteGame(req.game.id);
  res.send(deletedGame);
});

// Remove a player from a game (DM)
// Remove a self from a game (non-DM user)
router.delete("/:id/players/:userId", async (req, res) => {
  const isDm = req.game.dm_id === req.user.id;
  const isSelf = req.params.userId === String(req.user.id);
  if (!isDm && !isSelf) {
    return res
      .status(403)
      .send("Only the DM or the player can remove a player");
  }
  if (isDm && isSelf) {
    return res.status(403).send("DM cannot remove themselves from their game");
  }

  const gameUser = await deleteGameUser(req.game.id, req.params.userId);
  if (!gameUser) return res.status(404).send("Player not found in game");
  res.send(gameUser);
});
