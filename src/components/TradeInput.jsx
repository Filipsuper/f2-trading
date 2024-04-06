import React from "react";
import { useRef, useContext } from "react";
import { post_trade } from "../tools/tools";
import { useGlobal } from "../App";

import { Plus } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";

export default function () {
  const tickerRef = useRef();
  const priceRef = useRef();
  const sizeRef = useRef();
  const { refresh } = useContext(ApplicationContext);

  const add_trade = () => {
    let tickerVal = tickerRef.current.value;
    let priceVal = priceRef.current.value;
    let sizeVal = sizeRef.current.value;

    if (tickerVal === "" || priceVal === "" || sizeVal === "") {
      alert("Missing fields");
      return;
    }

    let trade_data = {
      symbol: tickerRef.current.value,
      price: priceRef.current.value,
      size: sizeRef.current.value,
      type: "buy",
      isNew: true,
      closed: false,
    };
    post_trade(trade_data, refresh);
  };

  return (
    <div className="text-xs bg-neutral-100 h-8">
      <div className="flex flex-row h-full">
        <input
          type="text"
          className="w-full rounded-l-md rounded-r-none text-sm border-r-0 dark-input"
          placeholder="Ticker"
          ref={tickerRef}
        />
        <input
          type="text"
          className="w-full rounded-r-none text-sm border-r-0 dark-input"
          placeholder="Price"
          ref={priceRef}
        />
        <input
          type="text"
          className="w-full rounded-r-none text-sm border-r-0 dark-input"
          placeholder="Size"
          ref={sizeRef}
        />
        <button
          className="rounded-l-none rounded-r-md border p-1 text-gray-300 bg-gray-600 text-xl"
          onClick={() => add_trade()}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
