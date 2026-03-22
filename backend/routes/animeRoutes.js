import { Router } from "express";
import {
  getAnime,
  getAnimeById,
  postAnime,
  deleteAnime,
  updateAnime,
  getStats,
} from "../controllers/animeController.js";


const animeRouter = Router();

animeRouter.get("/", getAnime);
animeRouter.get("/getstats",getStats)
animeRouter.get("/:id", getAnimeById);

animeRouter.post("/post", postAnime);



animeRouter.delete("/:id", deleteAnime);
animeRouter.put("/:id", updateAnime);

export default animeRouter;
