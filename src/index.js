import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import { ApplicationProvider } from "./providers/ApplicationProvider";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ErrorPage from "./components/ErrorPage";
import Calendar from "./routes/Calendar";
import CalculatorRoute from "./routes/CalculatorRoute";

const router = createBrowserRouter([
  {
    element: <ApplicationProvider />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/Calendar",
        element: <Calendar />,
      },
      {
        path: "/Calculator",
        element: <CalculatorRoute />,
      },
      {
        path: "*",
        element: <App />,
      },
      {},
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
