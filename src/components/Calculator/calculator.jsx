import React from "react";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

export default function calculator() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [spread, setSpread] = useState(0);

  const inp = useRef();
  const price = useRef();
  const size = useRef();
  const risk = useRef();
  const reward = useRef();
  const product = useRef();

  useEffect(() => {
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

    let nominal_value = size_val * leverage_val;
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

    setResults([
      Math.round((reward_percentage * nominal_value - spread_val) * 10) / 10,
      Math.round((risk_percentage * nominal_value + spread_val) * 10) / 10,
    ]);
  };

  return (
    <div>
      <h1>CERT KALKYLATOR</h1>
      <div className="cont">
        <ul>
          {/* <div className="inp-cont">
            <div className="text-div">
              <h2>Product</h2>
            </div>
            <input type="text" ref={product} />
          </div> */}
          <div className="inp-cont">
            <div className="text-div">
              <h2>Price</h2>
            </div>
            <input type="text" name="" id="" ref={price} />
          </div>
          <div className="inp-cont">
            <div className="risk-cont">
              <input type="text" name="" id="" ref={risk} placeholder="risk" />
              <input
                type="text"
                name=""
                id=""
                ref={reward}
                placeholder="reward"
              />
            </div>
          </div>
          <div className="inp-cont">
            <div className="text-div">
              <h2>Size</h2>
            </div>
            <input type="text" name="" id="" ref={size} />
          </div>

          <div className=" inp-cont leverage">
            <div className="inp-cont">
              <div className="text-div">
                <h2>Leverage</h2>
              </div>
              <input type="text" ref={inp} />{" "}
            </div>

            <div className="leverage-button-cont">
              <button onClick={() => leverage_toggle(10)}>10</button>
              <button onClick={() => leverage_toggle(15)}>15</button>
              <button onClick={() => leverage_toggle(20)}>20</button>
            </div>
          </div>
          <button onClick={() => on_calculate()}>CALC</button>
          {results.map((res, idx) => {
            return (
              <h1 key={idx}>
                {idx == 0
                  ? "Reward: " + res + "kr"
                  : "Risk: " + res + "kr" + " (" + spread + "kr spread )"}
              </h1>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
