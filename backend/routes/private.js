const router = require("express").Router();
const { readPrivate, readUserEmail, updateProfile } = require("../controllers/private");

router.get("/", readPrivate);
router.get("/profile", readUserEmail);
router.post("/private/update-profile", updateProfile);

module.exports = router;
