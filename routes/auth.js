// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const firebaseConfig = require("../firebaseConfigFile");
const dotenv = require("dotenv");
dotenv.config();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const user = await firebaseConfig.auth().getUserByEmail(email);
    console.log(user);
    const token = jwt.sign({ userEmail: user.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log({ token });
    res.set("Authorization", `Bearer ${token}`);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/verify_email/:email", async (req, res) => {
  const { email } = req.params;
  console.log(email);
  console.log(process.env.EMAIL);
  if (email !== process.env.EMAIL) {
    return res.status(200).json({ value: false });
  }

  res.status(200).json({ value: true });
});

router.get("/get_admin_uid", async (req, res) => {
  res.status(200).json({ admin_id: process.env.SECRET_KEY });
});

module.exports = router;
