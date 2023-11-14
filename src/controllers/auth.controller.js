const User = require("../sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  // todo: create user
  const user = await User.create(req.body);

  // todo: hash the password before storing it in the db
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
};

const signin = (req, res) => {
  console.log(req.body);
  res.send("signin");
};

const me = (req, res) => {
  console.log(req.body);
  res.send("signin");
};

module.exports = {
  signin,
  signup,
  me,
};
