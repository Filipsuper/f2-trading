import React, { useContext, useRef } from "react";
import { close_trade, post_trade, update_trade } from "../../tools/tools";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Menu({ data }) {
  const price = useRef();
  const qty = useRef();
  const { refresh } = useContext(ApplicationContext);
  const { symbol, trade_id } = data;

  const delete_trade = (trade_id) => {
    fetch("http://127.0.0.1:5000/api/trades/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trade_id: trade_id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json)
      .then(() => refresh(1));
  };

  const add_trade = () => {
    let trade_data = {
      symbol: symbol,
      price: price.current.value,
      qty: qty.current.value,
      isNew: false,
      trade_id: trade_id,
    };
    update_trade(trade_data, refresh);
  };

  const toggle_close_trade = () => {
    let trade_data = {
      symbol: symbol,
      price: price.current.value,
      quantity: qty.current.value,
      trade_id: trade_id,
    };
    close_trade(trade_data, refresh);
  };

  return (
    <div className="top-10 right-0 absolute bg-white border border-gray-600 shadow-md rounded-md flex flex-col items-center z-10 pt-2">
      <div className="flex flex-row justify-between gap-1 ">
        <input
          type="text"
          className="w-10 px-1 py-2 text-xs rounded-l-md text-center bg-background-950"
          placeholder="Price"
          ref={price}
        />
        <input
          type="text"
          className="w-10 px-1 py-2 text-xs rounded-l-md text-center bg-background-950"
          placeholder="Qty"
          ref={qty}
        />
      </div>

      <li className="bg-background-900 p-2 shadow-none w-full ">
        <button
          onClick={() => {
            add_trade();
          }}
          className="bg-background-950 p-1 font-normal text-green-700 text-sm w-full"
        >
          Add
        </button>
      </li>
      <li className="bg-background-900 p-2 pt-0 shadow-none w-full ">
        <button
          onClick={() => toggle_close_trade()}
          className="bg-red-100 p-1 font-normal text-red-700 text-sm w-full"
        >
          Sell
        </button>
      </li>
      <li className=" p-2 pt-0 shadow-none w-full ">
        <button
          onClick={() => delete_trade(trade_id)}
          className="bg-background-950 p-1 font-normal text-black text-sm w-full"
        >
          Delete
        </button>
      </li>
      <li className="bg-background-900 p-2 pt-0 shadow-none w-full ">
        <button
          onClick={() => toggle_close_trade()}
          className="bg-gray-700 p-1 font-normal text-white text-sm w-full"
        >
          Sell All
        </button>
      </li>
    </div>
  );
}
