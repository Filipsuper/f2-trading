import React, { useEffect, useState } from "react";
import { get_overview } from "../tools/tools";
import Chart from "./Chart";
import { useGlobal } from "../App";

export default function Overview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    get_overview(setData); // --- ERROR, data.pnl visar NaN när den är valid mummer
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const Stats_obj = ({ text, data_inp }) => {
    return (
      <div className="flex p-4 justify-center w-full">
        <div className="flex items-start flex-col w-fit">
          <h2 className=" text-xs">{text}</h2>
          <h2 className="p-2 font-bold text-xl">{data_inp}</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="border-2 p-4 rounded-md flex flex-col justify-center items-center w-2/3">
      <h1 className="border-b-2 font-bold pb-2">Overview</h1>
      <Stats_obj text={"PNL: "} data_inp={Math.round(data.pnl) + "kr"} />
      <div className="grid grid-rows-2 grid-cols-2 w-full">
        <Stats_obj
          text={"Total wins: "}
          data_inp={Math.round(data.total_win_trades)}
        />
        <Stats_obj
          text={"Total losses: "}
          data_inp={Math.round(data.total_loss_trades)}
        />
        <Stats_obj
          text={"Avg win: "}
          data_inp={Math.round(data.average_win_size) + "kr"}
        />
        <Stats_obj
          text={"Avg loss: "}
          data_inp={Math.round(data.average_loss_size) + "kr"}
        />
      </div>
    </div>
  );
}
