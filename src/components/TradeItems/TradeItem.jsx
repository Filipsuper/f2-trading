import React, { useContext, useEffect, useRef, useState } from "react";
import { menu_data } from "../../data/data.js";
import Menu from "./Menu.jsx";
import {
  CaretUpFill,
  CaretDownFill,
  PlusCircleFill,
  ThreeDots,
} from "react-bootstrap-icons";
import Chart from "../Overview/Chart.jsx";
import { ApplicationContext } from "../../providers/ApplicationProvider.jsx";
import { update_trade } from "../../tools/tools.js";

export default function TradeItem({ data, live_prices }) {
  const { symbol, size, price, stop, target, trade_id, notes } = data;
  const [extend, setExtend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [potential_trade, setPotentialTrade] = useState({ loss: 0, win: 1 });

  const textAreaRef = useRef();
  const targetRef = useRef();
  const stopRef = useRef();

  const { tradesData, refresh } = useContext(ApplicationContext);

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

  const Stats_obj = (props) => {
    return (
      <div className="flex justify-center h-full w-full bg-white rounded-md border relative">
        <div className="flex items-start flex-col w-full ">
          <p className="p-1 text-start bg-gray-100 text-xs w-fit h-fit text-gray-600 border-b border-r  rounded-br-md absolute">
            {props.text}
          </p>
          <p className="pb-2 font-bold text-lg h-full w-full flex justify-center items-center text-center p-2 text-text  ">
            {props.children}
          </p>
        </div>
      </div>
    );
  };
  const save_data = (notes) => {
    let parsed_data = {
      notes: notes.toString(),
      trade_id: trade_id,
      symbol: symbol,
      target:
        targetRef.current.value === ""
          ? target
          : parseFloat(targetRef.current.value),
      stop:
        stopRef.current.value === "" ? stop : parseFloat(stopRef.current.value),
    };

    update_trade(parsed_data, refresh);
  };

  const ExtendItem = () => {
    return (
      <div className="w-full h-72 mt-2 p-2 bg-gray-50 rounded-lg">
        <div className="w-full h-full grid grid-rows-3 grid-cols-8 gap-2">
          <div className="col-span-3 row-span-3 bg-white rounded-md horizontal center-h h-full border shadow-sm">
            <textarea
              className="w-full h-full outline-none p-2 resize-none rounded-xl"
              placeholder="Notes..."
              ref={textAreaRef}
            >
              {notes}
            </textarea>
          </div>
          <div className="col-start-4 col-end-6 row-start-1 row-end-2 bg-white rounded-md border shadow-sm">
            <div className="h-16">
              <div className="flex flex-row text-xs w-full border-b border-gray-200 bg-gray-100 rounded-t-md">
                <h1 className="w-1/2 border-r border-gray-300 p-1">Stop</h1>
                <h1 className="w-1/2 p-1">Target</h1>
              </div>
              <div className="h-full flex flex-row center-h ">
                <input
                  ref={stopRef}
                  className="w-1/2 border-0 bg-white text-center rounded-bl-md placeholder-text"
                  type="text"
                  placeholder={stop}
                />
                <input
                  ref={targetRef}
                  className="w-1/2 border-0 bg-white text-center rounded-br-md placeholder-text"
                  type="text"
                  placeholder={target}
                />
              </div>
            </div>
          </div>
          <div className="col-start-4 col-end-6 row-start-2 row-end-4 bg-white rounded-md shadow-sm">
            <Stats_obj text={"Unrealised pnl"}>
              <h1 className="text-4xl">{potential_trade.win + "kr"}</h1>
            </Stats_obj>
          </div>
          <div className="trade-item-cont">
            <Stats_obj text={"Entry"}>{price + " kr"}</Stats_obj>
          </div>
          <div className="trade-item-cont">
            <Stats_obj text={"Size"}>{size + " kr"}</Stats_obj>
          </div>
          <div className="trade-item-cont">
            <Stats_obj text={"Quantity"}>{size / price + " st"}</Stats_obj>
          </div>
          <div className="trade-item-cont ">
            <Stats_obj text={"Max loss"}>
              <p className="text-red-400">{potential_trade.loss + " kr"}</p>
            </Stats_obj>
          </div>
          <div className="trade-item-cont ">
            <Stats_obj text={"Max win"}>
              <p className="text-green-400">{potential_trade.win + " kr"}</p>
            </Stats_obj>
          </div>
          <div className="trade-item-cont ">
            <Stats_obj text={"r/r"}>
              {Math.round((potential_trade.win / potential_trade.loss) * 10) /
                10}
            </Stats_obj>
          </div>
          <div className="col-span-3 flex justify-end items-end">
            <button
              className="bg-gray-300 p-1 rounded-md text-gray-500"
              onClick={() => save_data(textAreaRef.current.value)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const toggleExtend = () => {
    setExtend(extend ? false : true);
  };

  return (
    <div className="bg-white w-full flex flex-col justify-center items-center mb-2 rounded-md text-text p-2 relative shadow-sm border border-gray-300 ">
      <div
        className="w-full grid grid-rows-1 grid-cols-6 gap-2 text-center center-h h-6 hover:cursor-pointer"
        onClick={toggleExtend}
      >
        <h1 className="font-bold text-gray-900">{symbol}</h1>
        <h1>{Math.round(price)}</h1>
        <h1>{target}</h1>
        <div className="vertical center-h">
          <h1 className="font-bold text-sm win-trade">win</h1>
        </div>
        <h1 className="font-bold">{Math.round(size / price)}</h1>
        <div className="horizontal  center-v justify-end">
          <button
            className="text-2xl text-gray-600 mr-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowContextMenu(!showContextMenu);
            }}
          >
            <ThreeDots />
          </button>
          <button className="text-xl text-text">
            {extend ? <CaretUpFill /> : <CaretDownFill />}
          </button>
        </div>
      </div>
      <div className="w-full">{extend ? <ExtendItem /> : null}</div>
      {showContextMenu ? (
        <Menu refresh={refresh} data={{ symbol, trade_id }} />
      ) : null}
    </div>
  );
}