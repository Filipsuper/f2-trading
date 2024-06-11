import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Setups(props) {
  const { data } = props;
  const [guiData, setGuiData] = useState([]);
  const [maxValue, setMaxValue] = useState();

  const parse_setup = (data) => {
    let arr = data.map((elem) => {
      if (elem.pnl != undefined) return { setup: elem.setup, pnl: elem.pnl };
    });

    arr = arr.filter((elem) => elem != undefined);

    let new_arr = [];

    arr.forEach((elem, idx) => {
      if (new_arr.length == 0) new_arr.push({ name: elem.setup });
      let exist = false;

      //CHECK DUPLICATE
      new_arr.forEach((elem2) => {
        if (elem2.name == elem.setup) exist = true;
      });

      if (exist == false) {
        new_arr.push({ name: elem.setup, pnl: elem.pnl });
      } else {
        new_arr.map((elem2) => {
          if (elem2.name != elem.setup) return;
          if (elem2.pnl == undefined) {
            elem2.pnl = Math.round(elem.pnl);
          } else {
            elem2.pnl = Math.round(elem2.pnl) + Math.round(elem.pnl);
          }
        });
      }
    });

    return new_arr;
  };

  useEffect(() => {
    let arr = parse_setup(data);

    setGuiData(arr);
    let val = 0;
    arr.forEach((elem) => {
      val += elem.pnl;
    });
    setMaxValue(val);
  }, [data]);

  const CostumizedLabel = (props) => {
    const { x, y, offset, width, height, value } = props;

    const cx = x + width / 2 + offset;
    const cy = y + height / 2 + offset;

    return (
      <text dx={cx} dy={cy} fill="#444e63">
        {value} kr
      </text>
    );
  };

  return (
    <div className="h-48 md:h-full w-full rounded-md gap-2 p-2">
      <header className="h-fit">Setups</header>
      <div className="h-full w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={guiData}
            margin={{
              top: 20,
              right: 20,
              bottom: 40,
              left: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="3" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#eff0f5" stopOpacity={1} />
                <stop offset="100%" stopColor="#3fab8a" stopOpacity={1} />
              </linearGradient>
            </defs>
            {/* <CartesianGrid stroke="#d1d4e2" strokeDasharray="5 5" /> */}
            <YAxis
              stroke="#444e63"
              dataKey="name"
              type="category"
              scale="auto"
              tick={{ fontSize: 10 }}
            />
            <XAxis stroke="#d1d4e2" hide type="number" domain={[0, maxValue]} />
            <Bar
              dataKey="pnl"
              fill="url(#colorUv)"
              barSize={30}
              label={<CostumizedLabel />}
              tickFormatter={(v) => v + "kr"}
              radius={[0, 3, 3, 0]}
              background={{ fill: "#E0EBEE" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
