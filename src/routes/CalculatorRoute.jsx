import React from "react";
import Calculator from "../components/Calculator/Calculator";
import Sidebar from "../components/Sidebar";

import ProfileHeader from "../components/ProfileHeader";

export default function CalculatorRoute() {
  return (
    <main className="flex flex-col md:flex-row md:h-screen bg-bg height-screen p-2 text-text ">
      <div className="w-full md:w-44 h-full md:flex flex-col justify-between mb-4 md:mb-0 md:col-span-1">
        <div></div>
        <div>
          <Sidebar active={"calculator"} />
        </div>
        <div className="hidden md:flex">
          <ProfileHeader />
        </div>
      </div>
      <div className="flex h-full w-full flex-col ">
        <div className="h-full horizontal center-h center-v flex-grow col-span-8 ">
          <div className="bg-sec rounded-xl p-4 shadow-md">
            <Calculator />
          </div>
        </div>
      </div>
    </main>
  );
}
