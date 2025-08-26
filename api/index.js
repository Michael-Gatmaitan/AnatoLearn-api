const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const qaRoutes = require("./routes/activities/actQaRoutes");
const topicRoutes = require("./routes/topicRoutes");
const totalScoreRoutes = require("./routes/totalScoreRoutes");
const activityScoreRoutes = require("./routes/activityScores");
const userTopicProgressRoutes = require("./routes/userTopicProgressRoutes");
const userTagViewsRoutes = require("./routes/userTagViewsRoutes");

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
app.use("/user-tag-views", userTagViewsRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "Hello, i'm michael gatmaitan :>" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const transporter = nodemailer.createTransport({
  service: "gmail", // or use host, port, secure for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/reset-password", async (req, res) => {
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  try {
    await transporter.sendMail({
      from: "AnatoLearn",
      to: "mchlgtmtn@gmail.com",
      subject: "Sample subject",
      html: "<h1>Hello michael pogi</h1>",
    });

    return res.json({ message: "Password reset email sent successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to send email" });
  }
});

app.post("/send-verification", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required " });

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const expiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 min

  // Store this in database for verification code checking
  const newVerificationCode = {
    email,
    code,
    expiresAt,
    mode: "C",
  };

  console.log(newVerificationCode);

  try {
    await transporter.sendMail({
      from: `"AnatoLearn" <${process.env.EMAIL_USER}>`,

      to: email,
      subject: "Your Verification Code",
      html: `<p>Your verification code is: <b>${code}</b></p><p>This code will expire in 5 minutes.</p>`,
    });

    res.json({ message: "Verification code sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = app;
