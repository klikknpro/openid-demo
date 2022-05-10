require("dotenv").config();
const http = require("axios");
const jwt = require("jsonwebtoken");
const AuthEntity = require("../models/user");

const generateToken = (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const login = async (req, res) => {
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

  // save user into database, if doesnt exist
  const userExists = await AuthEntity.findOne({ google_id: userId });
  if (!userExists) {
    const newUser = new AuthEntity({
      email: decoded.email,
      google_id: userId,
    });
    await newUser.save().catch((err) => {
      return res.status(500).json(err);
    });
  }

  const token = generateToken(userId);
  res.status(200).json(token);
};

exports.login = login;
