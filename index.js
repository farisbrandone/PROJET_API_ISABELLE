const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/getUser");
const authenticate = require("./middleware/authenticate");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
app.set("port", port);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use("/auth", authRoutes);
app.use("/users", authenticate, userRoutes);

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
