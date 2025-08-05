const express = require("express");
const {
  getUserTagViewsByUserId,
  createUserTagView,
  getUserTagViewsByUserIdAndTagId,
} = require("../controllers/main-controller");
const { getTagByName } = require("../controllers/main-controller");
const pool = require("../db");
const router = express.Router();

// This checks if the specific body part is viewed or not
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  const tag_name = req.query.tag_name;

  try {
    if (tag_name) {
      const tag = await getTagByName(tag_name);
      if (tag.id) {
        const result = await getUserTagViewsByUserIdAndTagId(user_id, tag.id);

        if (!result) {
          return res.json({ is_viewed: false });
        }

        return res.json(result);
      } else {
        return res.json({
          error: `Tag with the name of ${tag_name} cannot be found.`,
        });
      }
    } else {
      const result = await getUserTagViewsByUserId(user_id);
      return res.json({ data: result });
    }
  } catch (err) {
    return res.json({ message: "Error in GET user tag views: " + err });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const { user_id, tag_name } = body;

  try {
    const result = await createUserTagView(user_id, tag_name);

    return res.json(result);
  } catch (err) {
    return res.json({ error: "Error in creating user tag views" });
  }
});

router.get("/check-validity", async (req, res) => {
  const user_id = req.query.user_id;
  const topic_id = req.query.topic_id;

  try {
    const q = `
WITH TagsForTopic AS (
    -- Select all tag IDs for a specific topic_id
    SELECT
        id AS tag_id
    FROM
        Tags
    WHERE
        topic_id = $1 -- Replace X with the desired topic_id (e.g., 1, 2, etc.)
),
CountOfTags AS (
    -- Count the total number of tags for the specified topic_id
    SELECT
        COUNT(tag_id) AS total_tags_count
    FROM
        TagsForTopic
),
CountOfUserTagViews AS (
    -- Count the total number of usertagviews entries
    -- for the tags belonging to the specified topic_id
    SELECT
        COUNT(utv.id) AS total_usertagviews_count
    FROM
        usertagviews utv
    JOIN
        TagsForTopic tft ON utv.tag_id = tft.tag_id
    WHERE user_id = $2
  )
-- Compare the two counts and display the result
SELECT
    CASE
        WHEN (SELECT total_tags_count FROM CountOfTags) = (SELECT total_usertagviews_count FROM CountOfUserTagViews)
        -- THEN 'Counts Match: The number of tags for this topic_id is equal to the number of usertagviews entries for these tags.'
        THEN TRUE
        -- ELSE 'Counts Do Not Match: The number of tags for this topic_id is NOT equal to the number of usertagviews entries for these tags.'
      ELSE FALSE
    END AS comparison_result,
    (SELECT total_tags_count FROM CountOfTags) AS tags_count_for_topic,
    (SELECT total_usertagviews_count FROM CountOfUserTagViews) AS usertagviews_count_for_tags_in_topic;
    `;
    const params = [topic_id, user_id];

    const result = await pool.query(q, params);

    return res.json(result.rows[0]);
  } catch (err) {
    return res.json({
      error: "Error in checking check-validity: " + err.message,
    });
  }
});

router.get("/by-uid-and-tid", async (req, res) => {
  const user_id = req.query.user_id;
  const topic_id = req.query.topic_id;

  try {
    const q = `
      SELECT
        utv.id, utv.user_id,
        t.name
      FROM
        public.usertagviews AS utv
      JOIN
        public.tags AS t
      ON
        utv.tag_id = t.id
      WHERE
        t.topic_id = $1
      AND utv.user_id = $2;
    `;
    const p = [topic_id, user_id];

    const results = await pool.query(q, p);

    return res.json({ data: results.rows });
  } catch (err) {
    return res.json({
      error:
        "Error in getting user tag views using user_id and topic_id: " +
        err.message,
    });
  }
});

module.exports = router;
