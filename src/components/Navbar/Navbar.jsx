import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import ProfileHeader from "../ProfileHeader";
import Settings from "../Settings/Settings";
import Modul from "../Modul";
import { ApplicationContext } from "../../providers/ApplicationProvider";

export default function Navbar({ active }) {
  const [showSettings, setShowSettings] = useState();
  const { refresh } = useContext(ApplicationContext);

  useEffect(() => {
    refresh();
  }, [showSettings]);

  return (
    <>
      <div></div>
      <div>
        <Sidebar active={active} />
      </div>
      <div className="">
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
          <Settings setShow={setShowSettings} />
        </Modul>
      ) : null}
    </>
  );
}
