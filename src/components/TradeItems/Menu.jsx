import React, { useContext, useRef } from "react";
import {
  close_trade,
  post_trade,
  remove_trade,
  update_trade,
} from "../../tools/tools";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import { Plus, minus } from "react-bootstrap-icons";

export default function Menu({ data }) {
  const priceRef = useRef();
  const qty = useRef();
  const { refresh } = useContext(ApplicationContext);
  const { symbol, trade_id, size, price } = data;

  const delete_trade = () => {
    remove_trade({ trade_id: trade_id }, refresh);
  };

  const add_trade = () => {
    let trade_data = {
      symbol: symbol,
      price: priceRef.current.value,
      qty: qty.current.value,
      isNew: false,
      trade_id: trade_id,
    };
    update_trade(trade_data, refresh);
  };

  const toggle_close_trade = () => {
    let trade_data = {
      symbol: symbol,
      price: priceRef.current.value,
      quantity: qty.current.value,
      trade_id: trade_id,
    };
    close_trade(trade_data, refresh);
  };

  return (
    <div className="flex flex-col  justify-center items-center p-2 ">
      <h1 className="text-start">Current data:</h1>
      <div className="grid grid-cols-2 grid-rows-1 gap-2 w-full border rounded-md mb-2 p-4">
        <div className="menu-modal-stats">
          <h1>Size:</h1>
          <h2>{size}</h2>
        </div>
        <div className="menu-modal-stats">
          <h1>Qty:</h1>
          <h2>{Math.round(size / price)}</h2>
        </div>
      </div>
      <div className="flex w-5/6 flex-row justify-between">
        <div className="w-1/2">
          <h2 className="rounded-t-md p-1 text-xs">Price:</h2>
          <input
            type="text"
            className="w-full p-2 text-md text-center bg-bg border-0 border-r placeholder:text-text"
            placeholder="0"
            ref={priceRef}
          />
        </div>
        <div className="w-1/2">
          <h2 className="  rounded-t-md p-1 text-xs">Qty:</h2>
          <input
            type="text"
            className="w-full p-2 text-md  text-center bg-bg border-0 placeholder:text-text"
            placeholder="0"
            ref={qty}
          />
        </div>
      </div>
      <li className=" shadow-none w-full ">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full h-10 justify-around">
            <button
              onClick={() => {
                add_trade();
              }}
              className="bg-green-500 w-1/2 font-normal text-green-200 text-sm rounded-tl-md"
            >
              Buy
            </button>
            <button
              onClick={() => toggle_close_trade()}
              className="bg-red-500 w-1/2 font-normal text-red-200 text-sm rounded-tr-md"
            >
              Sell
            </button>
          </div>

          <button
            onClick={() => toggle_close_trade()}
            className="bg-p p-1 font-normal text-text text-xs border border-sec rounded-b-md shadow-md"
          >
            Sell all {Math.round(size / price)}
          </button>
        </div>
      </li>
      <li className=" p-2 pt-0 shadow-none w-full ">
        <button
          onClick={() => delete_trade(trade_id)}
          className="w-full p-1 font-normal text-red-500 text-sm"
        >
          Delete
        </button>
      </li>
    </div>
  );
}
