require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

/* routers */
const publicRouter = require("./routes/public");
const privateRouter = require("./routes/private");
const loginRouter = require("./routes/login");

/* mountpoints */
app.use("/api/public", publicRouter);
app.use("/api/private", privateRouter);
app.use("/api/login", loginRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

/* === *** === *** === */

// mongoose.connection
//   .dropDatabase()
//   .then(() => console.log("database deleted"))
//   .catch((err) => console.log(err));

// const { initBaseData } = require("./controllers/init-base-data");
// initBaseData()
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`OpenID/OAuth demo is listening on port ${port}. Please run: "brew services start mongodb-community"`);
});

/*
app.get({
  // SECRET_KEY BZMEG !!!!!!!!!!
});
*/
