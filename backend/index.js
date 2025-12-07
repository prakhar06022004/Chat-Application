import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/databaseConnect.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import userRouter from "./routes/getCurrentUser.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/auth", authRouter);
app.use("/user", userRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
