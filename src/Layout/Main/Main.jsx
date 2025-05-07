import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="grid grid-cols-12">
      {/* side bar */}
      <div className="col-span-2 h-screen bg-white">
        <Sidebar />
      </div>

      {/* main container with header */}
      <div className="col-span-10">
        <div>
          <Header />
        </div>

        <div className="p-6 h-[calc(100vh-120px)]">
          <div className="h-full overflow-y-auto rounded-md pl-[30px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
