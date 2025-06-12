const pool = require("../db");
const getTotalScores = async (user_id, topic_id) => {
  const q = "SELECT * FROM total_scores WHERE user_id=$1 AND topic_id=$2";
  const params = [user_id, topic_id];

  const totalScores = (await pool.query(q, params)).rows;

  return totalScores;
};

module.exports = { getTotalScores };
