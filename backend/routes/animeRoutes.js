import { Router } from "express";
import {
  getAnime,
  getAnimeById,
  postAnime,
  deleteAnime,
  updateAnime,
} from "../controllers/animeController.js";


const animeRouter = Router();

animeRouter.get("/", getAnime);
animeRouter.get("/:id", getAnimeById);

animeRouter.post("/post", postAnime);



animeRouter.delete("/delete/:id", deleteAnime);

animeRouter.put("/:id", updateAnime);

export default animeRouter;
