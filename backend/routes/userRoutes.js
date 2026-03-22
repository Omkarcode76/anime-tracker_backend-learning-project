import { Router } from "express";
import { signUp, Login, getUser } from "../controllers/userController.js";
import { validateSignup} from "../middleware/validateUser.js";
import authMiddleware from "../middleware/userAuthMiddleware.js";
const userRouter = Router();

userRouter.post("/signup",validateSignup, signUp);
userRouter.post("/login", Login)
userRouter.get('/',authMiddleware, getUser)
export default userRouter