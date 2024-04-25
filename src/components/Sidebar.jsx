import React from "react";
import { HouseFill, BarChartLine, Person } from "react-bootstrap-icons";
import Header from "./Header";

export default function Sidebar() {
  return (
    <nav className="w-full h-full">
      <ul className="navbar">
        <li>
          <a href="/home">
            <p>
              <HouseFill />
            </p>
            <span className="hidden xl:flex">Home</span>
          </a>
        </li>
        <li>
          <a href="/dashboard">
            <p>
              <BarChartLine />
            </p>
            <span className="hidden xl:flex">Dashboard</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
