require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("axios");
const jwt = require("jsonwebtoken");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

/* === *** === *** === */

const generateToken = (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  return token;
};
app.get({
  // SECRET_KEY BZMEG !!!!!!!!!!
});

app.post("/api/login", async (req, res) => {
  const code = req.body.code;
  const response = await http.post("https://oauth2.googleapis.com/token", {
    code: code,
    client_id: "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:3000/callback",
    grant_type: "authorization_code",
  });
  const decoded = jwt.decode(response.data.id_token);
  const userId = decoded.sub;
  const token = generateToken(userId);
  res.status(200).json(token);
});

app.listen(port, () => {
  console.log(`Oauth - Openid is listening on port ${port}.`);
});

/*

*/
