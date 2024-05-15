import React from "react";
import {
  HouseFill,
  BarChartLine,
  Person,
  Calendar,
  CalculatorFill,
} from "react-bootstrap-icons";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-full">
      <ul className="navbar">
        <li>
          <a onClick={() => navigate("/dashboard")}>
            <p>
              <BarChartLine />
            </p>
            <span className="hidden xl:flex">Dashboard</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate("/home")}>
            <p>
              <HouseFill />
            </p>
            <span className="hidden xl:flex">Home</span>
          </a>
        </li>
        <li>
          <a onClick={() => navigate("/calculator")}>
            <p>
              <CalculatorFill />
            </p>
            <span className="hidden xl:flex">Calculator</span>
          </a>
        </li>
        {/* <li>
          <a onClick={() => navigate("/calendar")}>
            <p>
              <Calendar />
            </p>
            <span className="hidden xl:flex">Economic Calendar</span>
          </a>
        </li> */}
      </ul>
    </nav>
  );
}
