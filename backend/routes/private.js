const router = require("express").Router();
const { readPrivate } = require("../controllers/private");

router.get("/", readPrivate);

module.exports = router;
