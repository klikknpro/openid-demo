require("dotenv").config();
const jwt = require("jsonwebtoken");
const Base = require("../models/base");
const Profile = require("../models/profile");

const verifyToken = (token) => {
  let verified;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return (verified = false);
    verified = decoded;
  });
  return verified;
};

const readPrivate = async (req, res) => {
  if (!req.headers) return res.sendStatus(401);
  const verified = verifyToken(req.headers.authorization);
  if (!verified) return res.sendStatus(401);

  const base = await Base.findOne({ name: "Private" });
  return res.status(200).json(base.name);
};

const readUserEmail = async (req, res) => {
  if (!req.headers) return res.sendStatus(401);
  const verified = verifyToken(req.headers.authorization);
  if (!verified) return res.sendStatus(401);

  const user = await Profile.findOne({ _id: verified.profile_id });

  return res.status(200).json(user.email);
};

const updateProfile = async (req, res) => {
  return res.status(200);
};

exports.readPrivate = readPrivate;
exports.readUserEmail = readUserEmail;
exports.updateProfile = updateProfile;
