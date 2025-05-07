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

const earningData = [
  { month: "Jan", earning: 10000 },
  { month: "Feb", earning: 8000 },
  { month: "Mar", earning: 7000 },
  { month: "Apr", earning: 7500 },
  { month: "May", earning: 10000 },
  { month: "Jun", earning: 13000 },
  { month: "Jul", earning: 18000 },
  { month: "Aug", earning: 23000 },
  { month: "Sept", earning: 26000 },
  { month: "Oct", earning: 25000 },
  { month: "Nov", earning: 22000 },
  { month: "Dec", earning: 14000 },
];

const EarningLineChart = () => (
  <div className="bg-[#F7F7FF] p-4 rounded-xl shadow-sm">
    <h3 className="text-md font-semibold mb-4">Monthly Earning</h3>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={earningData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
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
            formatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default EarningLineChart;
