import React, { useContext } from "react";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Header() {
  const { setDate, date } = useContext(ApplicationContext);
  const dateOptions = ["1", "5", "30", "90", "180", "all"];

  return (
    <header className="text-text horizontal justify-start w-full px-2 py-2 center-h center-v bg-p rounded-md mb-2 gap-2 container-style ">
      <h1 className="mr-2 ">Sort trades</h1>

      {dateOptions.map((option) => {
        return (
          <button
            key={option}
            className={`btn-cont pr-2 border-r border-r-gr h-full ${
              date === option ? "text-a" : ""
            }`}
            onClick={() => {
              setDate(option);
            }}
          >
            <h2>{option}</h2>
          </button>
        );
      })}

      {/* <button
        className="btn-cont pr-2 border-r border-r-gr h-full"
        onClick={() => {
          setDate("1");
        }}
      >
        <h2>Today</h2>
      </button>
      <button
        className="btn-cont pr-2 border-r h-full border-r-gr"
        onClick={() => {
          setDate("5");
        }}
      >
        <h2>1 week</h2>
      </button>
      <button
        className="btn-cont pr-2 border-r h-full border-r-gr"
        onClick={() => {
          setDate("30");
        }}
      >
        <h2>1 month</h2>
      </button>
      <button
        className="btn-cont pr-2 border-r h-full border-r-gr"
        onClick={() => {
          setDate("90");
        }}
      >
        <h2>3 month</h2>
      </button>
      <button
        className="btn-cont pr-2 border-r h-full border-r-gr"
        onClick={() => {
          setDate("180");
        }}
      >
        <h2>6 month</h2>
      </button>
      <button
        className="btn-cont h-full"
        onClick={() => {
          setDate("all");
        }}
      >
        <h2 className="active-trade">All time</h2>
      </button> */}
    </header>
  );
}
