import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/databaseConnect.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  connectDb();
  console.log(`Server listening on ${port}`);
});
