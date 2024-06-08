import { Tooltip } from "chart.js";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Chart({ data, type }) {
  const canvasRef = useRef();
  const [pnl, setPnl] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { tradesData } = useContext(ApplicationContext);

  useEffect(() => {
    console.log(data);
    let pnl_mutable = 0;
    let pnl_arr = [];
    let index_arr = [];

    if (data == undefined) return;

    data.map((elem, idx) => {
      pnl_mutable += elem.pnl;
      pnl_arr.push({ name: idx, price: pnl_mutable });
      index_arr.push(idx);
    });
    // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

    setPnl(Math.round(pnl_mutable));

    setChartData(pnl_arr);

    // if (data["pnl"] != undefined) setPnl(data["y"][data["y"].length - 1]);
  }, [data]);

  return (
    <div className="w-full h-60 md:h-full vertical center-h p-4">
      <div className="w-full flex flex-row justify-between mb-2">
        <h1 className="text-text ">Equity</h1>
        <div className="flex flex-row gap-2">
          <h2 className="text-text font-bold ">{pnl} kr</h2>
          <h2
            className={
              "horizontal center-h text-xs " +
              (pnl > 0 ? "win-trade" : "loss-trade")
            }
          >
            {(pnl > 0 ? "+ " : null) + Math.round((pnl / 10000) * 100)}%
          </h2>
        </div>
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: -10, left: -10 }}
          >
            <CartesianGrid stroke="#d1d4e2" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3fab8a"
              strokeWidth="2px"
              dot={false}
            />
            <XAxis dataKey="name" stroke="#d1d4e2" />
            <YAxis stroke="#d1d4e2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
