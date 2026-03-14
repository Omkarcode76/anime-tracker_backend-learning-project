import { Router } from "express";
import { signUp, Login } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", Login)

export default userRouter