const pool = require("../db");

const createUserTopicProgress = async (user_id, topic_id) => {
  const insertQuery = `INSERT INTO UserTopicProgress (user_id, topic_id)
  VALUES ($1, $2) ON CONFLICT (user_id, topic_id)
  DO NOTHING RETURNING *`;

  const params = [user_id, topic_id];

  const insertResult = await pool.query(insertQuery, params);

  if (insertResult.rows.length > 0) {
    return insertResult.rows[0];
  } else {
    const selectQuery =
      "SELECT * FROM UserTopicProgress WHERE user_id=$1 AND topic_id=$2";
    const selectResult = await pool.query(selectQuery, params);
    return selectResult.rows[0];
  }
};

const getUserTopicProgress = async (user_id, topic_id) => {
  const query =
    "SELECT * FROM UserTopicProgress WHERE user_id=$1 AND topic_id=$2";
  const params = [user_id, topic_id];

  const result = await pool.query(query, params);
  return result.rows[0];
};

const updateUserTopicProgressLesson = async (user_id, topic_id) => {
  const updateQuery =
    "UPDATE UserTopicProgress SET lesson_completed = TRUE WHERE user_id=$1 AND topic_id=$2 RETURNING *";
  const params = [user_id, topic_id];

  const result = await pool.query(updateQuery, params);
  return result.rows[0];
};

const updateUserTopicProgressExplore = async (user_id, topic_id) => {
  const updateQuery =
    "UPDATE UserTopicProgress SET explore_completed = TRUE WHERE user_id=$1 AND topic_id=$2 RETURNING *";
  const params = [user_id, topic_id];

  const result = await pool.query(updateQuery, params);
  return result.rows[0];
};

const updateUserTopicProgressActivities = async (user_id, topic_id) => {
  const updateQuery =
    "UPDATE UserTopicProgress SET activities_completed = TRUE WHERE user_id=$1 AND topic_id=$2 RETURNING *";
  const params = [user_id, topic_id];

  const result = await pool.query(updateQuery, params);
  return result.rows[0];
};

module.exports = {
  // POST AND GET
  createUserTopicProgress,
  getUserTopicProgress,

  // UPDATE
  updateUserTopicProgressLesson,
  updateUserTopicProgressExplore,
  updateUserTopicProgressActivities,
};
