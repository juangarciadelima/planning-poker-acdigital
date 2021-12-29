const express = require("express");
const path = require("path");
const app = express();

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "./client/build")));