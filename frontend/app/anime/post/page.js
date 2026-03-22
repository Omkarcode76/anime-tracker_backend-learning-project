"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Post = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [watchStatus, setWatchStatus] = useState("");
  const [rating, setRating] = useState("");
  const [isFavourite, setIsFavourite] = useState("");
  const [loading, setLoading] = useState(false)
  const [errorh, setErrorh] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const token = localStorage.getItem("token");
    const body = {
      ...(title && { title }),
      ...(genre && { genre }),
      ...(watchStatus && { watchStatus }),
      ...(rating && { rating }),
      ...(isFavourite && { isFavourite }),
    };

    try {
      const res = await fetch("http://localhost:3000/anime/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }
    const data = await res.json();
    if(!res.ok){
      setErrorh(data)
      setLoading(false)
      return
    }
   
    setTitle("");
    setGenre("");
    setWatchStatus("");
    setRating("");
    setIsFavourite("");
    setLoading(false)
    alert("anime card created")
    setErrorh({})
    } catch (error) {
      setErrorh("something went wrong")
      setLoading(false)
      return
    }

    
  };
if(errorh.field === "server"){
 return(
    <>
    <div className="flex justify-center items-center h-screen gap-6">
<div className="text-red-500 text-center">{errorh.message}</div>
<button onClick={()=>setErrorh("")} className="bg-blue-500 hover:bg-blue-400 px-4 py-3 text-white font-bold cursor-pointer rounded-full">try again</button>
 </div>
    </>
  ) 
}
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
          <div className="w-[35%]">
          <input
            value={title}
            type="text"
            onChange={(e) => {
              setTitle(e.target.value)
              {errorh.field === "title" && setErrorh({})}
              }}
            placeholder="Enter Anime title"
            className="p-4 w-full border border-black rounded-2xl"
          />
          {errorh.field === "title" && (
              <div className="errorText text-sm text-red-500">
                {errorh.message}
              </div>
          )}
          </div>
          <div className="w-[35%]">
           <input
            value={genre}
            type="text"
            onChange={(e) =>{ setGenre(e.target.value)
              {errorh.field === "genre" && setErrorh({})}
            }}
            placeholder="Enter Anime genre"
            className="p-4 w-full border border-black rounded-2xl"
          />
          
          {errorh.field === "genre" && (
              <div className="errorText text-sm text-red-500">
                {errorh.message}
              </div>
          )}
          </div>
         
          <input
            value={watchStatus}
            type="text"
            onChange={(e) => setWatchStatus(e.target.value)}
            placeholder="watch status can be 'notStarted', 'ongoing', 'completed'"
            className="p-4 w-[35%] border border-black rounded-2xl"
          />
          <input
            value={rating}
            type="text"
            onChange={(e) => setRating(e.target.value)}
            placeholder="rate between 1-10"
            className="p-4 w-[35%] border border-black rounded-2xl"
          />
          <input
            value={isFavourite}
            type="text"
            onChange={(e) => setIsFavourite(e.target.value)}
            placeholder="Favourite 'yes' or 'no'"
            className="p-4 w-[35%] border border-black rounded-2xl"
          />
          <button className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-full text-white font-bold">
            Submit
          </button>
        </form>
       <Link href={'/anime'} className="flex justify-center my-4"> <button className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-full text-white font-bold">
          back
          </button>
          </Link>
      </div>
    </div>
  );
};

export default Post;
