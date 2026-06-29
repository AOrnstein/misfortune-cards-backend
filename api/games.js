import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import { createGame, deleteGame } from "#db/queries/games";
import { createGameUser, deleteGameUser } from "#db/queries/gamesUsers";

router.use(requireUser);

// Creates a new game and assigns creator as DM.
router.post("/", requireBody(["name"]), async (req, res) => {
  const { name } = req.body;

  const game = await createGame(name, req.user.id);
  res.status(201).send(game);
});
