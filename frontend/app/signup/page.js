"use client";
import { useState } from "react";
const signUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log();
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500 m-10">
        SignUp
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="inputs flex flex-col items-center gap-6"
        >
          <input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="p-4 w-[25%] border border-black rounded-2xl"
          />
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
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
    </div>
  );
};

export default signUp;
