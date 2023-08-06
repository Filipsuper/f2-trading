import "./App.css";
import { useEffect, useState } from "react";
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
  const [trades, setTrades] = useState([]);
  const [pnl, setPnl] = useState([1, 2]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/trades`)
      .then((res) => res.json())
      .then((data) => {
        setTrades(data);
      });
  }, []);

  useEffect(() => {
    calculateGraphData(trades);
  }, [trades]);

  const calculateGraphData = (log) => {
    let data = log.filter((a) => a.closed == true);
    data.forEach((element) => {
      console.log(element.pnl);
      setPnl([...pnl, element.pnl]);
    });
  };

  return (
    <div className="App">
      <h1>F2 Dashboard</h1>
      <div className="cont">
        <ul>
          {trades.map((a, i) => {
            if (a.closed == false) {
              return (
                <li key={i}>
                  <h2>{a.ticker}</h2>
                  <h2></h2>
                </li>
              );
            }
          })}
        </ul>
        <div className="lol">
          <h1>Chart</h1>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
