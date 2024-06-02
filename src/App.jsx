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
    <div className="flex flex-col md:h-screen bg-bg height-screen p-2 ">
      <div className="h-full flex flex-col md:grid md:grid-cols-10 md:grid-rows-1 md:gap-2">
        <div className="w-full md:flex flex-col justify-between h-full mb-4 md:mb-0 md:col-span-1">
          <div className="hidden md:flex"></div>
          <div className="">
            <Sidebar />
          </div>
          <div className="hidden md:flex">
            <Header />
          </div>
        </div>
        <div className="h-full flex items-center mb-4 md:mb-0 flex-grow md:col-start-2 md:col-end-11 lg:col-end-9 bg-p rounded-md shadowglow">
          <TradeTable data={tradesData} inp={true} />
        </div>
        <div className="flex-grow mb-4 md:hidden lg:flex lg:mb-0 lg:col-start-9 lg:col-end-11">
          <Overview />
        </div>
      </div>
    </div>
  );
}

export default App;
