import { Router } from "express";
import { signUp, Login } from "../controller/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", Login)

export default userRouter