import db from "#db/client";
import bcrypt from "bcrypt";
/** 
 * Creates a user account.
*/
export async function createUser(username, password) {
  const sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  // Password hashed before storing user in database.
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}
/**
 * Authenticates a user by their username and password.
*/
export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;
/** 
 * Compares the password entered against the password that is hashed. 
*/
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}
/** 
 * Gets a user by their specific ID.
 */
export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
