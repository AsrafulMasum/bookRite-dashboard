import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div
      className="w-full flex items-center justify-center relative"
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#E6E6FF80",
          padding: "0 55px",
          borderRadius: 10,
          width: 800,
          height: 620,
          position: "relative",
          zIndex: 2,
        }}
        className="flex justify-center items-center"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
