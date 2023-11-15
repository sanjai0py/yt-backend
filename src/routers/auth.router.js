const express = require("express");
const router = express.Router();
const { signup, login, me } = require("../controllers/auth.controller");

// post - signup
// post - signin
// get - me
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/me").get(me);

module.exports = router;
