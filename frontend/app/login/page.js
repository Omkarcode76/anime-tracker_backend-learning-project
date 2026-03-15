"use client";

import { useState, useEffect} from "react";
import {useRouter} from "next/navigation"
import Link from "next/link";

const Login = () => {
  const router = useRouter()
  useEffect(() => {
      const token = localStorage.getItem("token")
      if(token){
        router.push('/anime')
      }
    }, [])

  const [usernameORemail, setUsernameORemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
 e.preventDefault()
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        usernameORemail,
        password,
      }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setUsernameORemail("");
    setPassword("");
    router.push('/anime')
  };

  return (
    <><div>

      <h1 className="text-center text-5xl font-bold text-red-500 m-10">
        Login
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="inputs flex flex-col items-center gap-6"
          >
          <input
            value={usernameORemail}
            type="text"
            onChange={(e) => setUsernameORemail(e.target.value)}
            placeholder="Enter username or email"
            className="p-4 w-[25%] border border-black rounded-2xl"
            />
          <input
            value={password}
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="p-4 w-[25%] border border-black rounded-2xl"
            />
          <button className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-full text-white font-bold">
            Submit
          </button>
        </form>

            </div>
            <div className="flex justify-center my-6">

          <Link href={'/signup'} className="hover:underline">Haven't Signup Yet?</Link>
            </div>
      </div>
    </>
  );
};

export default Login;
