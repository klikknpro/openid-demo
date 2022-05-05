require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

/* === *** === *** === */

app.get("/", (req, res) => {
  res.send("hello oauth");
});

app.listen(port, () => {
  console.log(`Oauth - Openid is listening on port ${port}."`);
});

/*
// mongoose.connection
//   .dropDatabase()
//   .then(() => console.log("database deleted"))
//   .catch((err) => console.log(err));

// initBaseData()
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));
// initAuthEntity()
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));
*/
