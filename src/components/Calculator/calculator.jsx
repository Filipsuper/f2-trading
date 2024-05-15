import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import { Plus } from "react-bootstrap-icons";
import Modul from "../Modul";
import { post_trade } from "../../tools/tools";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Calculator() {
  const { refresh } = useContext(ApplicationContext);

  const [data, setData] = useState([]);
  const [results, setResults] = useState({ win: 0, loss: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [spread, setSpread] = useState(0);
  const [modal, showModal] = useState(false);
  const inp = useRef();
  const price = useRef();
  const size = useRef();
  const risk = useRef();
  const reward = useRef();
  const product = useRef();
  const symbol = useRef();

  useEffect(() => {
    inp.current.value = 1;
    if (data.data == undefined) return;
    calculate_risk();
  }, [data]);

  const leverage_toggle = (leverage) => {
    inp.current.value = leverage;
  };

  const on_calculate = () => {
    // let product_val = product.current.value;
    // setSearchQuery([1]);
    calculate_risk();
  };

  const calculate_risk = () => {
    let size_val = size.current.value;
    let price_val = price.current.value;
    let risk_val = risk.current.value;
    let reward_val = reward.current.value;

    let leverage_val = inp.current.value;
    let spread_val = 0;

    let nominal_value =
      price_val * Number.parseInt(size_val / price_val) * leverage_val;
    let pip = 1;

    let risk_percentage = 0;
    let reward_percentage = 0;

    if (risk_val < price_val) {
      risk_percentage = Math.abs(price_val - risk_val) / price_val;
      reward_percentage = Math.abs(reward_val - price_val) / price_val;
    } else if (risk_val > price_val) {
      risk_percentage = Math.abs(risk_val - price_val) / price_val;

      reward_percentage = Math.abs(price_val - reward_val) / price_val;
    }

    let pip_change = pip / price_val;

    let pnl_per_pip = pip_change * nominal_value;

    setResults({
      win:
        Math.round((reward_percentage * nominal_value - spread_val) * 10) / 10,
      loss:
        Math.round((risk_percentage * nominal_value + spread_val) * 10) / 10,
    });
  };

  const add_trade_from_calculator = () => {
    let trade = {
      symbol: symbol.current.value,
      price: price.current.value,
      isNew: true,
      size: size.current.value,
      target: reward.current.value,
      stop: risk.current.value,
    };
    post_trade(trade, refresh);
  };

  const ConfirmTradeModal = () => {
    return (
      <div className="p-2">
        <div className="inp-cont-2">
          <input
            className="rounded-sm w-full"
            type="text"
            ref={symbol}
            placeholder="symbol"
          />
        </div>
        <div className="horizontal center-v w-full mt-4 hover:text-a">
          <button
            onClick={() => {
              add_trade_from_calculator();
            }}
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-fit h-fit flex flex-col md:flex-row">
      <div className="p-4 md:w-56 flex flex-col justify-around">
        <div className="">
          <h1 className="text-text font-bold">RISK/REWARD CALCULATOR</h1>
          <p className="text-text text-sm border-b border-bg">
            Insert your price, target, stop and leverage and then press
            calculate
          </p>
        </div>
        <div className="flex-grow flex flex-row items-center justify-around py-4 md:py-0 ">
          <div>
            <h2 className="text-xs">Reward:</h2>
            <h1 className="font-bold text-xl">{results.win}</h1>
            <div>
              <h1 className=" win-trade text-xs">
                {Math.round((results.win / size.current?.value) * 100) + "%"}
              </h1>
            </div>
          </div>
          <div>
            <h2 className="text-xs">Risk:</h2>
            <h1 className="font-bold text-xl">{results.loss}</h1>
            <div>
              <h1 className="loss-trade text-xs">
                -{Math.round((results.loss / size.current?.value) * 100) + "%"}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 md:p-0 md:w-2/3 horizontal center-v">
        <ul>
          {/* <div className="inp-cont">
            <div className="text-div">
              <h2>Product</h2>
            </div>
            <input type="text" ref={product} />
          </div> */}
          <div className="inp-cont-2 w-full">
            <div className="text-div">
              <h2>Price</h2>
            </div>
            <input
              className="w-full rounded-r-md"
              type="text"
              name=""
              id=""
              ref={price}
            />
          </div>
          <div className="inp-cont-2 w-full horizontal center-v">
            <div className="w-full h-full">
              <input
                className="w-1/2 rounded-l-md"
                type="text"
                name=""
                id=""
                ref={risk}
                placeholder="stop"
              />
              <input
                className="w-1/2 rounded-r-md"
                type="text"
                name=""
                id=""
                ref={reward}
                placeholder="target"
              />
            </div>
          </div>
          <div className="inp-cont-2 w-full">
            <div className="text-div">
              <h2>Size</h2>
            </div>
            <input
              className="w-full rounded-r-md"
              type="text"
              name=""
              id=""
              ref={size}
            />
          </div>

          <div className=" inp-cont-2 w-full leverage">
            <div className="inp-cont-2">
              <div className="text-div">
                <h2 className=" md:flex hidden">Levrage</h2>
                <h2 className="flex md:hidden">Lev</h2>
              </div>
              <input className="w-full rounded-r-md" type="text" ref={inp} />{" "}
            </div>

            <div className="leverage-button-cont">
              <button onClick={() => leverage_toggle(10)}>10x</button>
              <button onClick={() => leverage_toggle(15)}>15x</button>
              <button onClick={() => leverage_toggle(20)}>20x</button>
            </div>
          </div>
          <div className="w-full horizontal center-v">
            <button
              className="rounded-md win-trade"
              onClick={() => on_calculate()}
            >
              Calculate
            </button>
          </div>
          <div className="w-full horizontal center-v center-h py-2">
            <h2 className="font-bold text-a">
              <Plus />
            </h2>
            <button
              className="rounded-md text-a"
              onClick={() => showModal(!modal)}
            >
              Add as trade
            </button>
          </div>
        </ul>
      </div>
      {modal ? (
        <Modul setShow={showModal} show={showModal} header={"Trade manager"}>
          <ConfirmTradeModal />
        </Modul>
      ) : null}
    </div>
  );
}
