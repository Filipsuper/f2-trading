import React, { useContext, useEffect, useState } from "react";
import { get_overview } from "../../tools/tools";
import Chart from "./Chart";
import { get_graph_data } from "../../tools/tools";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import Header from "../Header";
import PieChartComp from "./PieChartComp";
import { Cell } from "recharts";

export default function Overview() {
  const { overviewData, graphData } = useContext(ApplicationContext);
  const [pieChartData, setPieChartData] = useState([]);

  const Stats_obj = ({ text, data_inp }) => {
    return (
      <div className="flex justify-center w-full h-full shadow-sm rounded-md">
        <div className="flex items-start flex-col w-full h-full relative">
          <p className="absolute p-1 text-start text-xs w-fit h-fit text-text border-b  border-bg">
            {text}
          </p>
          <p className="h-full flex justify-center items-center pb-2 font-bold text-text text-xl w-full text-center p-2">
            {data_inp}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setPieChartData([
      [
        { name: "wins", value: overviewData.total_win_trades, fill: "#3fab8a" },
        {
          name: "losses",
          value: overviewData.total_loss_trades,
          fill: "#F87171",
        },
      ],
      [
        {
          name: "wins",
          value: Math.round(overviewData.average_win_size),
          fill: "#3fab8a",
        },
        {
          name: "losses",
          value: Math.abs(Math.round(overviewData.average_loss_size)),
          fill: "#F87171",
        },
      ],
    ]);
  }, [overviewData]);

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className=" rounded w-full flex flex-col justify-center items-between">
      {/* <h1 className="pb-2 mb-2 text-text">Account Performance</h1> */}
      <div className="flex flex-col flex-grow items-center justify-center">
        <div className="bg-p rounded-md w-full h-full md:h-52">
          <Chart data={graphData} />
        </div>
        <div className="h-48 md:h-0 flex-grow flex flex-row w-full mt-2 border-bg bg-p rounded-md ">
          <div className="border-b border-inherit w-1/2">
            <div className="w-full h-full horizontal center-h">
              <PieChartComp data={pieChartData[0]}>
                <h1 className="text-xs">Win % </h1>
                <h1 className="win-trade text-xs">
                  {Math.round(
                    (overviewData.total_win_trades /
                      (overviewData.total_win_trades +
                        overviewData.total_loss_trades)) *
                      100
                  )}
                  %
                </h1>
              </PieChartComp>
            </div>
          </div>
          <div className="border-b border-inherit w-1/2">
            <div className="w-full h-full horizontal center-h">
              <PieChartComp data={pieChartData[1]}>
                <h1 className="text-xs">Win/Loss Ratio</h1>
                <h1 className="win-trade text-xs">
                  {Math.round(
                    (overviewData.average_win_size /
                      Math.abs(overviewData.average_loss_size)) *
                      100
                  ) / 100}
                </h1>
              </PieChartComp>
            </div>
          </div>
        </div>
        <div className="h-48 flex-grow grid grid-rows-2 grid-cols-2 w-full mt-2 border-bg bg-p rounded-md ">
          <div>
            <Stats_obj
              text={"Wins: "}
              data_inp={Math.round(overviewData.total_win_trades)}
            />
          </div>
          <div className="border-l border-inherit">
            <Stats_obj
              text={"Losses: "}
              data_inp={Math.round(overviewData.total_loss_trades)}
            />
          </div>
          <div>
            <Stats_obj
              text={"Average win: "}
              data_inp={Math.round(overviewData.average_win_size) + "kr"}
            />
          </div>
          <div>
            <Stats_obj
              text={"Average loss: "}
              data_inp={Math.round(overviewData.average_loss_size) + "kr"}
            />
          </div>
        </div>
        {/* <div className="pt-10 text-sec ">POWERED BY F2</div> */}
      </div>
    </div>
  );
}
