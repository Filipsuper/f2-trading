import React, { useEffect, useState } from "react";
import { menu_data } from "../data/data.js";
import Menu from "./Menu.jsx";

export default function TradeItemClosed({ data, refresh }) {
  const { symbol, size, price, stop, target, exit, pnl } = data;
  const [extend, setExtend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const ExtendItem = () => {
    return (
      <div className="w-full border-t-[1px] mt-2 pt-2">
        <div className="flex flex-row justify-around mb-4">
          <div className="text-start w-fit p-2 flex flex-col">
            <div className=" w-fit p-2 flex flex-col">
              <h3 className="text-sm">Realised pnl</h3>
              {pnl > 0 ? (
                <p className=" pr-2 font-bold text-green-400">
                  + {Math.round(pnl)} kr
                </p>
              ) : (
                <p className=" pr-2 font-bold text-green-red">
                  - {Math.round(pnl)}
                </p>
              )}
            </div>
            <div className="w-fit p-2 flex flex-col">
              <h3 className="text-sm">Targeted pnl</h3>
              <p className="pr-2 font-bold">
                + {Math.round((pnl / (exit - price)) * (target - price))} kr
              </p>
            </div>
            <div className="w-fit p-2 flex flex-col">
              <div className="w-full">
                <h3>Diff</h3>
              </div>
              {exit - target > 0 ? (
                <p className="text-green-400 pr-2 font-bold bg-gray-200 p-2">
                  {Math.round((exit - target) * (pnl / (exit - price)))}
                </p>
              ) : (
                <p className="text-red-400 pr-2 font-bold bg-gray-100 rounded-md p-1">
                  {Math.round((exit - target) * (pnl / (exit - price)))} kr
                </p>
              )}
            </div>
          </div>
          <div className="text-start border-l-2 w-fit p-2 flex flex-col">
            <div className="w-fit p-2 flex flex-col">
              <h3 className="text-sm">Actual Exit</h3>
              <p className="pr-2 font-bold">{Math.round(exit)} kr</p>
            </div>
            <div className=" w-fit p-2 flex flex-col">
              <h3 className=" text-sm">Take profit level</h3>
              <p className=" pr-2 font-bold">{Math.round(target)} kr</p>
            </div>
            <div className="w-fit p-2 flex flex-col">
              <div className="w-full">
                <h3>Diff</h3>
              </div>
              {exit - target > 0 ? (
                <p className="text-green-400 pr-2 font-bold bg-gray-200 p-2">
                  {Math.round(exit - target)} kr / stock
                </p>
              ) : (
                <p className="text-red-400 pr-2 font-bold bg-gray-100 rounded-md p-1">
                  {Math.round(exit - target)} kr / stock
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mb-2 bg-neutral-50 border-2 rounded-md text-slate-800 p-2 relative">
      <div className="w-full h-full flex justify-around items-center">
        <h1 className="font-bold text-red-400">{symbol}</h1>

        <h1>{Math.round(price)}</h1>
        <h1>{Math.round(exit)}</h1>
        <h1 className="bg-gray-300 text-gray-500 font-bold text-sm p-1 rounded-md">
          closed
        </h1>
        <button
          className="bg-green-300"
          onClick={() => setExtend(extend ? false : true)}
        ></button>
      </div>
      <div className="w-full px-4">{extend ? <ExtendItem /> : null}</div>
      {showContextMenu ? <Menu refresh={refresh} symbol={symbol} /> : null}
    </div>
  );
}
