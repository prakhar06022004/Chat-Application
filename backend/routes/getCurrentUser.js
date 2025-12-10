import express from "express";
import { getCurrentUser } from "../controllers/getCurrentUser.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { profile } from "../controllers/userController.js";
const userRouter = express.Router();
userRouter.get("/getcurrent", isAuth, getCurrentUser);
userRouter.put("/profile", isAuth, upload.single("backendImage"), profile);
export default userRouter;