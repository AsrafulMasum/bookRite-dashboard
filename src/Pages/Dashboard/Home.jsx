import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import totalUsers from "../../assets/totalUsers.svg";
import totalServices from "../../assets/totalServices.svg";
import earnings from "../../assets/earnings.svg";

const Home = () => {
  const statistics = [
    {
      title: "Total Users",
      amount: 28,
      icon: (
        <img
          className="bg-primary p-[15px] rounded-full"
          src={totalUsers}
          alt="total users icon"
        />
      ),
    },
    {
      title: "Total Services",
      amount: 88,
      icon: (
        <img
          className="bg-primary p-[15px] rounded-full"
          src={totalServices}
          alt="total Services icon"
        />
      ),
    },
    {
      title: "Earnings",
      amount: 457.89,
      icon: (
        <img
          className="bg-primary p-[15px] rounded-full"
          src={earnings}
          alt="earnings icon"
        />
      ),
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 h-[120px]">
        {statistics?.map((statistic) => (
          <div
            key={statistic?.title}
            className="bg-secondary rounded-lg p-[25px] flex items-center gap-4"
          >
            <div>{statistic?.icon}</div>
            <div className="flex flex-col gap-3">
              <h2 className="text-center text-2xl ">{statistic?.title}</h2>
              <h3 className="text-center text-primary text-[32px] font-semibold">
                $10
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
