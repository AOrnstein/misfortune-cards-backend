import db from "#db/client";

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

export async function getSentInvitations(userId) {
  const sql = `
    SELECT *
    FROM invitations
    WHERE invited_by = $1
    `;

  const { rows: invitations } = await db.query(sql, [userId]);
  return invitations;
}

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
