import React, { useRef } from "react";
import { close_trade, post_trade } from "../tools/tools";
import { useGlobal } from "../App";

export default function Menu({ symbol }) {
  const price = useRef();
  const qty = useRef();
  const { setRefresh } = useGlobal();

  const delete_trade = (trade) => {
    fetch("http://127.0.0.1:5000/api/trades/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trade), // body data type must match "Content-Type" header
    })
      .then((res) => res.json)
      .then(() => setRefresh(1));
  };

  const add_trade = () => {
    let trade_data = {
      symbol: symbol,
      price: price.current.value,
      qty: qty.current.value,
      isNew: false,
    };
    console.log(trade_data);
    post_trade(trade_data, setRefresh);
  };

  const toggle_close_trade = () => {
    let trade_data = {
      symbol: symbol,
      price: price.current.value,
      quantity: qty.current.value,
    };

    close_trade(trade_data, setRefresh);
  };

  return (
    <div className="top-10 right-0 absolute bg-white shadow-md rounded-md flex flex-col items-center z-10">
      <div className="flex flex-row justify-between gap-1">
        <input
          type="text"
          className="w-10 px-1 py-2 text-xs rounded-l-md text-center bg-gray-50"
          placeholder="Price"
          ref={price}
        />
        <input
          type="text"
          className="w-10 px-1 py-2 text-xs rounded-l-md text-center bg-gray-50"
          placeholder="Qty"
          ref={qty}
        />
      </div>

      <li className="bg-white p-2 shadow-none w-full ">
        <button
          onClick={() => {
            add_trade();
          }}
          className="bg-green-100 p-1 font-normal text-green-700 text-sm w-full"
        >
          Add
        </button>
      </li>
      <li className="bg-white p-2 pt-0 shadow-none w-full ">
        <button
          onClick={() => toggle_close_trade()}
          className="bg-red-100 p-1 font-normal text-red-700 text-sm w-full"
        >
          Sell
        </button>
      </li>
      <li className="bg-white p-2 pt-0 shadow-none w-full ">
        <button
          onClick={() => delete_trade(symbol)}
          className="bg-white p-1 font-normal text-black text-sm w-full"
        >
          Delete
        </button>
      </li>
      <li className="bg-white p-2 pt-0 shadow-none w-full ">
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
