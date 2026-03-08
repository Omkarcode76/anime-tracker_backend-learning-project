import Anime from "../models/animeSchema.js";

const getAnime = async (req, res) => {
  try {
    const query = {};
    query.limit = Number(req.query.limit) || 5;
    query.page = Number(req.query.page) || 1;
    const skip = (query.page - 1) * query.limit;
    query.favourite = req.query.favourite;
    query.watchStatus = req.query.watchStatus;
    query.search = req.query.search;
    query.sort = req.query.sort || "createAt"
    const filter = {};
    if (query.favourite === "yes" || query.favourite === "no") {
      filter.isFavourite = query.favourite;
    }
    if (
      query.watchStatus === "completed" ||
      query.watchStatus === "ongoing" ||
      query.watchStatus === "notStarted"
    ) {
      filter.watchStatus = query.watchStatus;
    }
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { genre: { $regex: query.search, $options: "i" } },
      ];
    }

    const animes = await Anime.find(filter).skip(skip).limit(query.limit).sort({[query.sort] : -1});

    if (!animes) {
      return res.status(404).json({ message: "No anime added" });
    }
    res.status(200).json(animes);
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};
const getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id );
    if (!anime) {
      return res.status(404).json({ message: "No anime added" });
    }
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};

const postAnime = async (req, res) => {
  try {
    const { title, genre, watchStatus, rating, isFavourite } = req.body;
    if (title === undefined || genre === undefined) {
      return res.status(400).json({ message: "Fill title and genre" });
    }
    const anime = await Anime.create({
      title,
      genre,
      watchStatus,
      rating,
      isFavourite,
    });

    res.status(201).json(anime);
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const id = req.params.id;
    const anime = await Anime.findByIdAndDelete(id);
    if (!anime) {
      return res.status(404).json({ message: "anime with such id not found" });
    }
    res.status(200).json({ message: "anime deleted" });
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};

const updateAnime = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, genre, watchStatus, rating, isFavourite } = req.body;
    const anime = await Anime.findByIdAndUpdate(
      id,
      {
        title,
        genre,
        watchStatus,
        rating,
        isFavourite,
      },
      { runValidators: true, returnDocument: "after" },
    );
    if (!anime) {
      return res.status(404).json({ message: "anime with such id not found" });
    }
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};

const deleteAllAnime = async (req, res) => {
  try {
    if(await Anime.collection.indexExists()){
  await Anime.collection.drop()}
  
   res.status(200).json({"message" : "collection dropped successfully"})
  } catch (error) {
    res.status(500).json({ Message: "Server Error" });
  }
};
export {
  getAnime,
  getAnimeById,
  postAnime,
  deleteAnime,
  deleteAllAnime,
  updateAnime,
};
