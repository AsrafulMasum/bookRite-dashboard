import React from "react";
import { Link } from "react-router-dom";
import animationData from "../src/assets/404.json";
import Lottie from "lottie-react";

const NotFound = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-52">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="w-[400px] h-[400px]"
          ></Lottie>
        </div>
        <Link to={"/"}>
          <button className="bg-primary text-white px-4 h-10 rounded-md">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
