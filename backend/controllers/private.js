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
  if (!req.headers) return res.sendStatus(401);
  if (!req.body) return res.sendStatus(400);
  const verified = verifyToken(req.headers.authorization);
  if (!verified) return res.sendStatus(401);

  const filter = { _id: verified.profile_id };
  const update = {
    first_name: req.body.first_name,
    surname: req.body.surname,
    age: req.body.age,
    nickname: req.body.nickname,
  };
  const options = { new: true };
  const updatedProfile = await Profile.findOneAndUpdate(filter, update, options);

  return res.status(200).json(updatedProfile);
};

exports.readPrivate = readPrivate;
exports.readUserEmail = readUserEmail;
exports.updateProfile = updateProfile;
