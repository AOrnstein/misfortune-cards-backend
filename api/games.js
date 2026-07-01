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

// Delete a game (DM only)
router.delete("/:id", async (req, res) => {
  const game = await getGameById(req.params.id);
  if (!game) return res.status(404).send("Game not found");
  if (game.dm_id !== req.user.id) {
    return res.status(403).send("Only the DM can delete this game");
  }
  await deleteGame(req.params.id);
  res.send(game);
});

// Remove a player from a game (DM or the player themselves)
router.delete("/:id/players/:userId", async (req, res) => {
  const game = await getGameById(req.params.id);
  if (!game) return res.status(404).send("Game not found");

  const isDm = game.dm_id === req.user.id;
  const isSelf = req.params.userId === String(req.user.id);
  if (!isDm && !isSelf) {
    return res
      .status(403)
      .send("Only the DM or the player can remove a player");
  }

  const gameUser = await deleteGameUser(req.params.id, req.params.userId);
  if (!gameUser) return res.status(404).send("Player not found in game");
  res.send(gameUser);
});
