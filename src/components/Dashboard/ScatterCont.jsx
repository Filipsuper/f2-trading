import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ScatterCont({ trade }) {
  const [chartData, setChartData] = useState([]);

  const get_exit_mean = (exit_data) => {
    let exit_arr = [];
    exit_arr = exit_data.map((elem) => {
      const { price } = elem;
      return price;
    });
    let sum = 0;
    let idx = 0;
    exit_arr.forEach((elem, i) => {
      sum += elem;
      idx = 1 + i;
    });
    return sum / idx;
  };

  useEffect(() => {
    const transformedData = trade.exit.map((exit) => ({
      tradeId: trade.trade_id,
      symbol: trade.symbol,
      entryPrice: trade.price,
      exitPrice: exit.price,
      pnl: exit.pnl,
      entryDate: new Date(trade.date).toLocaleDateString(),
      exitDate: new Date(exit.date).toLocaleDateString(),
    }));

    setChartData(transformedData);
  }, []);

  const CostumizedLabel = (props) => {
    console.log(props);
    const { x, y, offset, index, value } = props;

    const cx = x - 15;
    const cy = y + 15;
    return (
      <text dx={cx} dy={cy} fill="#444e63" fontSize={11} fontWeight={400}>
        {Math.round(chartData[index].pnl)} kr
      </text>
    );
  };

  return (
    <div className="h-5/6 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart margin={{ left: -20 }} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            fontSize={12}
            padding={{ top: 20, left: 20, right: 20, bottom: 20 }}
          />
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            fontSize={12}
            padding={{ top: 20, left: 20, right: 20, bottom: 20 }}
          />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Line
            type="step"
            dataKey="entryPrice"
            stroke="#3fab8a"
            strokeWidth={2}
          />
          <Line
            label={<CostumizedLabel />}
            type="step"
            dataKey="exitPrice"
            stroke="red"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
