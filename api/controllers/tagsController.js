const pool = require("../db");

const getTagByName = async (name) => {
  const tag = await pool.query("SELECT * FROM Tags WHERE name = $1", [name]);

  return tag.rows[0];
};

module.exports = {
  getTagByName,
};
