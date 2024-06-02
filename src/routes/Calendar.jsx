import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";

export default function Calendar() {
  const CalendarItem = ({ props }) => {
    const { time, text } = props;
    return (
      <div className="h-16 flex horizontal center-h border-b text-black">
        <div className="h-full w-full grid grid-cols-4">
          <div>
            <h1>{time}</h1>
          </div>
          <div>
            <h1>{text}</h1>
          </div>
        </div>
      </div>
    );
  };

  const data = [
    { time: "00.59", text: "hej" },
    { time: "00.30", text: "hej2" },
  ];

  return (
    <main className="flex flex-col md:h-screen bg-bg height-screen p-2 text-text ">
      <div className="flex h-full flex-col md:grid  md:grid-cols-10 md:grid-rows-1 md:gap-2">
        <Navbar />
        <div className="h-full flex-grow col-span-6 bg-p rounded-xl p-4">
          <h1 className="text-xl font-bold">In progress</h1>
        </div>
      </div>
    </main>
  );
}
