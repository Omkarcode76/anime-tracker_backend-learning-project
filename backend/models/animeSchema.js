import { Schema, model } from "mongoose";

const animeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref : "User",
    required: true,
    select : false,
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
    min: 0,
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
