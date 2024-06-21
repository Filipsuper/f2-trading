import { Tooltip } from "chart.js";
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, PolarGrid } from "recharts";

export default function PieChartComp(props) {
  const { data } = props;

  return (
    <div className="w-full h-full relative">
      <div className="absolute text-text w-full flex flex-row justify-between p-4 z-10">
        {props.children}
      </div>
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={30}
              innerRadius={20}
              fill="#8884d8"
              paddingAngle={5}
              stroke={false}
              fontSize="10px"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
