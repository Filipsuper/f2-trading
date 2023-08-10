import "./App.css";
import { useEffect, useState } from "react";

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
  const [winrate, setWinrate] = useState([0]);
  const [overview, setOverview] = useState([0]);

  const calculateStats = async () => {
    fetch(`http://127.0.0.1:5000/api/overview`)
      .then((res) => res.json())
      .then((data) => {
        setOverview(data);
      });

    let winners = [];
    let loosers = [];

    trades
      .filter((trade) => trade.closed == true)
      .forEach((trade, i) => {
        if (trade.pnl > 0) {
          winners.push(trade.pnl);
        } else {
          loosers.push(trade.pnl);
        }
      });

    let ratio = (
      (winners.length / (loosers.length + winners.length)) *
      100
    ).toFixed(2);

    setWinrate(ratio);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/trades`)
      .then((res) => res.json())
      .then((data) => {
        setTrades(data);
      });
  }, []);

  useEffect(() => {
    calculateStats();
  }, [trades]);

  return (
    <div className="App">
      <h1>F2 Dashboard</h1>
      <div className="cont">
        <div>
          <h1>Active trades</h1>
          <table>
            <thead>
              <tr>
                <th>TICKER</th>
                <th>GAV</th>
                <th>TARGET</th>
                <th>STOP</th>
                <th>R/R</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((a, i) => {
                if (a.closed == false) {
                  let rr = a.stop / a.price / (a.price / a.target);

                  return (
                    <tr key={i}>
                      <td>{a.ticker}</td>
                      <td>{a.price} kr</td>
                      <td>{a.target} kr</td>
                      <td>{a.stop} kr</td>
                      {rr > 1.5 ? (
                        <td className="good">{rr}</td>
                      ) : (
                        <td className="bad">{rr}</td>
                      )}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="lol">
          <h1>Stats</h1>
          <div className="test">
            <div>
              <h2>WINRATE</h2>
              <h1>{winrate} %</h1>
            </div>
            <div>
              <h2>PNL</h2>
              {overview.pnl > 0 ? (
                <h1 className="good">{overview.pnl}</h1>
              ) : (
                <h1 className="bad">{overview.pnl}</h1>
              )}
            </div>
            <div>
              <h2>AVG WIN</h2>
              {overview.average_win_size > 0 ? (
                <h1 className="good">{overview.average_win_size}</h1>
              ) : (
                <h1 className="bad">{overview.average_win_size}</h1>
              )}
            </div>
            <div>
              <h2>AVG LOSS</h2>
              {overview.average_loss_size > 0 ? (
                <h1 className="good">{overview.average_loss_size}</h1>
              ) : (
                <h1 className="bad">{overview.average_loss_size}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
