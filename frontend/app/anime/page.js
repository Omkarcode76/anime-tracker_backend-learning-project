"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Anime = () => {
  const router = useRouter();
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editWatchStatus, setEditWatchStatus] = useState("");
  const [editFavourite, setEditFavourite] = useState("");
  const [editRating, setEditRating] = useState("");
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("")
  const [page, setPage] = useState(1);
  const [favourite, setFavourite] = useState("");
  const [watchStatus, setWatchStatus] = useState("");
  const [editingid, setEditingid] = useState("");
  const [loading, setLoading] = useState(false)
  const [errorh, setErrorh] = useState({})

  useEffect(() => {
    getAnimes();
  }, [search, page, favourite, watchStatus]);

  const getAnimes = async () => {
    
  setLoading(true)
    const params = new URLSearchParams({
      search: search,
      page: page,
      favourite: favourite,
      watchStatus: watchStatus,
    });
    try {
      const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/anime?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    setAnimes(data);
    setLoading(false)
    } catch (error) {
      setErrorh({message : "something went wrong"})
      setLoading(false)
      return
    }
   
  };

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };
  const handlePreviousPage = () => {
    setPage(prev => prev - 1);
  };

  const Edit = (item) => {
    
    setEditingid(item._id);
    setEditTitle(item.title);
    setEditGenre(item.genre);
    setEditWatchStatus(item.watchStatus);
    setEditFavourite(item.isFavourite);
    setEditRating(item.rating);
  };

  const UpdateAnime = async () => {
    
    const result = confirm("press OK to save")
    if(result){
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
    const data = await res.json();

    if(!res.ok){
      setAnimes(data.message)
      
      return
    }
    console.log(data);
    setAnimes(prev => prev.map(a=>
      a._id === editingid ?{
        ...a,
        titile: editTitle,
        genre : editGenre,
        watchStatus: editWatchStatus,
        isFavourite : editFavourite,
        rating : editRating
      }
      :
        a
      
    ))
    setEditingid("");
    
  }
  else{}

  };
  const DeleteAnime = async (item) => {
    const result = confirm(`press OK to delete ${item.title} anime`)
    if(result){
      
    const Deleteid = item._id;
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/anime/${Deleteid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json()
    if(!res.ok){
      setErrorh(data.message)
      
      return
    }
    setAnimes(prev=>prev.filter(a=> a._id !== Deleteid))
   
  }
  else{}
      

  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  
 if(loading){
   return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
    </div>
  );
 }
 if(errorh.field === "server"){
  return(
    <>
<div className="text-red-500 text-center">{errorh.message}</div>
<button onClick={(e)=>{setErrorh("")}} className="bg-blue-500 hover:bg-blue-400 px-4 py-3 text-white font-bold cursor-pointer rounded-full">try again</button>
    </>
  )
}
  return (
    <>
      <div className="">
        <div className="flex m-15 justify-around">
          <form onSubmit={(e)=>{e.preventDefault() 
            setSearch(inputSearch)}}>
          <input
            type="text"
            placeholder="Search animes by title or genre ..."
            value={inputSearch}
            onChange={(e) =>  setInputSearch(e.target.value)}
            className="h-20 bg-white w-[60vw] rounded-full p-4"
          />
         
        </form>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-full px-4 cursor-pointer hover:bg-red-400 text-lg font-bold "
          >
            Logout
          </button>
        </div>
   
          <div>
            <div className="flex m-10 gap-16">
            <ul className=" flex gap items-center gap-5">
              <span className="text-blue-500 font-bold text-center text-2xl">
                Filter:{" "}
              </span>
              <li
                onClick={() => {
                  setWatchStatus("");
                  setFavourite("");
                  setSearch("");
                  setInputSearch("")
                }}
                className={`hover:text-white cursor-pointer rounded-full ${!watchStatus && !favourite && "bg-green-500 text-white"} hover:bg-green-500 hover:rounded-full px-4 py-2 font-bold  text-lg`}
              >
                All
              </li>
              <li
                onClick={() => setWatchStatus("completed")}
                className={`hover:text-white cursor-pointer rounded-full ${watchStatus === "completed" && "bg-green-500 text-white"} hover:bg-green-500 hover:rounded-full px-4 py-2 font-bold  text-lg`}
              >
                Completed
              </li>
              <li
                onClick={() => setWatchStatus("ongoing")}
                className={`hover:text-white cursor-pointer rounded-full ${watchStatus === "ongoing" && "bg-green-500 text-white"} hover:bg-green-500 hover:rounded-full px-4 py-2 font-bold  text-lg`}
              >
                on going
              </li>
              <li
                onClick={() => setWatchStatus("notStarted")}
                className={`hover:text-white cursor-pointer rounded-full ${watchStatus === "notStarted" && "bg-green-500 text-white"} hover:bg-green-500 hover:rounded-full px-4 py-2 font-bold  text-lg`}
              >
                not started
              </li>
              <li
                onClick={() => setFavourite("yes")}
                className={`hover:text-white cursor-pointer rounded-full ${favourite === "yes" && "bg-green-500 text-white"} hover:bg-green-500 hover:rounded-full px-4 py-2 font-bold  text-lg`}
              >
                favourite
              </li>
            </ul>
            <Link href={'/anime/post'}><button className="bg-red-500  text-white rounded-full px-4 py-3 cursor-pointer hover:bg-red-400 text-lg font-bold">Add Anime</button></Link>
</div>
          </div>
         {animes.length !== 0 ? ( <div>
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
                        <button
                          onClick={() => DeleteAnime(a)}
                          className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3"
                        >
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
                          onClick={(e) => UpdateAnime()}
                          className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3"
                        >
                          save
                        </button>
                        <button
                          onClick={() => setEditingid("")}
                          className="bg-green-700 text-white text-lg px-3 py-1 rounded-full cursor-pointer hover:bg-green-500 mr-3"
                        >
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
          </div>)
       
        :(
          <div className="text-5xl font-bold flex justify-center items-center h-[50vh]">
            <Link href={'/anime/post'} className="hover:underline">no anime found! click to add</Link>
          </div>
        )}
        
  
      </div>
    </>
  );
};

export default Anime;
