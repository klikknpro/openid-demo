require("dotenv").config();
const http = require("axios");
const jwt = require("jsonwebtoken");
const AuthEntity = require("../models/user");
const Profile = require("../models/profile");

const generateToken = (profileId) => {
  const token = jwt.sign({ profile_id: profileId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const login = async (req, res) => {
  const code = req.body.code;
  // exchange code for an access/ID token
  const response = await http.post("https://oauth2.googleapis.com/token", {
    code: code,
    client_id: "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:3000/callback",
    grant_type: "authorization_code",
  });
  // response.data has both access and ID token
  const decoded = jwt.decode(response.data.id_token);
  const loginEmail = decoded.email;
  const existingUser = await AuthEntity.findOne({ email: loginEmail });

  if (existingUser) {
    // if the user has been registered before
    const token = generateToken(existingUser.profile_id);
    return res.status(200).json(token);
  } else {
    // create new profile
    const newProfile = new Profile({
      email: loginEmail,
      first_name: "",
      surname: "",
      age: null,
      nickname: "",
    });
    await newProfile.save().catch((err) => {
      return res.status(500).json(err);
    });

    // create new user with the new profile's mongo_id
    const profile = await Profile.findOne({ email: loginEmail });

    const newUser = new AuthEntity({
      email: profile.email,
      profile_id: profile._id,
    });
    await newUser.save().catch((err) => {
      return res.status(500).json(err);
    });

    const token = generateToken(profile._id);
    return res.status(201).json(token);
  }
};

exports.login = login;

/*
create a new profile, which is a seperate collection
that profile has a mongoid
profile-mongoid will be inserted into the user profile (user collection)
and this mongoid (from user profile) will go into my token
*/
