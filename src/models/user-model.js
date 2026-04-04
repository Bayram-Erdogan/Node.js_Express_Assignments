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

export const modifyUser = async (user, id) => {
  const [result] = await db.execute(
    'UPDATE wsk_users SET ? WHERE user_id = ?',
    [user, id]
  );
  return result.affectedRows > 0;
};

export const removeUserWithCats = async (id) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    const [result] = await conn.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
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
