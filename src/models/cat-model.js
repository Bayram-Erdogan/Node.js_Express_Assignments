import db from '../utils/database.js';

export const listAllCats = async () => {
  const [rows] = await db.query(`
    SELECT c.cat_id, c.cat_name, c.weight, c.owner, u.name AS owner_name,
           c.filename, c.birthdate
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
  `);
  return rows;
};

export const findCatById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT c.cat_id, c.cat_name, c.weight, c.owner, u.name AS owner_name,
           c.filename, c.birthdate
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
    WHERE c.cat_id = ?
  `,
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

export const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const [result] = await db.execute(
    `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
     VALUES (?, ?, ?, ?, ?)`,
    [cat_name, weight, owner, filename, birthdate]
  );
  return {cat_id: result.insertId};
};

export const modifyCat = async (cat, id) => {
  const keys = Object.keys(cat);
  const values = Object.values(cat);

  if (keys.length === 0) return false;

  const setString = keys.map((key) => `${key} = ?`).join(', ');
  const sql = `UPDATE wsk_cats SET ${setString} WHERE cat_id = ?`;

  const [result] = await db.execute(sql, [...values, id]);

  return result.affectedRows > 0;
};

export const removeCat = async (id) => {
  const [result] = await db.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [
    id,
  ]);
  return result.affectedRows > 0;
};
