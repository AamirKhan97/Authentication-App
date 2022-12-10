const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
// const { request } = require('http');
// const { response } = require('express');

//Configuring Cors
app.use(cors());

//Configure express to accept form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Giving path to custom module
dotEnv.config({ path: "./config/config.env" });

//port number
const port = process.env.PORT || 5000;
// connect to mongo db
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((response) => {
    console.log("::::::::::-::::::::>>>> Connected To Mongo DB Succesfully");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Dummy get request
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Router Configration
app.use("/user", require("./router/userRouter"));
app.use("/users", require("./router/Allusers"));

// Listen to app
app.listen(port, () => {
  console.log(`Express Server is Running at : ................`);
});
