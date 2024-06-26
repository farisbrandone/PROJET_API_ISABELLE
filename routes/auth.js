// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const firebaseConfig = require("../firebaseConfigFile");
const dotenv = require("dotenv");
dotenv.config();

router.post("/login", async (req, res) => {
  try {
    const { email, password2 } = req.body;
    console.log(req.body);
    const user = await firebaseConfig.auth().getUserByEmail(process.env.EMAIL);
    console.log(user);
    console.log(email, process.env.EMAIL);
    console.log(password2, user.uid);
    if (email !== process.env.EMAIL || password2 !== user.uid) {
      return res.status(500).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userEmail: user.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log({ token });
    res.set("Authorization", `Bearer ${token}`);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).json(error);
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

module.exports = router;
