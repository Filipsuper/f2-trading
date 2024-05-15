import React from "react";
import Calculator from "../components/Calculator/Calculator";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function CalculatorRoute() {
  return (
    <main className="flex flex-col md:h-screen bg-bg height-screen p-2 text-text ">
      <div className="flex h-full flex-col md:grid  md:grid-cols-10 md:grid-rows-1 md:gap-2">
        <div className="w-full h-full md:flex flex-col justify-between mb-4 md:mb-0 md:col-span-1">
          <div></div>
          <div>
            <Sidebar />
          </div>
          <div className="hidden md:flex">
            <Header />
          </div>
        </div>
        <div className="h-full horizontal center-h center-v flex-grow col-span-8 ">
          <div className="bg-p rounded-xl p-4 shadow-md">
            <Calculator />
          </div>
        </div>
      </div>
    </main>
  );
}
