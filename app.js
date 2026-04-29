const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  app.use((req, res, next) => {
  req.user = {
    _id: '69f2682a1a41ec14cd242954'// paste the _id of the test user created in the previous step
  };
  next();
});
});

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);// _id will become accessible
};