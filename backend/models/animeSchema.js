import { Schema, model } from "mongoose";

const animeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  watchStatus: {
    type: String,
    enum: ["completed", "ongoing", "notStarted"],
    default: "notStarted",
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  isFavourite: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Anime", animeSchema);
