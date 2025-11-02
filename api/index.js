const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const PImage = require("pureimage");
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

// Add Middleware for security, use 401 for unauthorize
// Middleware for jwt checking if the token is valid

app.use(jwtMiddleware);

function jwtMiddleware(req, res, next) {
  // Bypass middleware for login and signup routes
  if (
    (req.path === "/auth/login" || req.path === "/auth/signup") &&
    req.method === "POST"
  ) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/activities", qaRoutes);
app.use("/topics", topicRoutes);
app.use("/total-scores", totalScoreRoutes);
app.use("/activity-scores", activityScoreRoutes);
app.use("/user-topic-progress", userTopicProgressRoutes);
app.use("/user-tag-views", userTagViewsRoutes);

const emailValidator = (email) => {
  // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex = /^[A-Za-z0-9._%+-]+@gmail\.com$/i;
  const isEmailValid = regex.test(email);
  return isEmailValid;
};

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

app.put("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const isEmailValid = emailValidator(email);

    if (!isEmailValid) {
      return res.json({
        message: "Reset password - Invalid email: " + email,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const changePassQ = `UPDATE users SET password=$1 WHERE email=$2`;
    const changePassP = [hashedPassword, email];

    const changePasswordResult = await pool.query(changePassQ, changePassP);

    console.log(changePasswordResult);

    return res.json({ message: "Password reset successful!", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to send email", success: false });
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

  try {
    const isEmailValid = emailValidator(email);

    if (!isEmailValid) {
      return res.json({
        message: "Send verification - Invalid email: " + email,
        success: false,
      });
    }

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

    await transporter.sendMail({
      from: `"AnatoLearn" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code - AnatoLearn",
      // html: `<p>Your verification code is: <b>${code}</b></p><p>This code will expire in 5 minutes.</p>`,
      html: `
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #fff;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #346BA8;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    h2 {
      color: #fff;
    }
    .code {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 4px;
      background: #FFB262;
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      margin: 20px 0;
    }
    p {
      color: #ccc;
      font-size: 15px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>
      ${
        verificationType === "creation"
          ? `Verify your email address`
          : verificationType === "recovery"
            ? `Reset your password`
            : null
      }
      </h2>
    <p>Hello,</p>
      ${
        verificationType === "creation"
          ? `<p>Thank you for registering with <strong>AnatoLearn</strong>. Please use the verification code below to confirm your email address:</p>`
          : verificationType === "recovery"
            ? `<p>Please use the verification code below to create a new password:</p>`
            : null
      }
    
    <div class="code">${code}</div>
    <p>This code will expire in 5 minutes. If you did not request this, you can ignore this email.</p>
    <div class="footer">
      &copy; 2025 AnatoLearn. All rights reserved.
    </div>
  </div>
</body>
</html>
      `,
    });

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
    const getCodeQ = `SELECT * FROM email_verifications WHERE email=$1 ORDER BY ID DESC LIMIT 1`;
    const codeResult = await pool.query(getCodeQ, [email]);

    if (codeResult.rows.length == 0) {
      console.log("No code found on email: " + email);

      return res.json({
        message: `There's no code in email of ${email}`,
        success: false,
      });
    }

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
    const deleteCodeResult = await deleteVerification(email);
    console.log(`Deleting confimed code: ${deleteCodeResult}`);

    // If the code reach here, it means the code is existed, matched, and not expired.
    return res.json({ message: "Code matched", success: true });
  } catch (err) {
    return res.status(500).json({
      message: `There was an error verifying code: ${err}`,
      success: false,
    });
  }
});

app.get("/has-badge", async (req, res) => {
  const { user_id, topic_id } = req.query;

  try {
    const getAllPassedScoresQ = `SELECT * FROM total_scores
    WHERE accuracy > 49 AND user_id=$1
    AND topic_id=$2 ORDER BY total_score`;
    const getAllPassedScoresResult = (
      await pool.query(getAllPassedScoresQ, [user_id, topic_id])
    ).rows;

    return res.json({ hasBadge: getAllPassedScoresResult.length >= 1 });
  } catch (err) {
    return res.status(500).json({
      message: `There was an error checking badge passed scores: ${err}`,
      success: false,
    });
  }
});

// Generate and email certificate with overlaid user name
app.post("/send-certificate", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ message: "Email and name are required", success: false });
  }

  try {
    const isEmailValid = emailValidator(email);
    if (!isEmailValid) {
      return res.json({ message: "Invalid email: " + email, success: false });
    }

    // Check if user already received certificate
    const userQ = `SELECT * FROM users WHERE email=$1`;
    const userResult = (await pool.query(userQ, [email])).rows[0];
    // console.log(userResult.rows[0]);

    console.log("USER RESULT: " + userResult);

    if (userResult.certificate_recieved) {
      return res.json({
        message: "You already recieved your certificate",
        success: false,
      });
    }

    // Check if all topics is passed
    const topicsPassedQ =
      "SELECT DISTINCT ON (topic_id) * FROM total_scores WHERE accuracy > 49 AND user_id = $1 ORDER BY topic_id";
    const topicsPassedResult = (
      await pool.query(topicsPassedQ, [userResult.id])
    ).rows;

    if (topicsPassedResult.length <= 6) {
      return res.json({
        message:
          "All topics should be passed in order to recieve a certificate.",
        success: false,
      });
    }

    console.log(`User recieved certficate: ${userResult.certificate_recieved}`);
    console.log(`User length of passed topics: ${topicsPassedResult.length}`);

    // Load base certificate PNG
    const certPath = path.join(
      __dirname,
      "assets",
      "images",
      "AnatoLearnCertification.png",
    );
    if (!fs.existsSync(certPath)) {
      return res.status(500).json({
        message: "Certificate template not found",
        success: false,
      });
    }

    const baseCert = await PImage.decodePNGFromStream(
      fs.createReadStream(certPath),
    );

    // Prepare drawing surface with same size as base
    const width = baseCert.width;
    const height = baseCert.height;
    const img = PImage.make(width, height);
    const ctx = img.getContext("2d");

    // Draw base certificate
    ctx.drawImage(baseCert, 0, 0, width, height);

    // Load font safely (optional custom font)
    const configuredFontPath = process.env.CERT_FONT_PATH;
    const defaultFontPath = path.join(
      __dirname,
      "assets",
      "fonts",
      "SourceSansPro-Regular.ttf",
    );
    const fontPathToUse = configuredFontPath || defaultFontPath;
    try {
      if (fs.existsSync(fontPathToUse)) {
        await PImage.registerFont(fontPathToUse, "CertFont").load();
      }
    } catch (_) {
      // continue with default font
    }

    // Draw user's name centered
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    // Try multiple font sizes to fit width
    const maxWidth = Math.floor(width * 0.7);
    const candidateSizes = [72, 64, 56, 48, 42, 36];
    let chosen = 48;
    for (const size of candidateSizes) {
      ctx.font = `${size}pt CertFont`;
      const metrics = ctx.measureText(name);
      if (metrics.width <= maxWidth) {
        chosen = size;
        break;
      }
    }
    ctx.font = `${chosen}pt CertFont`;

    // Vertical position (roughly center or where the name area is expected)
    const centerY = Math.floor(height * 0.56);
    ctx.fillText(name, Math.floor(width / 2), centerY);

    // Encode PNG to buffer
    const { PassThrough } = require("stream");
    const pass = new PassThrough();
    const chunks = [];
    pass.on("data", (c) => chunks.push(Buffer.from(c)));
    await PImage.encodePNGToStream(img, pass);
    pass.end();
    const pngBuffer = Buffer.concat(chunks);

    // Email the certificate
    await transporter.sendMail({
      from: `"AnatoLearn" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your AnatoLearn Certificate",
      html: `<p>Hi ${name},</p><p>Attached is your certificate of completion from <strong>AnatoLearn</strong>.</p>`,
      attachments: [
        {
          filename: `AnatoLearn-Certificate-${name.replace(
            /[^a-z0-9-_]/gi,
            "_",
          )}.png`,
          content: pngBuffer,
        },
      ],
    });

    // Change the user's certificate_recieved status after sending the certificate
    const updateUserCertStatusQ =
      "UPDATE users SET certificate_recieved = true WHERE id = $1 RETURNING *";
    const updateUserCertResult = await pool.query(updateUserCertStatusQ, [
      userResult.id,
    ]);

    console.log(
      "Result of user update certificate status: " +
        updateUserCertResult.rows[0],
    );

    return res.json({ message: "Certificate sent!", success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to generate/send certificate", success: false });
  }
});

module.exports = app;
