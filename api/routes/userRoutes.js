const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM users");

    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const {
    email,
    newAvatar,
    newFirstname,
    newMiddlename,
    newLastname,
    updateType,
  } = req.body;

  try {
    if (updateType === "avatar") {
      const updateAvatarQ = `UPDATE users SET avatar=$1 WHERE email=$2`;
      const updateAvatarP = [newAvatar, email];

      const updateAvatarResult = await pool.query(updateAvatarQ, updateAvatarP);
      console.log(updateAvatarResult);

      return res.json({
        message: "Avatar successfully updated",
        success: true,
      });
    } else if (updateType === "name") {
      const updateNameQ = `UPDATE users SET fname=$1, mname=$2, lname=$3 WHERE email=$4`;
      const updateNameP = [newFirstname, newMiddlename, newLastname, email];

      const updateNameResult = await pool.query(updateNameQ, updateNameP);
      console.log(updateNameResult);

      return res.json({
        message: "Name updated successfully",
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error in updating user details" });
  }
});

router.delete("/", async (req, res) => {
  const { email } = req.body;

  try {
    if (email == null)
      return res.json({ message: "Email cannot be empty!", success: false });

    const deleteUserQ = "DELETE FROM users WHERE email=$1";
    const deleteUserP = [email];

    const deletedUser = await pool.query(deleteUserQ, deleteUserP);
    console.log("Deleted user: " + deletedUser);

    return res.json({ message: "User deleted.", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Error in deleting user" });
  }
});

// Get total users

// Update profile of the user

// Delete account of the user

// Update name of the user

// And some other updates

module.exports = router;
