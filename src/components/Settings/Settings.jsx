import React, { useContext } from "react";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user } = useContext(ApplicationContext);

  const Navigate = useNavigate();
  console.log(user);

  return (
    <div>
      <div className="horizontal center-h p-2">
        <h1 className="mr-2 border p-2 bg-bg ">User</h1>
        <h1>{user.username}</h1>
      </div>
      <div className="horizontal center-h p-2">
        <h1 className="mr-2 border p-2 bg-bg ">Account Size</h1>
        <h1>{user.default_size} kr</h1>
      </div>
      <div className="horizontal center-h p-2">
        <h1 className="mr-2 border p-2 bg-bg ">Default Stop</h1>
        <h1>{user.default_stop} %</h1>
      </div>
      <div className="horizontal center-h p-2">
        <h1 className="mr-2 border p-2 bg-bg ">Default Target</h1>
        <h1>{user.default_target} %</h1>
      </div>
      <button
        className="w-full horizontal center-v text-red-400 p-2"
        onClick={() => {
          localStorage.removeItem("access-token");

          Navigate("/login");
        }}
      >
        <h1 className="">Log out</h1>
      </button>
    </div>
  );
}
