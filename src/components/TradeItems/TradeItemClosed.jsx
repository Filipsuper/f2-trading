import React, { useContext, useEffect, useState } from "react";
import { menu_data } from "../../data/data.js";
import Menu from "./Menu.jsx";
import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";
import { ApplicationContext } from "../../providers/ApplicationProvider.jsx";

export default function TradeItemClosed({ data }) {
  const { symbol, size, price, stop, target, exit, pnl, notes } = data;
  const [extend, setExtend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const { refresh } = useContext(ApplicationContext);

  const ExtendItem = () => {
    return (
      <div className="w-full border-t mt-2 pt-2 text-text ">
        <div className="flex flex-row justify-between mb-4">
          <div className="w-1/3 dashboard-content">
            <p className="w-full h-full p-2 outline-none resize-none rounded-xl bg-white">
              {!notes ? "No notes..." : notes}
            </p>
          </div>

          <div className="w-2/3 flex flex-row justify-around">
            <div className="text-start w-fit p-2  flex flex-col">
              <div className=" w-fit p-2 flex flex-row">
                <div className="flex flex-col">
                  <h3 className="text-sm">Realised pnl</h3>
                  {pnl > 0 ? (
                    <p className=" pr-2 font-bold text-green-400">
                      + {Math.round(pnl)} kr
                    </p>
                  ) : (
                    <p className=" pr-2 font-bold text-green-red">
                      {Math.round(pnl)} kr
                    </p>
                  )}
                </div>
              </div>
              <div className="w-fit p-2 flex flex-col">
                <h3 className="text-sm">Targeted pnl</h3>
                {/* FIXA SÅ ATT STOPLOSS TARGETED VISAS NÄR DEN ÄR MINUS */}
                <p className="pr-2 font-bold">
                  + {Math.round((pnl / (exit[0] - price)) * (target - price))}{" "}
                  kr
                </p>
              </div>
              <div className="w-fit p-2 flex flex-col">
                <div className="w-full">
                  <h3>Diff</h3>
                </div>
                {exit[0] - target > 0 ? (
                  <p className="text-green-400 pr-2 font-bold bg-background-900 p-2">
                    {Math.round((exit[0] - target) * (pnl / (exit[0] - price)))}{" "}
                    kr
                  </p>
                ) : (
                  <p className="text-red-400 pr-2 font-bold bg-background-900 rounded-md p-1">
                    {Math.round((exit[0] - target) * (pnl / (exit[0] - price)))}{" "}
                    kr
                  </p>
                )}
              </div>
            </div>
            <div className="text-start border-l-2 w-fit p-2 flex flex-col">
              <div className="w-fit p-2 flex flex-col">
                <h3 className="text-sm">Actual Exit</h3>
                <p className="pr-2 font-bold">
                  {Math.round(exit[exit.length - 1])} kr
                </p>
              </div>
              <div className=" w-fit p-2 flex flex-col">
                <h3 className=" text-sm">Take profit level</h3>
                <p className=" pr-2 font-bold">{Math.round(target)} kr</p>
              </div>
              <div className="w-fit p-2 flex flex-col">
                <div className="w-full">
                  <h3>Diff</h3>
                </div>
                {exit[exit.length - 1] - target > 0 ? (
                  <p className="text-green-400 pr-2 font-bold bg-background-900 p-2">
                    {Math.round(exit[exit.length - 1] - target)} kr / stock
                  </p>
                ) : (
                  <p className="text-red-400 pr-2 font-bold bg-background-900 rounded-md p-1">
                    {Math.round(exit[exit.length - 1] - target)} kr / stock
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleExtend = () => {
    setExtend(extend ? false : true);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-2 bg-gray-50  border border-background-800  rounded-md text-text p-2 relative">
      <div
        className="w-full grid grid-rows-1 grid-cols-6 gap-2 text-center center-h h-6 text-gray-700 hover:cursor-pointer"
        onClick={toggleExtend}
      >
        <h1 className="font-bold text-gray-800 uppercase">{symbol}</h1>
        <h1>{Math.round(price)}</h1>
        <h1>{Math.round(exit[exit.length - 1])}</h1>
        <div className="vertical center-h">
          <h1 className={pnl > 0 ? "win-trade" : "loss-trade"}>
            {pnl > 0 ? "win" : "loss"}
          </h1>
        </div>
        <div className="vertical center-h">
          {
            <h1 className="bg-gray-100 text-gray-500 border font-bold text-sm p-1 rounded-md w-fit ">
              closed
            </h1>
          }
        </div>
        <div className="vertical center-h items-end">
          <button className="text-xl text-gray-600" onClick={toggleExtend}>
            {extend ? <CaretUpFill /> : <CaretDownFill />}
          </button>
        </div>
      </div>
      <div className="w-full px-4">{extend ? <ExtendItem /> : null}</div>
      {showContextMenu ? <Menu refresh={refresh} symbol={symbol} /> : null}
    </div>
  );
}
