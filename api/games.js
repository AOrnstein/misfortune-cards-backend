import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  createGame,
  getGameByInviteCode,
  getGamesByUserId,
  getGameById,
  regenerateInviteCode,
  deleteGame,
} from "#db/queries/games";
import {
  getGameUser,
  createGameUser,
  getPlayersByGameId,
  deleteGameUser,
} from "#db/queries/gamesUsers";

router.use(requireUser);

// Create a new game (Logged-in user becomes DM)
router.post("/", requireBody(["name"]), async (req, res) => {
  const game = await createGame({ name: req.body.name, dmId: req.user.id });
  res.status(201).send(game);
});

// Join a game via invite code
router.post("/join", requireBody(["inviteCode"]), async (req, res) => {
  const game = await getGameByInviteCode(req.body.inviteCode);
  if (!game) return res.status(404).send({ message: "Invalid invite code" });

  const existing = await getGameUser(game.id, req.user.id);
  if (existing)
    return res.status(409).send({ message: "You are already in this game" });

  const gameUser = await createGameUser({
    gameId: game.id,
    userId: req.user.id,
  });
  res.status(201).send(gameUser);
});

// Get all user games
router.get("/", async (req, res) => {
  const games = await getGamesByUserId(req.user.id);
  res.send(games);
});

// Attach game by id to request for routes below
router.param("id", async (req, res, next, id) => {
  const game = await getGameById(id);
  if (!game) return res.status(404).send({ message: "Game not found" });
  req.game = game;
  next();
});

// Get a specific user game. Includes players, user id and DM status
router.get("/:id", async (req, res) => {
  const players = await getPlayersByGameId(req.game.id);
  const user = players.find((p) => p.id === req.user.id);
  const dm = players.find((p) => p.is_dm);
  res.send({
    ...req.game,
    players,
    dm: dm?.name,
    user_id: req.user.id,
    is_dm: user?.is_dm || false,
  });
});

// Regenerate invite code (DM only)
router.post("/:id/invite-code", async (req, res) => {
  if (req.game.dm_id !== req.user.id) {
    return res
      .status(403)
      .send({ message: "Only the DM can regenerate the invite code" });
  }
  const game = await regenerateInviteCode(req.game.id);
  res.send({ invite_code: game.invite_code });
});

// Delete a game (DM only)
router.delete("/:id", async (req, res) => {
  if (req.game.dm_id !== req.user.id) {
    return res
      .status(403)
      .send({ message: "Only the DM can delete this game" });
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
      .send({ message: "Only the DM or the player can remove a player" });
  }
  if (isDm && isSelf) {
    return res
      .status(403)
      .send({ message: "DM cannot remove themselves from their game" });
  }

  const gameUser = await deleteGameUser(req.game.id, req.params.userId);
  if (!gameUser)
    return res.status(404).send({ message: "Player not found in game" });
  res.send(gameUser);
});
