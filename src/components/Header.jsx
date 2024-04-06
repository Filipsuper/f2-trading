import React, { useContext } from "react";
import { PersonFill } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";

export default function Header() {
  const { user } = useContext(ApplicationContext);

  return (
    <header className="w-full h-10 p-2  bg-opacity-90 backdrop-blur-xl border bg-gray-100 flex items-center justify-between rounded-lg">
      <h1 className="text-md text-text">{user.username}</h1>
      <button className="text-3xl ">
        <PersonFill />
      </button>
    </header>
  );
}
