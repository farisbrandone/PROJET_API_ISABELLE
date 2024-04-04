// routes/auth.js
const express = require("express");
const router = express.Router();
const firebaseConfig = require("../firebaseConfigFile");
const dotenv = require("dotenv");
dotenv.config();

router.get("/all_users", async (req, res) => {
  /*const listAllUsers = (req, res, nextPageToken) => {*/
  // List batch of users, 1000 at a time.
  firebaseConfig
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      console.log(listUsersResult);
      res.status(200).json(listUsersResult);
      /*if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(req, res, listUsersResult.pageToken);
        }*/
    })
    .catch((error) => {
      res.status(500).json({ error: "Error listing users:" });
    });
  /*};
  listAllUsers(req, res);*/
});

router.get("/one_user/:email", async (req, res) => {
  if (!req.params.email) {
    return res.status(401).json({ error: "get one user failed" });
  }

  try {
    const user = await firebaseConfig.auth().getUserByEmail(req.params.email);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "get one user failed" });
  }
});

router.get("/get_admin_uid", async (req, res) => {
  res.status(200).json({ admin_id: process.env.SECRET_KEY });
});

router.post("/create_user", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "update failed" });
  }
  try {
    const user = await firebaseConfig.auth().createUser({
      email: email,
      emailVerified: false,
      password: password,
      disabled: false,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "create user failed" });
  }
});

router.put("/update_user/:email", async (req, res) => {
  const { email, password } = req.body;
  if (!req.params.email) {
    return res.status(401).json({ error: "update failed" });
  }
  try {
    const user = await firebaseConfig.auth().getUserByEmail(req.params.email);
    if (password) {
      const userUpdate = await firebaseConfig.auth().updateUser(user.uid, {
        email: email ? email : user.email,
        emailVerified: true,
        password: password,
      });

      res.status(200).json(userUpdate);
    }
    const userUpdate = await firebaseConfig.auth().updateUser(user.uid, {
      email: email ? email : user.email,
      emailVerified: true,
    });

    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json({ error: "update failed" });
  }
});

router.delete("/delete_user/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await firebaseConfig.auth().getUserByEmail(email);

    await firebaseConfig.auth().deleteUser(user.uid);
    res.status(200).json({ success_delete: true });
  } catch (error) {
    res.status(500).json({ error: "Error delete user:" });
  }
});

router.get("/desable_user/:email", async (req, res) => {
  console.log("ddded", req.params.email);
  if (!req.params.email) {
    return res.status(401).json({ error: "update failed" });
  }
  try {
    const user = await firebaseConfig.auth().getUserByEmail(req.params.email);

    const userUpdate = await firebaseConfig.auth().updateUser(user.uid, {
      disabled: !user.disabled,
    });

    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json({ error: "update failed" });
  }
});

module.exports = router;
