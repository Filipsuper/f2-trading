import React, { useState } from "react";
import { useRef, useContext } from "react";
import { post_trade } from "../tools/tools";
import { useGlobal } from "../App";

import { Plus, Sliders } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";
import Modul from "./Modul";
import Menu from "./TradeItems/Menu";

export default function TradeInput({ props }) {
  const tickerRef = useRef();
  const priceRef = useRef();
  const sizeRef = useRef();
  const { refresh } = useContext(ApplicationContext);
  const { showAdvanced, setShowAdvanced } = props;

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
    <div className="w-full text-xs bg-inherit h-8 ">
      <div className="w-full flex flex-row justify-between h-full">
        {/* <div className="flex flex-row h-full">
          <input
            type="text"
            className="w-full rounded-md text-sm dark-input"
            placeholder="Search"
            ref={tickerRef}
          />
        </div> */}
        <div></div>

        <div className=" flex flex-row gap-2 h-full">
          <button
            className="btn-cont items-center rounded-md text-text border border-bg bg-p"
            onClick={() => {
              setShowAdvanced(!showAdvanced);
            }}
          >
            <div className="p-1 px-2">
              <Plus />
            </div>
            <h2 className="hidden md:flex">Add Trade</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
