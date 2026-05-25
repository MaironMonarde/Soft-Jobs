const pool = require("../config/db");

const createUser = async ({ email, password, rol, lenguage }) => {
  const query = {
    text: `
      INSERT INTO usuarios (email, password, rol, lenguage)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, rol, lenguage
    `,
    values: [email, password, rol, lenguage]
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const findUserByEmail = async (email, includePassword = false) => {
  const fields = includePassword
    ? "id, email, password, rol, lenguage"
    : "id, email, rol, lenguage";

  const query = {
    text: `SELECT ${fields} FROM usuarios WHERE email = $1`,
    values: [email]
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail
};
