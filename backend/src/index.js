// require('dotenv').config({path:'./env'});
//env must be loaded first
import dotenv from "dotenv"; //make changes in package.json file
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
    app.on("error", (err) => {
      console.error("Listening error: ", err);
    });
  })
  .catch((err) => {
    console.error("Mongodb connection error: ", err);
  });

//basic approach
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();

// Immediately-Invoked Function Expression(IIFE)
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error: ", error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw err;
  }
})();
*/
