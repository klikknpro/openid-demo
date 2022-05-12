const router = require("express").Router();
const { readPrivate, readUserEmail } = require("../controllers/private");

router.get("/", readPrivate);
router.get("/user", readUserEmail);

module.exports = router;
