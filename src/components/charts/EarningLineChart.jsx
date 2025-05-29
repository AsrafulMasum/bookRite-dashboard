import { useState, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useEarningsGraphStatisticsQuery } from "../../redux/features/bannerApi";
import { ConfigProvider, DatePicker } from "antd";

const tooltipFormatter = (value) => `$${value.toLocaleString()}`;
const labelFormatter = (value) => `$${(value / 1000).toFixed(1)}k`;

const EarningLineChart = () => {
  const [selectedYear, setSelectedYear] = useState("");

  const { data: earningsStatistics } =
    useEarningsGraphStatisticsQuery(selectedYear);
  console.log(earningsStatistics);

  return (
    <div className="bg-[#F7F7FF] p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sub_title text-lg font-semibold">
          Monthly Earning
        </h3>
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
      <ResponsiveContainer width="100%" height={238}>
        <LineChart data={earningsStatistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={tooltipFormatter} />
          <Line
            type="monotone"
            dataKey="earning"
            stroke="#8DB501"
            strokeWidth={2}
            dot={{ fill: "#222", r: 5 }}
          >
            <LabelList
              dataKey="earning"
              position="top"
              formatter={labelFormatter}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningLineChart;
