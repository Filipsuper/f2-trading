import React, { useRef } from "react";
import {
  HouseFill,
  BarChartLine,
  Person,
  Calendar,
  CalculatorFill,
} from "react-bootstrap-icons";
import Header from "./ProfileHeader";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active }) {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-full">
      <ul className="navbar">
        <li>
          <a
            className={active == "dashboard" ? "text-a" : null}
            onClick={() => navigate("/dashboard")}
          >
            <p>
              <BarChartLine />
            </p>
            <span className="hidden xl:flex">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            className={active == "home" ? "text-a" : null}
            onClick={() => navigate("/home")}
          >
            <p>
              <HouseFill />
            </p>
            <span className="hidden xl:flex ">Home</span>
          </a>
        </li>
        <li>
          <a
            className={active == "calculator" ? "text-a" : null}
            onClick={() => navigate("/calculator")}
          >
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
