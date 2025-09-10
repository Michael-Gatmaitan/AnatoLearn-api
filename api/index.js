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

const pool = require("./db");

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

app.get("/test-code-verification", async (req, res) => {
  try {
    const getCodeQ = `select * from email_verifications where id=1`;
    const getCodeResult = await pool.query(getCodeQ);

    const now = new Date(Date.now());
    const expiresAt = getCodeResult.rows[0].expires_at;

    console.log(`Now: ${now}`);
    console.log(`Expires: ${expiresAt}`);

    console.log(`Is expire: ${now < expiresAt}`);

    // console.log(getCodeResult);
    return res.json({ message: "Code verification tested" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error from testing code verification" });
  }
});

app.get("/is-email-valid", async (req, res) => {
  const { email } = req.query;

  try {
    const isEmailValidQ = `SELECT * FROM users WHERE email=$1`;
    const isEmailValidResult = await pool.query(isEmailValidQ, [email]);

    if (isEmailValidResult.rows.length === 1) {
      return res.json({ message: "Email is already taken", success: false });
    } else {
      return res.json({ message: "Email is valid", success: true });
    }
  } catch (err) {
    console.log("Error in /is-email-valid occured: " + err);
    return res.status(500).json({ message: "Error occured", success: false });
  }
});

app.post("/send-verification", async (req, res) => {
  const { email, verificationType } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required " });

  // console.log(newVerificationCode);

  try {
    // Store this in database for verification code checking
    // const newVerificationCode = {
    //   email,
    //   code,
    //   expiresAt,
    //   mode: "C",
    // };

    if (verificationType == "recovery") {
      // Find email if it exists in users first
      const checkEmailQ = `SELECT id from users where email=$1`;
      const checkEmailResult = await pool.query(checkEmailQ, [email]);

      if (!checkEmailResult.rows[0].id) {
        console.log("VERIFY CODE: Email not exitsts");
        return res.json({
          message: `User with email of ${email} not exists in users table.`,
          success: false,
        });
      } else {
        console.log("VERIFY CODE: Email exitsts in DB <3");
      }
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 min

    // Insert verification code to database
    const q = `INSERT INTO email_verifications (email, code, expires_at, mode) VALUES ($1, $2, $3, $4)`;
    const p = [email, code, expiresAt, "C"];

    const newVerification = await pool.query(q, p);
    console.log(newVerification);

    // await transporter.sendMail({
    //   from: `"AnatoLearn" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: "Your Verification Code",
    //   html: `<p>Your verification code is: <b>${code}</b></p><p>This code will expire in 5 minutes.</p>`,
    // });

    return res.json({ message: "Verification code sent!", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email", success: false });
  }
});

app.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  const deleteVerification = async (email) => {
    const deleteCodeQ = `DELETE FROM email_verifications where email=$1`;
    const deleteCodeResult = await pool.query(deleteCodeQ, [email]);
    return deleteCodeResult;
  };

  try {
    // Get the code in database based on email
    const getCodeQ = `SELECT * FROM email_verifications WHERE email=$1`;
    const codeResult = await pool.query(getCodeQ, [email]);

    if (!codeResult.rows[0].id)
      return res
        .status(500)
        .json({ message: `There's no code in email of ${email}` });

    // console.log(typeof code, typeof codeResult.rows[0].code);

    // Check if it matches the code get and the code from body
    if (code !== codeResult.rows[0].code)
      return res.json({ message: "Code not matched", success: false });

    // Check if the code is not expired
    const now = new Date(Date.now());
    if (now > codeResult.expires_at) {
      const deleteCodeResult = await deleteVerification(email);
      console.log(`Deleting expired code: ${deleteCodeResult}`);
      res.json({ message: "Code is already expired", success: false });
    }

    // Once verify, delete the code in the database
    const deleteCodeResult = await deleteVerification();
    console.log(`Deleting confimed code: ${deleteCodeResult}`);

    // If the code reach here, it means the code is existed, matched, and not expired.
    return res.json({ message: "Code matched", succes: true });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: `There was an error verifying code: ${err}`,
        success: false,
      });
  }
});

module.exports = app;
