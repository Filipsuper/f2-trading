import "./App.css";
import {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  useCallback,
} from "react";
import TradeItem from "./components/TradeItems/TradeItem";
import TradeInput from "./components/TradeInput";
import Overview from "./components/Overview/Overview";
import { get_overview, get_prices, get_trades } from "./tools/tools";
import TradeItemClosed from "./components/TradeItems/TradeItemClosed";
import Header from "./components/Header";
import TradeTable from "./components/TradeTable";
import Sidebar from "./components/Sidebar";
import { ApplicationContext } from "./providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";

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
  const { tradesData, refresh } = useContext(ApplicationContext);
  const [stockPrices, setStockPrices] = useState([]);
  const navigate = useNavigate();

  const parseJWT = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const is_expired = (exp) => {
    let new_date = new Date(exp * 1000);
    let now = new Date();
    return new_date < now;
  };

  const checkTimeout = () => {
    //GET token and check if it exists and then check expiration
    const token = localStorage.getItem("access-token");
    if (token) {
      const exp_data = parseJWT(token).exp;
      if (is_expired(exp_data)) {
        navigate("/login");
      }
    } else {
      navigate("/login"); // if it does not exist naivate to /login
    }
  };

  useEffect(() => {
    checkTimeout();
    refresh();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-tr from-white to-gray-50 box-border p-2">
      <div className="h-fit grid grid-cols-1 grid-rows-1 md:grid-cols-8 md:grid-rows-1 gap-2">
        <div className="w-full flex flex-col md:col-span-2 ">
          <div className="mb-2">
            <Sidebar />
          </div>
          <div className="rounded-xl p-2 border bg-gray-100 flex-grow">
            <Overview />
          </div>
        </div>
        <div className="h-full flex flex-grow md:col-start-3 md:col-end-9 ">
          <TradeTable data={tradesData} inp={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
