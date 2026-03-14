"use client";

import { useEffect, useState } from "react";

const Anime = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editWatchStatus, setEditWatchStatus] = useState("");
  const [editFavourite, setEditFavourite] = useState("");
  const [editRating, setEditRating] = useState("");

  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favourite, setFavourite] = useState("");
  const [watchStatus, setWatchStatus] = useState("");
  const [editingid, setEditingid] = useState("");
  useEffect(() => {
    getAnimes();
  }, [search, page, favourite, watchStatus,editingid]);

  const getAnimes = async () => {
    const params = new URLSearchParams({
      search: search,
      page: page,
      favourite: favourite,
      watchStatus: watchStatus,
    });
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/anime?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setAnimes(data);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  const Edit = (item) => {
    console.log(item._id);
    setEditingid(item._id);
    setEditTitle(item.title);
    setEditGenre(item.genre);
    setEditWatchStatus(item.watchStatus);
    setEditFavourite(item.isFavourite);
    setEditRating(item.rating);
  };

  const UpdateAnime = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token");
    const updateId = editingid;

    const res = await fetch(`http://localhost:3000/anime/${updateId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        genre: editGenre,
        watchStatus: editWatchStatus,
        isFavourite: editFavourite,
        rating: editRating,
      }),
    });
    const data = await res.json()
    console.log(data)
    setEditingid("")
  };

  return (
    <>
      <div className="">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-20 bg-white w-[80vw] rounded-full m-10 p-7"
        />
        <div>
          <ul className="m-10 flex gap items-center gap-5">
            <span className="text-blue-500 font-bold text-2xl">Filter: </span>
            <li
              onClick={() => {
                setWatchStatus("");
                setFavourite("");
              }}
              className="hover:underline cursor-pointer text-xl hover:text-blue-500"
            >
              All
            </li>
            <li
              onClick={() => setWatchStatus("completed")}
              className="hover:underline cursor-pointer text-xl hover:text-blue-500"
            >
              Completed
            </li>
            <li
              onClick={() => setWatchStatus("ongoing")}
              className="hover:underline cursor-pointer text-xl hover:text-blue-500"
            >
              on going
            </li>
            <li
              onClick={() => setWatchStatus("notstarted")}
              className="hover:underline cursor-pointer text-xl hover:text-blue-500"
            >
              not started
            </li>
            <li
              onClick={() => setFavourite("yes")}
              className="hover:underline cursor-pointer text-xl hover:text-blue-500"
            >
              favourite
            </li>
          </ul>
        </div>
        <ul className="">
          {animes.map((a) => (
            <div key={a._id}>
              {a._id !== editingid ? (
                <li className="m-10 bg-green-300 h-[40vh] w-[80vw] font-bold text-2xl flex flex-col justify-center rounded-2xl">
                  <ul className="flex gap-6 flex-col mx-20">
                    <li>title : {a.title}</li>
                    <li>genre : {a.genre}</li>
                    <li>watch status : {a.watchStatus}</li>
                    <li>favourite : {a.isFavourite}</li>
                    <li>rating : {a.rating}</li>
                    <li>
                      <button
                        onClick={() => Edit(a)}
                        className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3"
                      >
                        Edit
                      </button>
                      <button className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3">
                        Delete
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="m-10 bg-green-300 h-[40vh] w-[80vw] font-bold text-2xl flex flex-col justify-center rounded-2xl">
                  <ul className="flex gap-6  flex-col mx-20">
                    <li className="flex">
                      title:{" "}
                      <input
                        type="text"
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        placeholder="Enter title"
                        className="h-10 w-[70%] rounded-xl p-4 mx-4  bg-white"
                      />
                    </li>
                    <li className="flex">
                      {" "}
                      genre:{" "}
                      <input
                        type="text"
                        onChange={(e) => setEditGenre(e.target.value)}
                        value={editGenre}
                        placeholder="Enter title"
                        className="h-10 w-[70%] rounded-xl p-4 mx-4  bg-white"
                      />
                    </li>
                    <li className="flex">
                      watchStatus:{" "}
                      <input
                        type="text"
                        onChange={(e) => setEditWatchStatus(e.target.value)}
                        value={editWatchStatus}
                        placeholder="Enter title"
                        className="h-10  p-4 mx-4 w-[70%] rounded-xl bg-white"
                      />
                    </li>
                    <li className="flex">
                      favourite:{" "}
                      <input
                        type="text"
                        onChange={(e) => setEditFavourite(e.target.value)}
                        value={editFavourite}
                        placeholder="Enter title"
                        className="h-10 w-[70%] p-4 mx-4  rounded-xl bg-white"
                      />
                    </li>
                    <li className="flex">
                      rating:{" "}
                      <input
                        type="text"
                        onChange={(e) => setEditRating(e.target.value)}
                        value={editRating}
                        placeholder="Enter title"
                        className="h-10 w-[70%] rounded-xl p-4 mx-4  bg-white"
                      />
                    </li>
                    <li>
                      <button
                        onClick={(e) => UpdateAnime(e)}
                        className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3"
                      >
                        save
                      </button>
                      <button onClick={()=>setEditingid("")} className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3">
                        cancel
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </div>
          ))}
        </ul>
        <div className="flex justify-center gap-5 my-10">
          {page > 1 && (
            <button
              onClick={handlePreviousPage}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-3 text-white font-bold cursor-pointer rounded-full"
            >
              previous page
            </button>
          )}

          {animes.length >= 5 && (
            <button
              onClick={handleNextPage}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-3 text-white font-bold cursor-pointer rounded-full"
            >
              next page
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Anime;
