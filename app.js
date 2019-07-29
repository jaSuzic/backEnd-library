const express = require("express");
const path = require("path");
const parser = require("body-parser");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books");
const membersRoutes = require("./routes/members");
const rentsRoutes = require("./routes/rents");
const userRoutes = require('./routes/users')

const app = express();

app.use(parser.json());
app.use(
  parser.urlencoded({
    extended: false
  })
);

app.use("/images", express.static(path.join("images")));

//For CORS:
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, OPTIONS, PUT"
  );
  next();
});

//Connecting to mongoDB
mongoose
  .connect(
    "mongodb+srv://libAdmin:7adcniXmxCW6ErKm@cluster0-87hud.mongodb.net/app-library?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(res => {
    console.log("connected to DB");
  })
  .catch(err => {
    console.log(err);
  });

//Using routes
app.use("/api/books", booksRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/rents", rentsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;