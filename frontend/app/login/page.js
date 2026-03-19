"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [errorh, setErrorh] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/anime");
    }
  }, []);

  const [usernameORemail, setUsernameORemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

      if (!res.ok) {
        setErrorh(data);
        return;
      }
      localStorage.setItem("token", data.token);
      setUsernameORemail("");
      setPassword("");
      router.push("/anime");
    } catch (error) {
      setErrorh("something went wrong");
    }
  };
  if (errorh.field === "server") {
    return (
      <>
        <div className="text-red-500 text-center">{errorh.message}</div>
        <button
          onClick={() => setErrorh("")}
          className="bg-blue-500 hover:bg-blue-400 px-4 py-3 text-white font-bold cursor-pointer rounded-full"
        >
          try again
        </button>
      </>
    );
  }
  return (
    <>
      <div>
        <h1 className="text-center text-5xl font-bold text-red-500 m-10">
          Login
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="inputs flex flex-col items-center gap-12"
          >
            <div className="w-[35%]">
              <input
                value={usernameORemail}
                type="text"
                onChange={(e) => setUsernameORemail(e.target.value)}
                placeholder="Enter username or email"
                className="p-4 w-full border border-black rounded-2xl"
              />
              {errorh.field === "usernameORemail" && (
                <div className="errorText text-sm text-red-500">
                  {errorh.message}
                </div>
              )}
            </div>
            <div className="w-[35%]">
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="p-4 w-full border border-black rounded-2xl"
              />
              {errorh.field === "password" && (
                <div className="errorText text-sm text-red-500">
                  {errorh.message}
                </div>
              )}
            </div>
            <button className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-full text-white font-bold">
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center my-6">
          <Link href={"/signup"} className="hover:underline">
            Haven't Signup Yet?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
