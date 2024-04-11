import React, { useContext, useEffect, useRef, useState } from "react";
import TradeItem from "./TradeItems/TradeItem";
import TradeItemClosed from "./TradeItems/TradeItemClosed";
import { Search } from "react-bootstrap-icons";
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
    <div className="w-full h-screen bg-gray-100 border rounded-xl flex flex-col">
      <div ref={contRef} className="h-fit w-full test-parent">
        {inp ? (
          <div className="h-10 horizontal justify-between items-center text-md border-b px-2 p-1 ">
            <h1 className="text-gray-400 text-sm">Trade Manager</h1>
            <TradeInput />
          </div>
        ) : null}
        <div className="h-fit horizontal text-xs center-h grid grid-rows-1 grid-cols-6 gap-2 text-center p-2 px-2 ">
          <h1>Symbol</h1>
          <h1>Entry</h1>
          <h1>Exit / Target</h1>
          <h1>Status</h1>
          <h1>Qty</h1>
          <h1>Settings</h1>
        </div>
      </div>
      <ul className="flex overflow-y-scroll shadow-inner">
        <div className="flex h-full flex-col mt-2 px-4 ">
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
      <div className="border-t text-sm p-2 horizontal center-h justify-end text-gray-400">
        <button
          className="border-l pl-2  hover:text-gray-800 hover:cursor-pointer"
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
