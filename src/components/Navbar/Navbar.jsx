import React from "react";
import Sidebar from "../Sidebar";
import ProfileHeader from "../ProfileHeader";

export default function Navbar({ active }) {
  return (
    <>
      <div></div>
      <div>
        <Sidebar active={active} />
      </div>
      <div className="hidden md:flex">
        <ProfileHeader />
      </div>
    </>
  );
}
