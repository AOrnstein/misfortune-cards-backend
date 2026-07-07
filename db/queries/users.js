import db from "#db/client";
import bcrypt from "bcrypt";
/**
 * Creates a user.
 * Stores the username and hashed password in the database.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns The created user object.
 */
export async function createUser(username, password) {
  const sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}
/**
 * Retrieves a user by their username and password.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns The user or null if not found or if password is incorrect.
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

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

/**
 * Retrieves a user by their ID.
 * 
 * @param {number} id 
 * @returns The user if the id is correct.
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
