import { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { BiSolidFoodMenu } from "react-icons/bi";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DashBoard = () => {
  const user = true;
  return (
    <div className="w-full  mx-auto px-4">
      <h2 className="text-2xl font-semi-bold my-4">Hi, {user.displayName}</h2>
      <div className="stats stats-vertical w-full lg:stats-horizontal shadow">
        <div className="stat bg-green">
          <div className="stat-figure text-primary text-3xl">
            <BsCurrencyDollar />
          </div>
          <div className="stat-title text-white">Revenue</div>
          <div className="stat-value text-primary">$2400000</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat bg-twitter">
          <div className="stat-figure text-secondary text-3xl text-bold">
            <CiUser />
          </div>
          <div className="stat-title text-white">Users</div>
          <div className="stat-value text-secondary">200 Users</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat bg-purple">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-white">Orders</div>
          <div className="stat-value text-secondary">20 orders</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat bg-yellow">
          <div className="stat-figure text-secondary text-3xl text-bold">
            <BiSolidFoodMenu />
          </div>
          <div className="stat-title text-white">Menu items</div>
          <div className="stat-value">63 items</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
      {/* chats */}
      <div className="w-full">
        {/* bar chat */}
        <div className="mt-16">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* pie chat */}
        <div className="w-full">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="uv" data={data} fill="#8884d8" label />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
