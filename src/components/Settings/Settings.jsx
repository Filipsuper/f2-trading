import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";
import { parse_avanza_data } from "../../tools/import_data";
import { post_data } from "../../tools/tools";
import Modul from "../Modul";
import Loading from "../misc/Loading";
import ToggleButton from "../misc/ToggleButton";
import { Trash2 } from "react-bootstrap-icons";
import { ConfirmCont } from "../misc/Confirm";

export default function Settings(props) {
  const { user, toggleDarkMode } = useContext(ApplicationContext);
  const [confirm, showConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setShow } = props;

  const Navigate = useNavigate();

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    let reader = new FileReader();

    reader.onload = async (e) => {
      setIsLoading(true);
      let data = await parse_avanza_data(
        e.target.result,
        user.default_stop,
        user.default_target
      );

      post_data("/trades/bulk_add", data).then((res) => {
        setShow(false);
      });
    };

    reader.readAsText(file);
  };

  const UserRow = (props) => {
    return (
      <div className="horizontal center-h justify-between p-2 w-5/6">
        <h1>{props.header}</h1>
        <h1 className="ml-2 border border-gradient-2 p-2 bg-bg rounded-md">
          {props.value}
        </h1>
        {props.children}
      </div>
    );
  };

  const confirmFunc = () => {
    setIsLoading(true);

    post_data("/trades/restart", {}).then((res) => {
      setIsLoading(false);
      setShow(false);
    });
  };

  const cancelFunc = () => {
    showConfirm(false);
  };

  return (
    <div className="text-text 2 vertical center-h">
      <UserRow header="Username" value={user.username} />
      <UserRow header="Account Size" value={user.default_size + " kr"} />
      <UserRow header="Default Stop" value={user.default_stop + " %"} />
      <UserRow header="Default Target" value={user.default_target + " %"} />
      <div className="horizontal center-h justify-between p-2 w-5/6">
        <h1 className="">Darkmode</h1>
        <ToggleButton func={toggleDarkMode} />
      </div>
      <div className="horizontal center-h justify-between p-2 w-5/6">
        <h1>Import trades</h1>
        <div className="w-2/3 flex-row ">
          <input
            type="file"
            onChange={handleFileSelected}
            className="w-full file:bg-bg file:text-text file:border-none file:rounded-md  rounded-md outline-none border-bg p-2 hover:border-a hover:cursor-pointer transition-colors"
          />
        </div>
      </div>
      <button
        className="w-full text-xs horizontal center-v text-red-700 font-bold  p-2"
        onClick={() => {
          showConfirm(!confirm);
          // post_data("/trades/restart", {});
        }}
      >
        <h1 className="bg-red-400 w-1/2 py-2 rounded-md horizontal center-h center-v">
          <span className="text-xl p-0 mr-2 text-red-700">
            <Trash2 />
          </span>
          I suck please restart!
        </h1>
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
      <div>{isLoading ? <Loading /> : null}</div>
      {confirm ? (
        <Modul setShow={showConfirm} show={confirm}>
          <ConfirmCont confirmFunc={confirmFunc} cancelFunc={cancelFunc} />
        </Modul>
      ) : null}
    </div>
  );
}
