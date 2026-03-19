"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const signUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorh, setErrorh] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/anime");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorh(data);
        setLoading(false);
        return;
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setErrorh("something went wrong");
      setLoading(false);
    }
  };
if(errorh.field === "server"){
  return(
    <>
<div className="text-red-500 text-center">{errorh.message}</div>
<button onClick={(e)=>{setErrorh("")}} className="bg-blue-500 hover:bg-blue-400 px-4 py-3 text-white font-bold cursor-pointer rounded-full">try again</button>
    </>
  )
}
  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500 m-10">
        SignUp
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="inputs flex flex-col items-center gap-12 "
        >
          <div className="w-[35%]">
            <input
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="p-4 w-full border border-black rounded-2xl"
            />
            {errorh.field === "username" && (
              <div className="errorText text-sm text-red-500">
                {errorh.message}
              </div>
            )}
          </div>
          <div className="w-[35%]">
            <input
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="p-4 w-full border border-black rounded-2xl"
            />
            {errorh.field === "email" && (
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
                {errorh.password}
              </div>
            )}
          </div>
          <button
            disabled={loading}
            className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-full text-white font-bold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="flex justify-center my-6">
          <Link href={"/login"} className="hover:underline">
            {" "}
            Already Signup?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signUp;
