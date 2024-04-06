import React, { useState, createContext, useCallback, useContext } from "react";
import {
  get_graph_data,
  get_overview,
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

  const refresh = useCallback(() => {
    get_trades(setTradesData);
    get_overview(setOverviewData);
    get_graph_data(setGraphData);
    get_user_data().then((res) => setUser(res));
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
      }}
    >
      <Outlet />
    </ApplicationContext.Provider>
  );
};
