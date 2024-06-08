import React, { useContext, useEffect, useRef, useState } from "react";
import TradeItem from "./TradeItems/TradeItem";
import TradeItemClosed from "./TradeItems/TradeItemClosed";
import { ArrowLeft, Plus, Search, Sliders } from "react-bootstrap-icons";
import TradeInput from "./TradeInput";
import { ApplicationContext } from "../providers/ApplicationProvider";
import Modul from "./Modul";
import Menu from "./TradeItems/Menu";

export default function TradeTable({ inp }) {
  const contRef = useRef();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const AdvancedPosition = () => {
    return (
      <div>
        <Menu />
      </div>
    );
  };

  const PlaceholderTrade = () => {
    return (
      <>
        <div className="horizontal center-h p-4 bg-sec w-full h-24 shadow-sm border-sec border-gradient-2 text-bg mb-2">
          <h1>No trades yet </h1>
        </div>
        <div className="horizontal center-h p-4 bg-sec w-full h-12 shadow-sm border-sec border-gradient-2 text-bg mb-2">
          <h1>...</h1>
        </div>
        <div className="horizontal center-h p-4 bg-sec w-full h-12 shadow-sm border-sec border-gradient-2 text-bg mb-2">
          <h1>...</h1>
        </div>
        <div className="horizontal center-h p-4 bg-sec w-full h-12 shadow-sm border-sec border-gradient-2 text-bg mb-2">
          <h1>...</h1>
        </div>

        <div className="horizontal center-h p-4 bg-sec w-full h-12 shadow-sm border-sec border-gradient-2 text-bg mb-2">
          <h1>...</h1>
        </div>
        <div className="horizontal center-h center-v p-4 w-full h-full text-bg mb-2 border rounded-md border-bg">
          <button
            className="horizontal center-h p-10 border-sec border-gradient-2 rounded-md hover:text-a transition-colors"
            onClick={() => {
              setShowAdvanced(!showAdvanced);
            }}
          >
            <span className="text-3xl">
              <Plus />
            </span>
            Click here to add your first trade!
          </button>
        </div>
      </>
    );
  };

  useEffect(() => {
    setIsDataLoading(false);
  }, tradesData);

  return (
    <div className=" w-full h-full flex  flex-col border bg-inherit rounded-md border-gradient-2 ">
      <div
        ref={contRef}
        className="h-fit w-full test-parent border-b border-bg"
      >
        {inp ? (
          <div className="h-10 horizontal w-full items-center text-md border-b border-inherit px-2 p-1 ">
            <TradeInput
              props={{
                showAdvanced: showAdvanced,
                setShowAdvanced: setShowAdvanced,
              }}
            />
          </div>
        ) : (
          <div className="w-full p-1 border-b border-bg">
            <h1 className="text-text">Trade logg</h1>
          </div>
        )}
        <div className="h-fit text-text horizontal text-xs center-h grid grid-cols-3 grid-rows-2 md:grid-rows-1 md:grid-cols-7 gap-2 text-center p-2 px-2 ">
          <h1>Symbol</h1>
          <h1>Entry</h1>
          <h1>Exit / Target</h1>
          <h1>Status</h1>
          <h1>Qty</h1>
          <h1>Setup</h1>
          <h1>Settings</h1>
        </div>
      </div>
      <ul className="flex flex-grow overflow-y-scroll bg-inherit border-bg">
        <div className="flex h-full flex-col px-2 border-inherit py-2">
          {inp
            ? tradesData
                //sorts the array so closed trades are shown last
                .sort((a, b) => a.closed - b.closed)
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
          {tradesData.length == 0 ? <PlaceholderTrade /> : null}
          {isDataLoading ? (
            <>
              <div className="w-full h-64 mt-4 bg-sec rounded-sm horizontal center-h center-v p-4 ">
                <span class="loader animate-spin"></span>
              </div>
              <div className="w-full h-28 mt-4 bg-sec rounded-sm horizontal center-h center-v p-4 ">
                <span class="loader animate-spin"></span>
              </div>
              <div className="w-full h-28 mt-4 bg-sec rounded-sm horizontal center-h center-v p-4 ">
                <span class="loader animate-spin"></span>
              </div>
            </>
          ) : null}
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
      {showAdvanced ? (
        <Modul
          header={"Advanced Position "}
          show={showAdvanced}
          setShow={setShowAdvanced}
        >
          <AdvancedPosition />
        </Modul>
      ) : null}
    </div>
  );
}
