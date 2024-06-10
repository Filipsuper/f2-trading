import React, { useContext } from "react";
import { PersonFill } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";

export default function ProfileHeader() {
  const { user } = useContext(ApplicationContext);

  return (
    <header className="border-sec w-full h-10 p-2  bg-opacity-90 backdrop-blur-xl flex items-center justify-center xl:justify-between">
      <h1 className="text-md text-text hidden xl:flex">
        {user.username?.split("@")[0]}
      </h1>
      <button className="text-3xl text-gray-500">
        <PersonFill />
      </button>
    </header>
  );
}
