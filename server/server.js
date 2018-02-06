//require("./config/config");
// const _ = require("lodash");
const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");
// const {ObjectID} = require("mongodb");

// const {mangoose} = require("./db/mongoose");
// const {User} = require("./models/user");
// const {Todo} = require("./models/todo");
// const {authenticate} = require("./middleware/authenticate");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3335;

var app = express();
// app.use(bodyParser.json());
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
};

