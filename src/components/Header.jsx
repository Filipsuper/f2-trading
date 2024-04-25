import React, { useContext } from "react";
import { PersonFill } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";

export default function Header() {
  const { user } = useContext(ApplicationContext);

  return (
    <header className="border-sec w-full h-10 p-2  bg-opacity-90 backdrop-blur-xl flex items-center justify-center xl:justify-between">
      <h1 className="text-md text-text hidden xl:flex">{user.username}</h1>
      <button className="text-3xl text-bg">
        <PersonFill />
      </button>
    </header>
  );
}
