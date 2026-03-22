"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();
  const [errorh, setErrorh] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser()
  }, [])
  

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
      if (!res.ok) {
        setErrorh(data);
        return
      }
      setUser(data);

    } catch (error) {
      setErrorh({ message: "something went wrong" });
    }
  };
  if (errorh.message) {
    return (
      <>
        <div className="text-red-500 text-center">{errorh.message}</div>
        <div>error page</div>
      </>
    );
  }
  const handleLogout = () => {
    const result = confirm("do you really want to loggout")
    if(result)
    {localStorage.removeItem("token");
    router.push("/login");}
    else{}
  };
  return (
   <>
    <div>
      <div className="flex justify-center h-screen items-center">
        <ul className=" flex flex-col items-center">
          <h1 className="text-5xl font-bold">Profile</h1>
          <li>
            <span className="font-bold">username</span> : {user.username}
          </li>
          <li>
            <span className="font-bold">email</span> : {user.email}
          </li>
          <button onClick={()=>{handleLogout}} className="cursor-pointer bg-red-600 px-3 py-2 rounded-full">Logout</button>
          <button onClick={()=>{router.push("/anime")}} className="cursor-pointer bg-red-600 px-3 py-2 rounded-full">back</button>
          
        </ul>
      </div>
    </div>
  </>
  );
}

export default User;

