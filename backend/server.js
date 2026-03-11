import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import animeRouter from "./routes/animeRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authMiddleware from "./middleware/userAuthMiddleware.js";

dotenv.config();
const app = express();
const port = 3000;
mongoose.connect(process.env.MONGO_URI);
app.use(express.json());

app.use("/anime",authMiddleware, animeRouter);
app.use("/user", userRouter,);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
