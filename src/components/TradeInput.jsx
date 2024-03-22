import React from "react";
import { useRef, useContext } from "react";
import { post_trade } from "../tools/tools";
import { useGlobal } from "../App";

export default function () {
  const tickerRef = useRef();
  const priceRef = useRef();
  const { setRefresh } = useGlobal();

  const add_trade = () => {
    let trade_data = {
      symbol: tickerRef.current.value,
      price: priceRef.current.value,
      type: "buy",
      isNew: true,
      closed: false,
    };
    post_trade(trade_data, setRefresh);
  };

  return (
    <div className="flex flex-row mb-4 w-2/3 text-xs">
      <input
        type="text"
        className="w-full rounded-l-md rounded-r-none text-sm border-r-0"
        placeholder="Ticker"
        ref={tickerRef}
      />
      <input
        type="text"
        className="w-full rounded-none text-sm border-r-0"
        placeholder="Price"
        ref={priceRef}
      />
      <button className="rounded-l-none text-sm" onClick={() => add_trade()}>
        ADD
      </button>
    </div>
  );
}
