import React, { useContext } from "react";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Header() {
  const { setDate, date } = useContext(ApplicationContext);

  return (
    <header className="horizontal justify-start w-full px-2 py-2 center-h center-v bg-p rounded-md mb-2 gap-2 container-style">
      <h1 className="mr-2">Sort trades</h1>
      <button
        className="btn-cont border-r h-full"
        onClick={() => {
          setDate("1");
        }}
      >
        <h2>Today</h2>
      </button>
      <button
        className="btn-cont border-r h-full"
        onClick={() => {
          setDate("5");
        }}
      >
        <h2>1 week</h2>
      </button>
      <button
        className="btn-cont border-r h-full"
        onClick={() => {
          setDate("24");
        }}
      >
        <h2>1 month</h2>
      </button>
      <button
        className="btn-cont h-full"
        onClick={() => {
          setDate("all");
        }}
      >
        <h2 className="active-trade">All time</h2>
      </button>
    </header>
  );
}
