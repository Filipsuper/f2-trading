import React, { useContext, useEffect, useRef, useState } from "react";
import { menu_data } from "../../data/data.js";
import Menu from "./Menu.jsx";
import {
  CaretUpFill,
  CaretDownFill,
  PencilSquare,
  Plus,
  Dash,
} from "react-bootstrap-icons";
import Chart from "../Overview/Chart.jsx";
import { ApplicationContext } from "../../providers/ApplicationProvider.jsx";
import { close_trade, update_trade } from "../../tools/tools.js";
import Modul from "../Modul.jsx";

export default function TradeItem({ data, live_prices }) {
  const {
    symbol,
    size,
    price,
    stop,
    target,
    trade_id,
    notes,
    pnl,
    setup,
    initial_size,
  } = data;
  const [extend, setExtend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [potential_trade, setPotentialTrade] = useState({ loss: 0, win: 1 });

  const textAreaRef = useRef();
  const targetRef = useRef();
  const stopRef = useRef();
  const fast_add_price = useRef();

  let pnl_text = pnl ? pnl : 0;

  const { tradesData, refresh } = useContext(ApplicationContext);

  const calculate_potential = (ent, sz, stp, tgt) => {
    let qty = sz / ent;
    let pot_win = (tgt - ent) * qty;
    let pot_loss = (ent - stp) * qty;

    let calculated = { win: Math.round(pot_win), loss: Math.round(pot_loss) };

    return calculated;
  };

  useEffect(() => {
    // fast_add_price.current.value = Math.round(price);
  }, []);

  useEffect(() => {
    setPotentialTrade({
      loss: calculate_potential(price, size, stop, target).loss,
      win: calculate_potential(price, size, stop, target).win,
    });
  }, [data]);

  const Stats_obj = (props) => {
    return (
      <div className="flex justify-center h-full w-full bg-inherit relative">
        <div className="flex items-start flex-col w-full overflow-hidden">
          <p className="p-1 text-start text-text text-xs w-fit h-fit  border-bg absolute">
            {props.text}
          </p>
          <p className="pb-2 mt-2 font-bold text-sm h-full w-full flex justify-center items-center text-center  text-text whitespace-nowrap">
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
      <div className="w-full h-fit md:h-72 mt-2 p-2 border-inherit rounded-lg bg-sec">
        <div className="w-full h-full grid grid-rows-6 grid-cols-3 gap-6 md:grid-rows-3 md:grid-cols-3 md:gap-2 border-inherit ">
          <div className="col-span-3 row-start-5 row-end-7 mb-2 md:mb-0 md:col-start-1 md:col-end-2 md:row-span-3 rounded-xl horizontal flex flex-col center-h h-full  border border-dashed border-gradient-4">
            <textarea
              className="w-full  h-full outline-none p-2 resize-none rounded-xl text-text bg-sec"
              placeholder="Write some notes..."
              ref={textAreaRef}
            >
              {notes}
            </textarea>
          </div>
          <div className="flex flex-col w-full justify-start col-span-3 row-span-2 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-4 border-r-2 border-gradient-4 p-2 overflow-hidden">
            <div className="h-1/2 flex flex-row items-center justify-around bg-inherit border-b-2 border-gradient-4 pb-4 md:pb-0">
              <div className="pnl-cont">
                <p className="text-xs text-text">Realised profit</p>
                <h1 className="text-3xl font-bold text-text">
                  {Math.round(pnl_text) + "kr"}
                </h1>
              </div>
              <h2 className="win-trade flex md:hidden lg:flex text-lg md:p-1 font-bold text-text">
                {"+ " + Math.round((pnl_text / initial_size) * 100) + "%"}
              </h2>
            </div>
            <div className="flex flex-row md:flex-col xl:flex-row h-1/2 w-full mt-6 md:mt-2 relative">
              <div className="absolute top-0 right-0">
                <div className="h-fit flex justify-end items-end">
                  <button
                    className=" text-xs rounded-md text-gray-500 p-1"
                    onClick={() => {
                      save_data(textAreaRef.current.value);
                      refresh();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="s-t-cont mr-2">
                <div className="flex flex-row ">
                  <h2 className="text-text text-start mr-2">Stop</h2>
                  <h2 className="loss-trade text-start">
                    {"-" + Math.round(((price - stop) / price) * 100) + "%"}
                  </h2>
                </div>
                <input
                  ref={stopRef}
                  className=""
                  type="text"
                  placeholder={stop + " kr"}
                />
              </div>
              <div className="s-t-cont">
                <div className="flex flex-row">
                  <h2 className="text-text text-start mr-2">Target</h2>
                  <h2 className="win-trade text-start">
                    {" "}
                    {Math.round(((target - price) / price) * 100) + "%"}
                  </h2>
                </div>
                <input
                  ref={targetRef}
                  className=""
                  type="text"
                  placeholder={target + " kr"}
                />
              </div>
            </div>
          </div>

          <div className="h-full col-span-3 row-span-2 md:col-span-1 md:row-span-3 grid grid-rows-2 grid-cols-3 p-2 border-bg">
            <div className="trade-item-cont border-r border-b ">
              <Stats_obj text={"Entry"}>{Math.round(price) + " kr"}</Stats_obj>
            </div>
            <div className="trade-item-cont border-r border-b ">
              <Stats_obj text={"Size"}>{Math.round(size) + " kr"}</Stats_obj>
            </div>
            <div className="trade-item-cont border-b ">
              <Stats_obj text={"Quantity"}>
                {Math.round(size / price) + " st"}
              </Stats_obj>
            </div>
            <div className="trade-item-cont border-r ">
              <Stats_obj text={"Max loss"}>
                <p className="text-red-400 ">
                  {"-" + potential_trade.loss + " kr"}
                </p>
              </Stats_obj>
            </div>
            <div className="trade-item-cont border-r ">
              <Stats_obj text={"Max win"}>
                <p className="text-a">{"+" + potential_trade.win + " kr"}</p>
              </Stats_obj>
            </div>
            <div className="trade-item-cont">
              <Stats_obj text={"r/r"}>
                {Math.round((potential_trade.win / potential_trade.loss) * 10) /
                  10}
              </Stats_obj>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleExtend = () => {
    setExtend(extend ? false : true);
  };

  const item_fast_add = () => {
    let parsed_data = {
      trade_id: trade_id,
      symbol: symbol,
      price: parseFloat(fast_add_price.current.value),
      isFast: true,
    };
    update_trade(parsed_data, refresh);
  };
  const item_fast_sell = () => {
    let trade_data = {
      symbol: symbol,
      price: fast_add_price.current.value,
      quantity: 1,
      trade_id: trade_id,
      isFast: true,
    };
    close_trade(trade_data, refresh);
  };

  return (
    <div className="bg-sec border-b w-full flex flex-col justify-center items-center mb-2 rounded-sm px-2 text-text shadow-sm border-sec border-gradient-2">
      <div
        className="w-full grid grid-cols-4 grid-rows-2 md:grid-rows-1 md:grid-cols-7 gap-4 md:gap-2 text-center center-h h-24 md:h-16 py-4 hover:cursor-pointer"
        onClick={toggleExtend}
      >
        <h1 className="font-bold text-text">{symbol}</h1>
        <h1>{Math.round(price)}</h1>
        <h1>{target}</h1>
        <div className="vertical center-h">
          <h1 className="font-bold text-sm active-trade">Active</h1>
        </div>
        <h1 className="font-bold">{Math.round(size / price)}</h1>
        <div className="vertical center-h">
          <h1 className="font-bold bg-gray-300 w-fit p-1 rounded-md">
            {setup}
          </h1>
        </div>

        <div className="horizontal center-h center-v md:justify-end">
          <div
            className="horizontal center-h"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="flex flex-col  w-full center-h border border-bg rounded-md bg-p text-sm text-gray-600 mr-2">
              <div className="bg-p w-full px-1 rounded-t-md border-b border-bg">
                <input
                  ref={fast_add_price}
                  className="bg-p w-8  border-none text-center"
                  placeholder="price"
                />
              </div>
              <div className="h-full flex flex-row rounded-b-md">
                <button
                  className="bg-p h-full text-xs hover:bg-bg p-1 rounded-bl-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    item_fast_add();
                  }}
                >
                  <Plus />
                </button>
                <button
                  className="bg-p h-full text-xs hover:bg-bg p-1 rounded-br-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    item_fast_sell();
                  }}
                >
                  <Dash />
                </button>
              </div>
            </div> */}
            <button
              className="modify-btn w-full text-sm text-gray-600 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                setShowContextMenu(!showContextMenu);
              }}
            >
              <h2>
                <PencilSquare />
              </h2>
            </button>
          </div>
          <button className="text-xl text-a hidden md:flex">
            {extend ? <CaretUpFill /> : <CaretDownFill />}
          </button>
        </div>
      </div>
      <div className="w-full border-inherit text-a">
        {extend ? <ExtendItem /> : null}
      </div>
      {showContextMenu ? (
        <Modul
          header={"Manage " + symbol}
          show={showContextMenu}
          setShow={setShowContextMenu}
        >
          <Menu refresh={refresh} data={{ symbol, trade_id, size, price }} />
        </Modul>
      ) : null}
    </div>
  );
}
