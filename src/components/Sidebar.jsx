import React from "react";
import { HouseFill, BarChartLine } from "react-bootstrap-icons";
import Header from "./Header";

export default function Sidebar() {
  return (
    <nav className="w-full">
      <ul className="navbar">
        <li>
          <a href="/home">
            <HouseFill />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/dashboard">
            <BarChartLine />
            <span>Dashboard</span>
          </a>
        </li>
      </ul>
      <Header />
    </nav>
  );
}
