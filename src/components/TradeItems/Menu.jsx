import React, { useContext, useEffect, useRef, useState } from "react";
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
  const size_ref = useRef();
  const target_ref = useRef();
  const stop_ref = useRef();

  const { refresh } = useContext(ApplicationContext);
  const { symbol, trade_id, size, price } = data ? data : {};
  const [symbolState, setSymbolState] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const old_qty = Math.round(size / price);

  const TARGET_STOP_PERCENTAGE = 0.1;

  const delete_trade = () => {
    remove_trade({ trade_id: trade_id }, refresh);
  };

  const buy_trade = async () => {
    let trade_data = {
      symbol: symbolState,
      price: priceRef.current.value,
      qty: qty.current.value,
      size: size_ref.current.value,
      isNew: true,
      isFast: false,
      stop: stop_ref.current.value,
      target: target_ref.current.value,
    };
    setMessage(await post_trade(trade_data, refresh));
  };

  const add_trade = async () => {
    let trade_data = {
      symbol: symbol,
      price: priceRef.current.value,
      qty: qty.current.value,
      isNew: false,
      trade_id: trade_id,
      isFast: false,
    };
    setMessage(await update_trade(trade_data, refresh));
  };

  const toggle_close_trade = async () => {
    let trade_data = {
      symbol: symbol,
      price: priceRef.current.value,
      quantity: qty.current.value,
      trade_id: trade_id,
    };
    setMessage(await close_trade(trade_data, refresh, old_qty));
  };

  const on_size_change = (e) => {
    let inp_value = parseFloat(e.target.value);
    let price_value = priceRef.current.value ? priceRef.current.value : 1;
    let amn = 0;
    if (inp_value > price_value) {
      let qty_calc = Math.trunc(inp_value / price_value);
      let amn = Math.round(qty_calc * price_value);
      qty.current.value = Math.trunc(inp_value / price_value);
      setAmount(amn);
    }
  };
  const on_qty_change = (e) => {
    let inp_value = parseFloat(e.target.value);
    let size_value = size_ref.current.value;
    let price_value = priceRef.current.value;

    if (inp_value >= 0) {
      let amn = Math.round(inp_value * price_value);
      size_ref.current.value = amn;
      setAmount(amn);
    }
  };
  const on_price_change = (e) => {
    let inp_value = parseFloat(e.target.value);
    let qty_value = qty.current.value ? qty.current.value : 1;
    let amn = 0;
    if (inp_value > 0) {
      if (qty != 0) {
        amn = Math.round(inp_value * qty_value);
      }

      size_ref.current.value = amn;
      if (stop_ref.current != undefined) {
        stop_ref.current.value = inp_value - inp_value * TARGET_STOP_PERCENTAGE;
        target_ref.current.value =
          inp_value + inp_value * TARGET_STOP_PERCENTAGE;
      }

      setAmount(amn);
    }
  };

  // SET PRICE ON MOUNT
  useEffect(() => {
    priceRef.current.value = Math.round(price);
  }, []);

  const handle_symbol_change = (e) => {
    setSymbolState(e.target.value);
  };
  const SmallDashboard = () => {
    return (
      <>
        <div className="grid grid-cols-2 grid-rows-1 gap-2 w-full  rounded-md mb-2 p-2">
          <div className="w-full col-span-2 menu-modal-stats">
            <h1>Size:</h1>
            <h2>{Math.round(size)} kr</h2>
          </div>
          <div className="menu-modal-stats">
            <h1>Qty:</h1>
            <h2>{Math.round(size / price)} st</h2>
          </div>
          <div className="menu-modal-stats">
            <h1>Entry:</h1>
            <h2>{Math.round(price)} kr</h2>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col  justify-center items-center p-2 ">
      {data !== undefined ? (
        <SmallDashboard />
      ) : (
        <>
          <div className="w-full mb-4">
            <div className="menu-inp-cont">
              <h1>Symbol</h1>
              <input
                id="symbol"
                name="symbol"
                type="text"
                onChange={handle_symbol_change}
                className="w-full p-2 text-md text-center bg-bg border-bg rounded-md placeholder:text-gray-400"
                placeholder="ex. AAPL"
                value={symbolState}
              />
            </div>
          </div>
        </>
      )}
      <div className="w-full mb-4">
        <div className=" menu-inp-cont">
          <h1>Entry</h1>
          <input
            min="0"
            onChange={on_price_change}
            type="number"
            className="w-full p-2 text-md text-center bg-bg border-bg border-r rounded-md placeholder:text-gray-400"
            placeholder="0"
            ref={priceRef}
          />
        </div>
      </div>
      <div className="w-full">
        {data !== undefined ? null : (
          <>
            <div className="w-full mb-4 flex flex-row gap-2">
              <div className="w-full menu-inp-cont">
                <h1>Target</h1>
                <input
                  ref={target_ref}
                  name="target"
                  type="number"
                  className="w-full p-2 text-md text-center text-a bg-bg border-bg rounded-md placeholder:text-green-300 "
                  placeholder="0"
                />
              </div>
              <div className="w-full menu-inp-cont">
                <h1>Stop</h1>
                <input
                  ref={stop_ref}
                  name="stop"
                  type="number"
                  className="w-full p-2 text-md text-red-400 text-center bg-bg border-bg rounded-md placeholder:text-red-300 "
                  placeholder="0"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row w-full gap-2">
        <div className="w-full menu-inp-cont">
          <h1>Qty</h1>
          <input
            min="0"
            onChange={on_qty_change}
            type="number"
            className="w-full p-2 text-md  text-center bg-bg border-bg rounded-md placeholder:text-gray-400"
            placeholder="0"
            ref={qty}
          />
        </div>
        <div className=" w-full menu-inp-cont">
          <h1>Size</h1>
          <input
            min="0"
            onChange={on_size_change}
            type="number"
            className="w-full p-2 text-md text-center bg-bg border-bg rounded-md placeholder:text-gray-400"
            placeholder="0"
            ref={size_ref}
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <h2 className="text-text">
          Amount: <span className="font-bold text-text">{amount}</span>
        </h2>
        <h3 className="text-gray-400">{message}</h3>
      </div>

      {data != undefined ? (
        <>
          <li className="shadow-none">
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full h-10 justify-around">
                <button
                  onClick={() => {
                    add_trade();
                  }}
                  className="bg-a font-bold text-green-200 text-sm rounded-l-md px-2"
                >
                  Buy
                </button>
                <button
                  onClick={() => toggle_close_trade()}
                  className="bg-red-400 font-bold text-red-200 text-sm rounded-r-md px-2"
                >
                  Sell
                </button>
              </div>

              {/* <button
            onClick={() => toggle_close_trade()}
            className="bg-p p-1 font-normal text-text text-xs border border-sec rounded-b-md shadow-md"
          >
            Sell all {Math.round(size / price)}
          </button> */}
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
        </>
      ) : (
        <div>
          <button
            onClick={() => {
              buy_trade();
            }}
            className="bg-a font-bold text-green-200 text-sm rounded-md px-2 mt-2"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
