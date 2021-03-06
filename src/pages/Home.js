import React from "react";
import Login from "../components/Login";

export default function Home() {
  const background =
    "https://images.unsplash.com/photo-1565902603417-1f523e0736fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80";

  return (
    <div
      className="absolute"
      style={{
        backgroundImage: `url(${background})`,
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-screen">
        <div className="my-auto w-full">
          <h1 className="font-bold text-center text-3xl">
            <span role="img" aria-label="trophy">
              🏆
            </span>
            Make Me Awesome
            <span role="img" aria-label="trophy">
              🏆
            </span>
          </h1>
          <Login />
        </div>
      </div>
    </div>
  );
}
