import db from "#db/client";

/** Create an invitation to share with another player (DM only) */
export async function createInvitation(gameId, invitingUserId, invitedUserId) {
  const sql = `
      INSERT INTO invitations
        (game_id, invited_by, invited_user)
      VALUES
        ($1, $2, $3)
      RETURNING *
      `;

  const {
    rows: [invitation],
  } = await db.query(sql, [gameId, invitingUserId, invitedUserId]);
  return invitation;
}

/** Get all pending invitations received by a player (player only) */
export async function getPendingInvitationsByUserId(userId) {
  const sql = `
      SELECT *
      FROM invitations 
      WHERE invited_user = $1
        AND status = 'pending'
      `;

  const { rows: invitations } = await db.query(sql, [userId]);
  return invitations;
}

/** Get all invitations sent to other players (DM only) */
export async function getSentInvitations(userId) {
  const sql = `
    SELECT *
    FROM invitations
    WHERE invited_by = $1
    `;

  const { rows: invitations } = await db.query(sql, [userId]);
  return invitations;
}

/** Get an invitation to a specific player for a specific game */
export async function getInvitationByGameAndUser(gameId, invitedUserId) {
  const sql = `
      SELECT *
      FROM invitations 
      WHERE game_id = $1 
        AND invited_user = $2
      `;

  const {
    rows: [invitation],
  } = await db.query(sql, [gameId, invitedUserId]);
  return invitation;
}

/** Update a player's invitation status (player only) */
export async function updateInvitationStatus(invitationId, status) {
  const sql = `
    UPDATE invitations
    SET status = $2
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [invitation],
  } = await db.query(sql, [invitationId, status]);
  return invitation;
}

/** Delete a specific invitation */
export async function deleteInvitation(invitationId) {
  const sql = `
    DELETE FROM invitations
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [invitation],
  } = await db.query(sql, [invitationId]);
  return invitation;
}
