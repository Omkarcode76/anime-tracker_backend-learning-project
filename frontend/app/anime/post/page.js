"use client";
import { useState } from "react";

const Post = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [watchStatus, setWatchStatus] = useState("");
  const [rating, setRating] = useState("");
  const [isFavourite, setIsFavourite] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/anime/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        genre,
        watchStatus,
        rating,
        isFavourite,
      }),
    });
    const data = await res.json();
    console.log(data);
    setTitle("");
    setGenre("");
    setWatchStatus("");
    setRating("");
    setIsFavourite("");
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500 m-10">
        Post Anime
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="inputs flex flex-col items-center gap-6"
        >
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Anime title"
            className="p-4 w-[25%] border border-black rounded-2xl"
          />
          <input
            value={genre}
            type="text"
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter Anime genre"
            className="p-4 w-[25%] border border-black rounded-2xl"
          />
          <input
            value={watchStatus}
            type="text"
            onChange={(e) => setWatchStatus(e.target.value)}
            placeholder="watch status can be 'notStarted', 'ongoing', 'completed'"
            className="p-4 w-[25%] border border-black rounded-2xl"
          />
          <input
            value={rating}
            type="text"
            onChange={(e) => setRating(e.target.value)}
            placeholder="rate between 1-10"
            className="p-4 w-[25%] border border-black rounded-2xl"
          />
          <input
            value={isFavourite}
            type="text"
            onChange={(e) => setIsFavourite(e.target.value)}
            placeholder="Favourite 'yes' or 'no'"
            className="p-4 w-[25%] border border-black rounded-2xl"
          />
          <button className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-full text-white font-bold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
