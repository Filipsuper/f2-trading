import React, { useContext, useState } from "react";
import { PersonFill } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";
import Settings from "./Settings/Settings";
import Modul from "./Modul";

export default function ProfileHeader(props) {
  const { user } = useContext(ApplicationContext);
  const { setShowSettings, showSettings } = props;

  return (
    <header className="border-sec w-full h-10 p-2  bg-opacity-90 backdrop-blur-xl flex items-center justify-center xl:justify-between">
      <h1 className="text-md text-text hidden xl:flex">
        {user.username?.split("@")[0]}
      </h1>
      <button
        className="text-3xl text-gray-500 "
        onClick={() => {
          setShowSettings(!showSettings);
        }}
      >
        <PersonFill />
      </button>
    </header>
  );
}
