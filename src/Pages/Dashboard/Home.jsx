import React, { useMemo } from "react";
import totalUsers from "../../assets/totalUsers.svg";
import totalServices from "../../assets/totalServices.svg";
import earnings from "../../assets/earnings.svg";
import UsersBarChart from "../../components/charts/UsersBarChart";
import EarningLineChart from "../../components/charts/EarningLineChart";
import { useStatisticsQuery } from "../../redux/features/bannerApi";

const Home = () => {
  const { data } = useStatisticsQuery();

  const statistics = [
    {
      title: "Total Users",
      amount: data?.totalUsers || "0",
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
      amount: data?.totalBookings || "0",
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
      amount: data?.totalEarnings || "0",
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
      <div className="grid grid-cols-3 gap-6 h-[120px] mb-4">
        {statistics.map(({ title, amount, icon }) => (
          <div
            key={title}
            className="bg-secondary rounded-lg p-[25px] flex items-center gap-4"
          >
            <div>{icon}</div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-medium text-sub_title">{title}</h2>
              <h3 className="text-sub_title text-3xl font-semibold">
                {amount}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <UsersBarChart />
      <EarningLineChart />
    </div>
  );
};

export default Home;
