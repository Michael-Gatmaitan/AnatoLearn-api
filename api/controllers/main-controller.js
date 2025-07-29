const pool = require("../db");

const getActivityScoresByTotalScoreId = async (total_scores_id) => {
  console.log(total_scores_id);
  const q = "SELECT * FROM activity_scores WHERE total_scores_id=$1";
  const p = [total_scores_id];

  const activityScores = (await pool.query(q, p)).rows;
  // console.log("Activity scores: ", activityScores);

  return activityScores;
};

const getTagByName = async (name) => {
  const tag = await pool.query("SELECT * FROM Tags WHERE name = $1", [name]);

  return tag.rows[0];
};

const getTotalScores = async (user_id, topic_id) => {
  const q = "SELECT * FROM total_scores WHERE user_id=$1 AND topic_id=$2";
  const params = [user_id, topic_id];

  const totalScores = (await pool.query(q, params)).rows;

  return totalScores;
};

const getPassedScores = async (user_id, topic_id) => {
  const getQuery = `SELECT * FROM total_scores
    WHERE accuracy > 50 AND user_id=$1
    AND topic_id=$2 ORDER BY total_score LIMIT 1`;
  const params = [user_id, topic_id];

  console.log("Getting all passed scores");

  const result = await pool.query(getQuery, params);

  return result.rows;
};

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
  getActivityScoresByTotalScoreId,
  getTagByName,
  getTotalScores,
  getPassedScores,
  getUserTagViewsByUserId,
  getUserTagViewsByUserIdAndTagId,
  createUserTagView,

  // POST AND GET
  createUserTopicProgress,
  getUserTopicProgress,

  // UPDATE
  updateUserTopicProgressLesson,
  updateUserTopicProgressExplore,
  updateUserTopicProgressActivities,
};
