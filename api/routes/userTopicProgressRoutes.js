const express = require("express");
const {
  createUserTopicProgress,
  getUserTopicProgress,
  updateUserTopicProgressLesson,
  updateUserTopicProgressExplore,
  updateUserTopicProgressActivities,
} = require("../controllers/userTopicProgressController");
const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, topic_id } = req.body;

  try {
    const result = await createUserTopicProgress(user_id, topic_id);

    res.json({ ...result });
  } catch (err) {
    console.log("Error in POST /user-topic-progress:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const { user_id, topic_id } = req.query;

  try {
    const result = await getUserTopicProgress(user_id, topic_id);

    console.log(result);

    res.json({ ...result });
  } catch (err) {
    console.log("Error in GET /user-topic-progress:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/", async (req, res) => {
  const { user_id, topic_id, update_type } = req.body;

  try {
    let result;

    if (update_type == "lesson") {
      console.log("trying to update lesson on user topic progress");
      result = await updateUserTopicProgressLesson(user_id, topic_id);
    } else if (update_type == "explore") {
      result = await updateUserTopicProgressExplore(user_id, topic_id);
    } else if (update_type == "activities") {
      result = await updateUserTopicProgressActivities(user_id, topic_id);
    }

    return res.json({ ...result });
  } catch (err) {
    console.log("Error in UPDATE /user-topic-progress:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
