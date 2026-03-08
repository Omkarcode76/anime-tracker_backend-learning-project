import { Router } from "express";
import {
  getAnime,
  getAnimeById,
  postAnime,
  deleteAnime,
  updateAnime,
  deleteAllAnime,
} from "../controller/animeController.js";



const animeRouter = Router();

animeRouter.get("/", getAnime);

animeRouter.get("/:id", getAnimeById);

animeRouter.post("/", postAnime);

animeRouter.delete("/drop", deleteAllAnime);

animeRouter.delete("/:id", deleteAnime);

animeRouter.put("/:id", updateAnime);



export default animeRouter;
