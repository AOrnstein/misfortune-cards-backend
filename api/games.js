import express from "express";
const router = express.Router();
export default router;

import { getActiveGamesByUser } from "#db/queries/games";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

// Get all active games for a specific user with game details
router.get("/users/:userId/games/active", async (req, res) => {
  const { userId } = req.params;

  if (isNaN(parseInt(userId, 10))) {
    return res
      .status(400)
      .send({ error: "Invalid User ID format. Must be an integer." });
  }
  const activeGames = await getActiveGamesByUser(userId);
  res.send(activeGames);
});
