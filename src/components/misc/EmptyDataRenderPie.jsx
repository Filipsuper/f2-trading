import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

export const EmptyDataRenderPie = (props) => {
  const barData = [
    { name: "No Trades", uv: 80 },
    { name: "No Trades", uv: 20 },
  ];

  return (
    <div className="w-full h-full vertical center-h center-v relative">
      <div className="absolute font-bold text-text z-10 text-xl">
        <h1>NO TRADES</h1>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={barData}
            dataKey="uv"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={30}
            strokeWidth={0}
            fill="#8884d8"
          >
            <Cell fill="#0b0c0f" />
            <Cell fill="#131419" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
