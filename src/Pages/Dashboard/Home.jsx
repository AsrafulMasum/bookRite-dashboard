import React from "react";
import { FaUserGroup } from "react-icons/fa6";

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-6 h-[120px]">
        <div className="bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center ">
              <FaUserGroup color="#007BA5" className="" size={24} />
            </div>
            <h2 className="text-center text-2xl text-base ">Total User</h2>
          </div>
          <h3 className="text-center text-primary text-[32px] font-semibold">
            $10
          </h3>
        </div>

        <div className="bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center ">
              <FaUserGroup color="#007BA5" className="" size={24} />
            </div>
            <h2 className="text-center text-2xl text-base ">
              Total Subscriber
            </h2>
          </div>
          <h3 className="text-center text-primary text-[32px] font-semibold">
            $10
          </h3>
        </div>

        <div className="bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center ">
              <FaUserGroup color="#007BA5" className="" size={24} />
            </div>
            <h2 className="text-center text-2xl text-base ">Total Revenue</h2>
          </div>
          <h3 className="text-center text-primary text-[32px] font-semibold">
            $10
          </h3>
        </div>

        <div className="bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center ">
              <FaUserGroup color="#007BA5" className="" size={24} />
            </div>
            <h2 className="text-center text-2xl text-base ">Total Income</h2>
          </div>
          <h3 className="text-center text-primary text-[32px] font-semibold">
            $10
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
