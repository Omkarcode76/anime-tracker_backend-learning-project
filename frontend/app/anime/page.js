"use client";
import { use, useEffect, useState } from "react";

const Anime = () => {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    getAnimes();
  }, []);
  const getAnimes = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/anime", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setAnimes(data);
    console.log(data);
  };

  return (
    <>
    <div className="flex justify-center">

      <ul className="">
        {animes.map((a) => (
            <li key={a._id}>{a.title}</li>
        ))}
      </ul>
        </div>
    </>
  );
};

export default Anime;
