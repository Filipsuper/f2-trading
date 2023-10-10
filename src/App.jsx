import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "UTV",
    },
  },
};

function App() {
  const [leverage, setLeverage] = useState([]);
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
    fetch("https://uat-api.marketmate.se/instruments/list?size=20&page=1", {
      headers: {
        accept: "application/json",
        "accept-language": "sv-SE",
        authorization: "Bearer undefined",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://www.marketmate.se/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body:
        '{"type":"DEFAULT","sortBy":null,"sortDirection":null,"filter":{"search":"' +
        searchQuery +
        '","selectedFilters":[{"name":"CLASS","values":["INDEX"]},{"name":"LEVERAGE","values":["0","1000000"]},{"name":"SPREAD","values":["0","1000000"]}]}}',
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [searchQuery]);

  useEffect(() => {
    if (data.data == undefined) return;
    calculate_risk();
  }, [data]);

  const leverage_toggle = (leverage) => {
    inp.current.value = leverage;
  };

  const on_calculate = () => {
    let product_val = product.current.value;
    setSearchQuery(product_val);
  };

  const calculate_risk = () => {
    let size_val = size.current.value;
    let price_val = price.current.value;
    let risk_val = risk.current.value;
    let reward_val = reward.current.value;

    let leverage_val = 1;
    let spread_val = 0;

    if (data.data != undefined) {
      if (data.data.length == 0) {
        setResults(["Kunde inte hitta produkten"]);
        return;
      }
      leverage_val = data.data[0].fundleverage;
      spread_val = size_val * (data.data[0].spreadpct / 100);
      console.log(spread_val);
      setSpread(spread_val);
    }

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
    <div className="App">
      <h1>CERT KALKYLATOR</h1>
      <div className="cont">
        <ul>
          <div className="inp-cont">
            <div className="text-div">
              <h2>Produkt</h2>
            </div>
            <input type="text" ref={product} />
          </div>
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

          {/* <div className=" inp-cont leverage">
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
          </div> */}
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

export default App;
