import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";


const CustomBarChart = ({ data }) => {
  const getXAxisKey = () => {
    if (data && data.length > 0) {
      if (data[0].hasOwnProperty("category")) return "category";
      if (data[0].hasOwnProperty("month")) return "month";
      if (data[0].hasOwnProperty("source")) return "source";
    }
    return "category"; // fallback
  };

  const xAxisKey = getXAxisKey();

  const tip = () => {
    if (data && data.length > 0) {
      if (data[0].hasOwnProperty("category")) return "category";
      if (data[0].hasOwnProperty("source")) return "source";
      if (data[0].hasOwnProperty("month")) return "month";
    }
    return "category"; // fallback
  };

  const Tip = tip();

  // Function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300 ">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0]?.payload?.[Tip]}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ₹{payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="" />

          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
            className="bg-white mt-6 [&_.recharts-bar-rectangle]:transition-all [&_.recharts-bar-rectangle]:duration-200 [&_.recharts-bar-rectangle:hover]:fill-purple-500 [&_.recharts-bar-rectangle:hover]:stroke-purple-600 [&_.recharts-bar-rectangle:hover]:stroke-2 [&_.recharts-bar-rectangle:hover]:opacity-80 [&_.recharts-bar-rectangle:hover]:cursor-pointer"
            // className="[&_.recharts-bar-rectangle]:transition-all [&_.recharts-bar-rectangle]:duration-300 [&_.recharts-bar-rectangle]:ease-out [&_.recharts-bar-rectangle]:transform [&_.recharts-bar-rectangle:hover]:fill-purple-500 [&_.recharts-bar-rectangle:hover]:stroke-purple-600 [&_.recharts-bar-rectangle:hover]:stroke-2 [&_.recharts-bar-rectangle:hover]:opacity-90 [&_.recharts-bar-rectangle:hover]:cursor-pointer [&_.recharts-bar-rectangle:hover]:scale-105 [&_.recharts-bar-rectangle:hover]:shadow-lg"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
