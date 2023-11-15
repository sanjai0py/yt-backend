const User = require("../sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");

const signup = asyncHandler(async (req, res, next) => {
  // note: create user
  const user = await User.create(req.body);

  // note: hash the password before storing it in the db
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
});

const login = asyncHandler(async (req, res, next) => {
  // note: get the email and password from the body
  const { email, password } = req.body;

  // note: chech wether the email and password match
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return next({
      message: "The email that is provided is not yet registered",
      statusCode: 400,
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return next({
      message:
        "The password that is provided is not the right password for the user",
      statusCode: 400,
    });
  }
  
  // return back the jwt token
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
});

const me = (req, res) => {
  console.log(req.body);
  res.send("signin");
};

module.exports = {
  signup,
  login,
  me,
};
