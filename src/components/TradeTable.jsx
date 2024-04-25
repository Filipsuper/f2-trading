import React, { useContext, useEffect, useRef, useState } from "react";
import TradeItem from "./TradeItems/TradeItem";
import TradeItemClosed from "./TradeItems/TradeItemClosed";
import { ArrowLeft, Search, Sliders } from "react-bootstrap-icons";
import TradeInput from "./TradeInput";
import { ApplicationContext } from "../providers/ApplicationProvider";

export default function TradeTable({ inp }) {
  const contRef = useRef();

  const { tradesData, setTradesData } = useContext(ApplicationContext);

  const export_trades_to_csv = () => {
    let arr = [
      [
        "index",
        "symbol",
        "price",
        "target",
        "stop",
        "exit",
        "pnl",
        "typy",
        "notes",
        "date",
      ],
    ];
    tradesData.forEach((elem, idx) => {
      arr.push([
        idx,
        elem.symbol,
        elem.price,
        elem.target,
        elem.stop,
        elem.exit,
        elem.pnl,
        elem.type,
        elem.notes,
        elem.date,
      ]);
    });

    let csvContent = "data:text/csv;charset=utf-8,";

    arr.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  return (
    <div className="w-full h-full flex flex-col border bg-cool rounded-md border-gradient-2 shadowglow">
      <div ref={contRef} className="h-fit w-full test-parent border-bg">
        {inp ? (
          <div className="h-10 horizontal w-full items-center text-md border-b border-inherit px-2 p-1 ">
            <TradeInput />
          </div>
        ) : null}
        <div className="h-fit text-text horizontal text-xs center-h grid grid-cols-3 grid-rows-2 md:grid-rows-1 md:grid-cols-6 gap-2 text-center p-2 px-2 ">
          <h1>Symbol</h1>
          <h1>Entry</h1>
          <h1>Exit / Target</h1>
          <h1>Status</h1>
          <h1>Qty</h1>
          <h1>Settings</h1>
        </div>
      </div>
      <ul className="flex flex-grow overflow-y-scroll bg-inherit border-bg">
        <div className="flex h-full flex-col px-2 border-inherit">
          {inp
            ? tradesData
                .sort((a, b) => a.closed - b.closed) //sorts the array so closed trades are shown last
                .map((item, idx) => {
                  if (!item.closed) return <TradeItem data={item} key={idx} />;
                  else return <TradeItemClosed data={item} key={idx} />;
                })
            : tradesData
                .sort((a, b) => a.closed - b.closed) //sorts the array so closed trades are shown last
                .map((item, idx) => {
                  if (item.closed)
                    return <TradeItemClosed data={item} key={idx} />;
                })}
        </div>
      </ul>
      <div className="border-t border-bg text-sm p-2 horizontal center-h justify-end text-text">
        <button
          className="border-l border-inherit pl-2  hover:text-a hover:cursor-pointer"
          onClick={() => {
            export_trades_to_csv();
          }}
        >
          Export data
        </button>
      </div>
    </div>
  );
}
