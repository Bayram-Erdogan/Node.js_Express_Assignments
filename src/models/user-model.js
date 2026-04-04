import db from '../utils/database.js';

export const listAllUsers = async () => {
  const [rows] = await db.query(
    'SELECT user_id, name, username, email, role FROM wsk_users'
  );
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await db.execute(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows[0] || null;
};

export const findCatsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT c.cat_id, c.cat_name, c.weight, c.owner, u.name AS owner_name,
           c.filename, c.birthdate
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
    WHERE c.owner = ?
  `,
    [userId]
  );
  return rows;
};

export const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const [result] = await db.execute(
    'INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)',
    [name, username, email, role, password]
  );
  return {user_id: result.insertId};
};

export const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    `SELECT *
     FROM wsk_users
     WHERE username = ?`,
    [username]
  );
  return rows[0] || null;
};

export const modifyUser = async (user, id, currentUser) => {
  const keys = Object.keys(user);
  const values = Object.values(user);

  if (keys.length === 0) return false;

  const setString = keys.map((key) => `${key} = ?`).join(', ');
  const isAdmin = currentUser?.role === 'admin';
  const sql = isAdmin
    ? `UPDATE wsk_users SET ${setString} WHERE user_id = ?`
    : `UPDATE wsk_users SET ${setString} WHERE user_id = ? AND user_id = ?`;
  const params = isAdmin
    ? [...values, id]
    : [...values, id, currentUser?.user_id];

  const [result] = await db.execute(sql, params);
  return result.affectedRows > 0;
};

export const removeUserWithCats = async (id, currentUser) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const isAdmin = currentUser?.role === 'admin';

    if (isAdmin) {
      await conn.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    } else {
      await conn.execute('DELETE FROM wsk_cats WHERE owner = ? AND owner = ?', [
        id,
        currentUser?.user_id,
      ]);
    }

    const [result] = isAdmin
      ? await conn.execute('DELETE FROM wsk_users WHERE user_id = ?', [id])
      : await conn.execute(
          'DELETE FROM wsk_users WHERE user_id = ? AND user_id = ?',
          [id, currentUser?.user_id]
        );

    if (result.affectedRows === 0) {
      await conn.rollback();
      return false;
    }

    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
