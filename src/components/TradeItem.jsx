import React, { useEffect, useState } from "react";
import { menu_data } from "../data/data.js";
import Menu from "./Menu.jsx";
import ContextMenu from "./ContextMenu.jsx";

export default function TradeItem({ data, refresh, live_prices }) {
  const { symbol, size, price, stop, target } = data;
  const [extend, setExtend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [potential_trade, setPotentialTrade] = useState({ loss: 0, win: 1 });

  const calculate_potential = (ent, sz, stp, tgt) => {
    let qty = sz / ent;
    let pot_win = (tgt - ent) * qty;
    let pot_loss = (ent - stp) * qty;

    let calculated = { win: Math.round(pot_win), loss: Math.round(pot_loss) };

    return calculated;
  };

  useEffect(() => {
    setPotentialTrade({
      loss: calculate_potential(price, size, stop, target).loss,
      win: calculate_potential(price, size, stop, target).win,
    });
  }, [data]);

  const ExtendItem = () => {
    return (
      <div className="w-full border-t-[1px] mt-2 pt-2">
        <div className="flex flex-row justify-around mb-4">
          <div className="text-start w-fit p-2 flex flex-col">
            <h1 className="font-bold">Realtime</h1>
            <div className=" w-fit p-2 flex flex-col">
              <h3 className="text-start text-sm"></h3>
              <p className=" pr-2 font-bold text-black-300">000 kr</p>
            </div>
            <div className=" w-fit p-2 flex flex-col">
              <h3 className="text-start text-sm">Pnl</h3>
              <p className=" pr-2 font-bold text-black-300">000 kr</p>
            </div>
          </div>
          <div className="text-start w-fit p-2 flex flex-col border-l-2">
            <h1 className="font-bold">Stats</h1>
            <div className=" w-fit p-2 flex flex-col">
              <h3 className="text-start text-sm">Win potential</h3>
              <p className=" pr-2 font-bold text-green-300">
                {potential_trade.win} kr
              </p>
            </div>
            <div className=" w-fit p-2 flex flex-col">
              <h3 className="text-start text-sm">Loss potential</h3>
              <p className=" pr-2 font-bold text-red-300">
                {potential_trade.loss} kr
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mb-2 rounded-md text-slate-800 p-2  relative shadow-md">
      <div className="w-full h-full flex justify-around items-center">
        <h1 className="font-bold">{symbol}</h1>
        <h1>{Math.round(price)}</h1>
        <h1>{target}</h1>
        <h1 className="font-bold text-sm win-trade">win</h1>
        <div className="">
          <button
            className="bg-green-300 mr-2"
            onClick={() => setExtend(extend ? false : true)}
          ></button>
          <button
            className="bg-red-black"
            onClick={() =>
              showContextMenu
                ? setShowContextMenu(false)
                : setShowContextMenu(true)
            }
          ></button>
        </div>
      </div>
      <div className="w-full px-4">{extend ? <ExtendItem /> : null}</div>
      {showContextMenu ? <Menu refresh={refresh} symbol={symbol} /> : null}
    </div>
  );
}
