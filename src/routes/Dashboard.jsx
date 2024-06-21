import {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  useCallback,
} from "react";
import Sidebar from "../components/Sidebar";
import TradeTable from "../components/TradeTable";
import { get_trades } from "../tools/tools";
import { ApplicationContext } from "../providers/ApplicationProvider";
import Overview from "../components/Overview/Overview";
import Chart from "../components/Overview/Chart";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import { Tooltip } from "recharts";
import Setups from "../components/Dashboard/Setups";
import ScatterCont from "../components/Dashboard/ScatterCont";

export default function Dashboard() {
  const { tradesData, refresh, graphData, overviewData, user } =
    useContext(ApplicationContext);

  useEffect(() => {
    refresh();
  }, []);

  const Stats_obj = ({ text, data_inp }) => {
    return (
      <div className="flex justify-center w-full h-full shadow-sm rounded-md bg-p ">
        <div className="flex items-start flex-col w-full h-full relative">
          <p className="absolute p-1 text-start text-xs w-fit h-fit text-text border-b  ">
            {text}
          </p>
          <p className="h-24 md:h-full flex justify-center items-center pb-2 font-bold text-text text-base lg:text-3xl w-full text-center p-2">
            {data_inp}
          </p>
        </div>
      </div>
    );
  };

  const Stats = () => {
    return (
      <div className="h-full grid grid-rows-2 grid-cols-2 w-full  rounded-md gap-2">
        <div className="dashboard-cont">
          <Stats_obj
            text={"Total wins: "}
            data_inp={Math.round(overviewData.total_win_trades)}
          />
        </div>
        <div className=" dashboard-cont">
          <Stats_obj
            text={"Total losses: "}
            data_inp={Math.round(overviewData.total_loss_trades)}
          />
        </div>
        <div className="dashboard-cont">
          <Stats_obj
            text={"Avg win: "}
            data_inp={Math.round(overviewData.average_win_size) + "kr"}
          />
        </div>
        <div className="dashboard-cont">
          <Stats_obj
            text={"Avg loss: "}
            data_inp={Math.round(overviewData.average_loss_size) + "kr"}
          />
        </div>
      </div>
    );
  };

  const BigDisplay = (props) => {
    return (
      <div className="py-8 md:h-full w-full flex flex-col justify-center items-center md:p-4">
        <div className="relative">
          <div className="flex flex-row w-full justify-between uppercase absolute -top-5">
            <p>{props.title}</p>
            {props.add != "" ? (
              <div className="win-trade">{props.add}</div>
            ) : null}
          </div>

          <div className="text-3xl font-bold">{props.children}</div>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (graphData[label] == undefined) return;
    const { pnl, symbol, price, quantity } = graphData[label];

    if (active && payload && payload.length) {
      return (
        <div className="bg-p p-2 container-style">
          <p className="font-bold">{`Equity : ${payload[0].value} kr`}</p>
          <div className="border p-2 rounded-md">
            <div className="flex flex-row justify-between">
              <p className="mr-1">{`${symbol}`}</p>
              <p className={pnl > 0 ? "win-trade" : "loss-trade"}>
                {`${Math.round(pnl)}`} kr
                <span>{}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <main className="flex flex-col md:h-screen bg-bg height-screen text-text p-2 dark:dark">
      <div className="h-full flex flex-col md:flex-row ">
        <div className="md:w-44 md:flex flex-col justify-between h-full mb-4">
          <Navbar active={"dashboard"} />
        </div>
        <div className="h-[91vh] flex  flex-col w-full ">
          <Header />
          <div className="flex flex-col h-full md:grid md:grid-cols-10 md:grid-rows-3 gap-2">
            <div className="h-full flex flex-col col-span-4 row-span-1 dashboard-cont bg-p">
              <Chart data={graphData}>
                <Tooltip content={<CustomTooltip />} />
              </Chart>
            </div>
            <div className="h-full gap-2 flex flex-col col-span-2 row-span-1 ">
              <div className="dashboard-cont mb-0 bg-p">
                <BigDisplay
                  title={"PNL"}
                  add={Math.round((overviewData.pnl / 10000) * 1000) / 10 + "%"}
                >
                  <h1 className="font-bold text-4xl">
                    {Math.round(overviewData.pnl)} kr
                  </h1>
                </BigDisplay>
              </div>
              <div className="dashboard-cont w-full bg-p">
                <BigDisplay title={"Trades"} add={""}>
                  <h1 className="font-bold text-4xl">
                    {Math.round(overviewData.total_trades)}
                  </h1>
                </BigDisplay>
              </div>
            </div>
            <div className="h-full flex flex-col col-span-4 row-span-1 ">
              <Stats />
            </div>
            <div className="h-full flex row-start-1 row-end-4 col-start-7 col-end-11 bg-p rounded-md dashboard-cont">
              <TradeTable inp={false} />
            </div>
            <div className="h-full flex flex-col col-span-2 row-span-1 bg-p dashboard-cont">
              <Setups data={tradesData} />
            </div>
            {/* <div className="h-full flex flex-col col-span-2 row-span-1 bg-p dashboard-cont">
              <ScatterCont data={tradesData} />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
