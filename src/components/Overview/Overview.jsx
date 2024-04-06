import React, { useContext, useEffect, useState } from "react";
import { get_overview } from "../../tools/tools";
import Chart from "./Chart";
import { get_graph_data } from "../../tools/tools";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Overview() {
  const { overviewData, graphData } = useContext(ApplicationContext);

  const Stats_obj = ({ text, data_inp }) => {
    return (
      <div className="flex justify-center w-full bg-white shadow-sm rounded-md border border-gray-100">
        <div className="flex items-start flex-col w-full ">
          <p className="p-1 text-start text-xs w-fit h-fit text-text border-b border-r  rounded-br-md border-gray-200">
            {text}
          </p>
          <p className="pb-2 font-bold text-text text-base w-full text-center p-2   ">
            {data_inp}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full rounded w-full">
      <h1 className="border-b pb-2 mb-2 text-text">Account Performance</h1>
      <div className="  flex flex-col justify-center items-center  ">
        <div className="bg-white rounded-xl shadow-sm border">
          <Chart data={graphData} />
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full mt-4 ">
          <Stats_obj
            text={"Total wins: "}
            data_inp={Math.round(overviewData.total_win_trades)}
          />
          <Stats_obj
            text={"Total losses: "}
            data_inp={Math.round(overviewData.total_loss_trades)}
          />
          <Stats_obj
            text={"Avg win: "}
            data_inp={Math.round(overviewData.average_win_size) + "kr"}
          />
          <Stats_obj
            text={"Avg loss: "}
            data_inp={Math.round(overviewData.average_loss_size) + "kr"}
          />
        </div>
        <div className="pt-10 text-gray-300 ">POWERED BY F2</div>
      </div>
    </div>
  );
}
