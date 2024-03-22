import "./App.css";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import TradeItem from "./components/TradeItem";
import TradeInput from "./components/TradeInput";
import Overview from "./components/Overview";
import { get_prices, get_trades } from "./tools/tools";
import TradeItemClosed from "./components/TradeItemClosed";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "UTV",
    },
  },
};

const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);

function App() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [stockPrices, setStockPrices] = useState([]);

  useEffect(() => {
    get_trades(setData);
  }, [refresh]);

  return (
    <div className="App flex flex-row p-6">
      <GlobalContext.Provider value={{ refresh, setRefresh }}>
        <div className="w-1/2 h-full flex flex-col items-center">
          <div className="flex w-5/6 "></div>
          <ul className="h-full w-5/6">
            <div className="w-full p-2 flex justify-start mb-4 font-bold">
              <h1>Positions </h1>
            </div>
            <div className="w-full border-b justify-around text-md horizontal mb-2 p-2">
              <h1>Symbol</h1>
              <h1>Entry</h1>
              <h1>Exit / Target</h1>
              <h1>Status</h1>
              <h1>Settings</h1>
            </div>
            {data
              .sort((a, b) => a.closed - b.closed) //sorts the array so closed trades are shown last
              .map((item, idx) => {
                if (!item.closed) return <TradeItem data={item} key={idx} />;
                else return <TradeItemClosed data={item} key={idx} />;
              })}
          </ul>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-start">
          <TradeInput />
          <Overview />
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
