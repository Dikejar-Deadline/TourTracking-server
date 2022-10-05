require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandler.js");
const app = express();
const cors = require("cors");

const router = require("./routes/index.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", router);

app.use(errorHandler);

module.exports = app;
