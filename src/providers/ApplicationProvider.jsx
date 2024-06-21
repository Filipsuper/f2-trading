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
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for dark mode preference
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    return isDarkMode;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  });

  useEffect(() => {
    get_set_data("/graph_data?days=" + date, setGraphData);
    get_set_data("/overview?days=" + date, setOverviewData);
  }, [date]);

  const refresh = useCallback(() => {
    get_set_data("/trades", setTradesData);
    get_set_data("/overview?days=" + date, setOverviewData);
    get_set_data("/graph_data?days=" + date, setGraphData);
    get_set_data("/user", setUser);
  }, []);

  useEffect(() => {
    // Apply the dark mode class based on state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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
        toggleDarkMode,
        darkMode,
      }}
    >
      <Outlet />
    </ApplicationContext.Provider>
  );
};
