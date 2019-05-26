const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const postsRoutes = require('./routes/posts');
const userRoutes = require("./routes/user");
const PMsRoutes = require("./routes/PMs");
const app = express();
mongoose
  .connect(
    "mongodb+srv://PM_KMUTNB:" +
      process.env.MONGO_ATLAS_PW +
      "@powermonitor-ofikh.mon  godb.net/PM?retryWrites=true",
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log(err);
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/PM", PMsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
