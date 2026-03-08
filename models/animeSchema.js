import mongoose from "mongoose";
const { Schema } = mongoose;

const animeSchema = new Schema({
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
  createAt:{
    type : Date,
    default : Date.now()
  }
  
});

export default mongoose.model("Anime", animeSchema);
