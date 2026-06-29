import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  createInvitation,
  getPendingInvitationsByUserId,
  getSentInvitations,
  getInvitationByGameAndUser,
  updateInvitationStatus,
  deleteInvitation,
} from "#db/queries/invitations";

router.use(requireUser);

// Creates an invitation to a game for a specific player. Guards against multiple invitations to the same game.
router.post("/", requireBody(["gameId", "invitedUserId"]), async (req, res) => {
  const { gameId, invitedUserId } = req.body;

  const existing = await getInvitationByGameAndUser(gameId, invitedUserId);
  if (existing) {
    return res
      .status(409)
      .send(`An invitation already exists. Status: ${existing.status}`);
  }

  const invitation = await createInvitation(gameId, req.user.id, invitedUserId);
  res.status(201).json(invitation);
});

// Gets a list of player's pending invitations.
router.get("/pending", async (req, res) => {
  const invitations = await getPendingInvitationsByUserId(req.user.id);
  res.send(invitations);
});

// Gets a list of DM's sent invitations.
router.get("/sent", async (req, res) => {
  const invitations = await getSentInvitations(req.user.id);
  res.send(invitations);
});

// Updates player's invitation status upon accept or decline.
router.put("/:id", requireBody(["status"]), async (req, res) => {
  const invitation = await updateInvitationStatus(
    req.params.id,
    req.body.status,
  );
  if (!invitation) return res.status(404).send("Invitation not found");
  res.send(invitation);
});

// Deletes invitations from the DM's list of sent invitations.
router.delete("/:id", async (req, res) => {
  const invitation = await deleteInvitation(req.params.id);
  if (!invitation) return res.status(404).send("Invitation not found");
  res.send(invitation);
});
