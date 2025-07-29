const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const router = express.Router();

const emailValidator = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = regex.test(email);
  return isEmailValid;
};

router.post("/signup", async (req, res) => {
  const { name, email, password, fname, mname, lname } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const isEmailValid = emailValidator(email);

    if (!isEmailValid) {
      res.status(500).json({ message: "Invalid email", type: "email" });
      return;
    }

    if (name.lenth < 3) {
      res.status(500).json({
        message: "Name length should at least 4 characters long",
        type: "username",
      });
      return;
    }

    if (password.length <= 7) {
      res
        .status(500)
        .json({
          message: "Password must be 8 characters long",
          type: "password",
        });
      return;
    }

    if (fname == "" || lname == "") {
      res.status(500).json({
        message: "First name and last name should have a value",
        type: "name",
      });
      return;
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, fname, mname, lname) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, hashedPassword, fname, mname, lname],
    );

    return res
      .status(201)
      .json({ message: "User created", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Signup failed: " + err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const isEmailValid = emailValidator(email);
    if (!isEmailValid || password.length <= 7) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", type: "all" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No user found.", type: "user" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", type: "password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", type: "server" });
  }
});

module.exports = router;
