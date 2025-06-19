const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const qaRoutes = require("./routes/activities/actQaRoutes");
const topicRoutes = require("./routes/topicRoutes");
const totalScoreRoutes = require("./routes/totalScoreRoutes");
const activityScoreRoutes = require("./routes/activityScores");
const userTopicProgressRoutes = require("./routes/userTopicProgressRoutes");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/activities", qaRoutes);
app.use("/topics", topicRoutes);
app.use("/total-scores", totalScoreRoutes);
app.use("/activity-scores", activityScoreRoutes);
app.use("/user-topic-progress", userTopicProgressRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "Hello, i'm michael gatmaitan :>" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
