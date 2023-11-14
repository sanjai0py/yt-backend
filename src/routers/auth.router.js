const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth.controller");

// post - signup
// post - signin
// get - me

// todo: impl the signup route
router.post("/signup", signup);

module.exports = router;
