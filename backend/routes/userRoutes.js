import { Router } from "express";
import { signUp, Login } from "../controller/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.get("/login", Login)

export default userRouter