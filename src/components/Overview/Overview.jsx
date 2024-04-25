import React, { useContext, useEffect, useState } from "react";
import { get_overview } from "../../tools/tools";
import Chart from "./Chart";
import { get_graph_data } from "../../tools/tools";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import Header from "../Header";

export default function Overview() {
  const { overviewData, graphData } = useContext(ApplicationContext);

  const Stats_obj = ({ text, data_inp }) => {
    return (
      <div className="flex justify-center w-full  shadow-sm rounded-md">
        <div className="flex items-start flex-col w-full ">
          <p className="p-1 text-start text-xs w-fit h-fit text-text border-b  border-bg">
            {text}
          </p>
          <p className="pb-2 font-bold text-a text-base w-full text-center p-2 ">
            {data_inp}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full rounded w-full flex flex-col justify-center items-between">
      {/* <h1 className="pb-2 mb-2 text-text">Account Performance</h1> */}
      <div className=" flex flex-col flex-grow items-center justify-center">
        <div className="bg-p rounded-md">
          <Chart data={graphData} />
        </div>
        <div className="grid grid-rows-2 grid-cols-2 w-full mt-4 border-bg bg-p rounded-md shadow-inner">
          <div className="border-b border-inherit">
            <Stats_obj
              text={"Total wins: "}
              data_inp={Math.round(overviewData.total_win_trades)}
            />
          </div>
          <div className="border-b border-l border-inherit">
            <Stats_obj
              text={"Total losses: "}
              data_inp={Math.round(overviewData.total_loss_trades)}
            />
          </div>
          <div>
            <Stats_obj
              text={"Avg win: "}
              data_inp={Math.round(overviewData.average_win_size) + "kr"}
            />
          </div>
          <div className="border-l border-inherit">
            <Stats_obj
              text={"Avg loss: "}
              data_inp={Math.round(overviewData.average_loss_size) + "kr"}
            />
          </div>
        </div>
        {/* <div className="pt-10 text-sec ">POWERED BY F2</div> */}
      </div>
    </div>
  );
}
