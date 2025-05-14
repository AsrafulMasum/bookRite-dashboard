import totalUsers from "../../assets/totalUsers.svg";
import totalServices from "../../assets/totalServices.svg";
import earnings from "../../assets/earnings.svg";
import UsersBarChart from "../../components/charts/UsersBarChart";
import EarningLineChart from "../../components/charts/EarningLineChart";

const Home = () => {
  const statistics = [
    {
      title: "Total Users",
      amount: "28K",
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
      amount: "88K",
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
      amount: "$457.89K",
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
        {statistics?.map((statistic) => (
          <div
            key={statistic?.title}
            className="bg-secondary rounded-lg p-[25px] flex items-center gap-4"
          >
            <div>{statistic?.icon}</div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-medium text-sub_title">
                {statistic?.title}
              </h2>
              <h3 className="text-sub_title text-3xl font-semibold">
                {statistic?.amount}
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
