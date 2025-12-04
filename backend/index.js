import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/databaseConnect.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(cors,{})
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  connectDb();
  console.log(`Server listening on ${port}`);
});
