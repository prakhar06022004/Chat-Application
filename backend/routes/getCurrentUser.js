import express from "express";
import { getCurrentUser } from "../controllers/getCurrentUser.js";
import { isAuth } from "../middlewares/isAuth.js";
const userRouter = express.Router();
userRouter.get("/getcurrent", isAuth, getCurrentUser);
export default userRouter;