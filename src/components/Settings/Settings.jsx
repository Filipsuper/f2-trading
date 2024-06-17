import React, { useContext } from "react";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";
import { parse_avanza_data } from "../../tools/import_data";
import { post_data } from "../../tools/tools";

export default function Settings() {
  const { user } = useContext(ApplicationContext);

  const Navigate = useNavigate();

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    let reader = new FileReader();

    reader.onload = async (e) => {
      let data = await parse_avanza_data(
        e.target.result,
        user.default_stop,
        user.default_target
      );

      console.log(data);

      post_data("/trades/bulk_add", data);
    };

    reader.readAsText(file);

    // console.log("files:", files[0]);
  };

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
      <div className="vertical justify-start  p-2">
        <h1>Import data</h1>
        <input
          type="file"
          onChange={handleFileSelected}
          className="file:bg-p file:border-bg file:border-solid file:rounded-md rounded-md outline-none"
        />
      </div>
      <button
        className="w-full text-xs horizontal center-v text-red-400 font-bold  p-2"
        onClick={() => {
          post_data("/trades/restart", {});
        }}
      >
        <h1 className="">I suck please restart!</h1>
      </button>
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
