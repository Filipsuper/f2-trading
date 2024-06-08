import React, { useContext, useEffect, useState } from "react";
import { menu_data } from "../../data/data.js";
import Menu from "./Menu.jsx";
import { CaretUpFill, CaretDownFill, XOctagon } from "react-bootstrap-icons";
import { ApplicationContext } from "../../providers/ApplicationProvider.jsx";

export default function TradeItemClosed({ data }) {
  const { symbol, size, price, stop, target, exit, pnl, notes, setup } = data;
  const [extend, setExtend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const { refresh } = useContext(ApplicationContext);

  const ExtendItem = () => {
    return (
      <div className="w-full mt-2 text-text border-b">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="w-full md:w-1/3 dashboard-content ">
            <p className="w-full h-full p-2 outline-none resize-none rounded-xl ">
              {!notes ? "No notes..." : notes}
            </p>
          </div>

          <div className="w-full md:w-2/3 flex flex-row justify-around ">
            <div className="text-start w-fit p-2  flex flex-col">
              <div className=" w-fit p-2 flex flex-row">
                <div className="flex flex-col">
                  <h3 className="text-sm">Realised pnl</h3>
                  {pnl > 0 ? (
                    <p className=" pr-2 font-bold text-a">
                      + {Math.round(pnl)} kr
                    </p>
                  ) : (
                    <p className=" pr-2 font-bold text-red-400">
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
                  <p className="text-a pr-2 font-bold  p-2">
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
            <div className="text-start border-l border-sec border-gradient-2 w-fit p-2 flex flex-col">
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
                  <p className="text-a pr-2 font-bold  p-2">
                    {Math.round(exit[exit.length - 1] - target)} kr / stock
                  </p>
                ) : (
                  <p className="text-red-400 pr-2 font-bold  rounded-md p-1">
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
    <div className="w-full flex flex-col justify-center items-center text-text p-2 relative rounded-sm ">
      <div
        className="w-full grid grid-rows-1 grid-cols-7 gap-2 text-center center-h h-5 text-gray-500 py-2 hover:cursor-pointer"
        onClick={toggleExtend}
      >
        <h1 className="font-bold text-text uppercase">{symbol}</h1>
        <h1>{Math.round(price)}</h1>
        <h1>{Math.round(exit[exit.length - 1])}</h1>
        <div className="vertical center-h">
          <h1 className={pnl > 0 ? "win-trade" : "loss-trade"}>
            {pnl > 0 ? "win" : "loss"}
          </h1>
        </div>
        <div className="horizontal center-h center-v">
          <h1 className="text-text py-1 px-2 rounded-xl text-base font-bold w-fit">
            closed
          </h1>
        </div>
        <div className="horizontal center-h center-v">
          <h1 className="text-text py-1 px-2 rounded-xl text-base font-bold w-fit">
            {setup}
          </h1>
        </div>
        <div className="vertical center-h items-end">
          <button className="text-xl text-a" onClick={toggleExtend}>
            {extend ? <CaretUpFill /> : <CaretDownFill />}
          </button>
        </div>
      </div>
      <div className="w-full px-4 text-a ">
        {extend ? <ExtendItem /> : null}
      </div>
      {showContextMenu ? <Menu refresh={refresh} symbol={symbol} /> : null}
    </div>
  );
}
