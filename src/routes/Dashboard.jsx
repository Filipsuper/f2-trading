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

export default function Dashboard() {
  const { tradesData, refresh, graphData } = useContext(ApplicationContext);
  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="h-screen flex-col md:grid md:grid-rows-4 md:grid-cols-8 p-2 gap-2 py-4">
      <div className="h-full col-start-1 col-end-3 row-span-4">
        <div className="mb-2">
          <Sidebar />
        </div>
        <div className="h-4/5 flex flex-grow">
          <TradeTable data={tradesData} inp={false} />
        </div>
      </div>
      <div className="flex flex-col h-full col-span-3 row-span-3">
        <div className="dashboard-content p-4">
          {/* <div className="bg-p  rounded-xl">
            <Chart data={graphData} />
          </div> */}
          In progress...
        </div>
      </div>
    </main>
  );
}
