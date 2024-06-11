import React, { useState } from "react";
import Sidebar from "../Sidebar";
import ProfileHeader from "../ProfileHeader";
import Settings from "../Settings/Settings";
import Modul from "../Modul";

export default function Navbar({ active }) {
  const [showSettings, setShowSettings] = useState();
  return (
    <>
      <div></div>
      <div>
        <Sidebar active={active} />
      </div>
      <div className="hidden md:flex">
        <ProfileHeader
          setShowSettings={setShowSettings}
          showSettings={showSettings}
        />
      </div>
      {showSettings ? (
        <Modul
          header={"Settings "}
          show={showSettings}
          setShow={setShowSettings}
        >
          <Settings />
        </Modul>
      ) : null}
    </>
  );
}
