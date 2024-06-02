import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function Navbar() {
  return (
    <>
      <div></div>
      <div>
        <Sidebar />
      </div>
      <div className="hidden md:flex">
        <Header />
      </div>
    </>
  );
}
