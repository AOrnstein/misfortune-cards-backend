import db from "#db/client";
import bcrypt from "bcrypt";
/*Hash password
save user to the database
return the user */
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
/*Find user by username if no user found return null
Compare the password entered with hashed password */
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
/*Find user with matching id */
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
