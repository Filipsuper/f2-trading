import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  get_graph_data,
  get_overview,
  get_set_data,
  get_trades,
  get_user_data,
} from "../tools/tools";
import { Outlet } from "react-router-dom";

export const ApplicationContext = createContext({});

export const ApplicationProvider = () => {
  const [tradesData, setTradesData] = useState([]);
  const [overviewData, setOverviewData] = useState([0]);
  const [graphData, setGraphData] = useState([""]);
  const [user, setUser] = useState("test");
  const [date, setDate] = useState("all");

  useEffect(() => {
    get_set_data("/graph_data?days=" + date, setGraphData);
    get_set_data("/overview?days=" + date, setOverviewData);
  }, [date]);

  const refresh = useCallback(() => {
    console.log(date);
    get_set_data("/trades", setTradesData);
    get_set_data("/overview?days=" + date, setOverviewData);
    get_set_data("/graph_data?days=" + date, setGraphData);
    get_set_data("/user", setUser);
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        refresh,
        overviewData,
        tradesData,
        setTradesData,
        overviewData,
        setOverviewData,
        graphData,
        user,
        date,
        setDate,
      }}
    >
      <Outlet />
    </ApplicationContext.Provider>
  );
};
