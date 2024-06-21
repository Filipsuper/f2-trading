import React from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

export const EmptyDataRender = () => {
  const barColors = ["#0b0c0f", "#131419", "#0b0c0f", "#131419"];
  const barData = [
    { name: "No data", uv: 4 },
    { name: "No data", uv: 2 },
    { name: "No data", uv: 3 },
    { name: "No data", uv: 2 },
  ];

  return (
    <div className="w-full h-full vertical center-h center-v relative">
      <div className="absolute font-bold text-text z-10 text-xl">
        <h1>NO TRADES</h1>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          // make bar change hues
          <Bar dataKey="uv" fill="#8884d8">
            {barData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
