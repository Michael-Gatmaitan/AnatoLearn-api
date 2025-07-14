const pool = require("../db");
const { getTagByName } = require("./tagsController");

const getUserTagViewsByUserId = async (user_id) => {
  const selectQuery = "SELECT * FROM UserTagViews WHERE user_id = $1";
  const params = [user_id];

  const selectResult = await pool.query(selectQuery, params);

  return selectResult.rows;
};

const getUserTagViewsByUserIdAndTagId = async (user_id, tag_id) => {
  const selectQuery =
    "SELECT * FROM UserTagViews WHERE user_id = $1 AND tag_id = $2";
  const params = [user_id, tag_id];

  const selectResult = await pool.query(selectQuery, params);
  return selectResult.rows[0];
};

const createUserTagView = async (user_id, tagName) => {
  const tag = await getTagByName(tagName);

  if (tag.id) {
    const insertQuery =
      "INSERT INTO UserTagViews (user_id, tag_id) VALUES ($1,$2) ON CONFLICT (user_id, tag_id) DO NOTHING RETURNING *";
    const params = [user_id, tag.id];

    const result = await pool.query(insertQuery, params);
    return result.rows[0];
  }
};

module.exports = {
  // GET
  getUserTagViewsByUserId,
  getUserTagViewsByUserIdAndTagId,
  createUserTagView,
};
