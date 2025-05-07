import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const userStatsData = [
  { month: "Jan", user: 2, provider: 1 },
  { month: "Feb", user: 2, provider: 1 },
  { month: "Mar", user: 3, provider: 2 },
  { month: "Apr", user: 3, provider: 2 },
  { month: "May", user: 4, provider: 1 },
  { month: "Jun", user: 4, provider: 3 },
  { month: "Jul", user: 4, provider: 2 },
  { month: "Aug", user: 3, provider: 2 },
  { month: "Sept", user: 3, provider: 2 },
  { month: "Oct", user: 4, provider: 1 },
  { month: "Nov", user: 4, provider: 2 },
  { month: "Dec", user: 5, provider: 2 },
];

const UsersBarChart = () => (
  <div className="bg-[#F7F7FF] p-4 rounded-xl shadow-sm mb-6">
    <h3 className="text-sub_title text-md font-semibold mb-4">Total users statistics</h3>
    <ResponsiveContainer width="100%" height={245}>
      <BarChart data={userStatsData} barSize={10}>
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

export default UsersBarChart;
