// express app config
const express = require("express");
const app = express();

require("dotenv").config();

// routes
const authRouter = require("./routers/auth.router");
const errorHandler = require("../src/middlewares/errorHandler");

// note: middleware to let the server accept json data in body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("suuuu");
});

app.use("/api/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the express app is listening on port ${PORT}`);
});
