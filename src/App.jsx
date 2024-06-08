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
  const { tradesData, refresh, setDate, date } = useContext(ApplicationContext);
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
    <div className="flex flex-col  md:h-screen bg-bg gap-2 p-2">
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-44 md:flex flex-col justify-between h-full mb-4 ">
          <div className="hidden md:flex"></div>
          <div className="">
            <Sidebar active={"home"} />
          </div>
          <div className="hidden md:flex">
            <Header />
          </div>
        </div>
        <div className="flex h-screen  flex-col w-full">
          <header className="horizontal justify-start w-full px-2 py-2 center-h center-v bg-p rounded-md mb-2 gap-2 ">
            <h1 className="mr-2">Sort trades</h1>
            <button
              className="btn-cont border-r"
              onClick={() => {
                setDate("1");
              }}
            >
              <h2>Today</h2>
            </button>
            <button
              className="btn-cont"
              onClick={() => {
                setDate("5");
              }}
            >
              <h2>1 week</h2>
            </button>
            <button
              className="btn-cont"
              onClick={() => {
                setDate("24");
              }}
            >
              <h2>1 month</h2>
            </button>
            <button
              className="btn-cont"
              onClick={() => {
                setDate("all");
              }}
            >
              <h2 className="active-trade">All time</h2>
            </button>
          </header>
          <div className="w-full  md:grid md:grid-cols-8 md:gap-2 min-w-0">
            <div className=" flex h-[91vh] items-center mb-4 md:mb-0 md:col-start-1 md:col-end-9 lg:col-end-7 bg-p rounded-md shadowglow ">
              <TradeTable data={tradesData} inp={true} />
            </div>
            <div className=" mb-4 md:hidden lg:flex lg:mb-0 lg:col-start-7 lg:col-end-9">
              <Overview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
