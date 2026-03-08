import { Router } from "express";
import uploadUser from "../controller/userController.js";

const userRouter = Router();


userRouter.post("/", uploadUser);

export default userRouter