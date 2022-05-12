const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    email: String,
    first_name: String,
    surname: String,
    age: Number,
    nickname: String,
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
