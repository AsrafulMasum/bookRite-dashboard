import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ConfigProvider, DatePicker } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { useUserGraphStatisticsQuery } from "../../redux/features/statisticsApi";

const UsersBarChart = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const { data: userStatistics } = useUserGraphStatisticsQuery(selectedYear);

  return (
    <div className="bg-[#F7F7FF] p-4 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sub_title text-lg font-semibold">
          Total users statistics
        </h3>
        <div className="flex items-center space-x-4">
          {/* Legend */}
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-sub_title" />
              <span className="text-sub_title">User</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-primary">Service Provider</span>
            </div>
          </div>
          {/* Dropdown */}
          <div className="relative">
            <label htmlFor="year-select" className="sr-only">
              Select year
            </label>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#3536FF",
                },
              }}
            >
              <DatePicker
                className="!cursor-pointer"
                picker="year"
                suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
                onChange={(_, dateString) => {
                  setSelectedYear(dateString);
                }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={userStatistics} barSize={10}>
          <CartesianGrid vertical={false} stroke="#757575" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="user"
            fill="#757575"
            name="User"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="provider"
            fill="#3536FF"
            name="Service Provider"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersBarChart;
