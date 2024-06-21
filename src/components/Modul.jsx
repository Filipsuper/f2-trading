import React, { useContext } from "react";
import { X } from "react-bootstrap-icons";
import { ApplicationContext } from "../providers/ApplicationProvider";

export default function Modul(props) {
  const { refresh } = useContext(ApplicationContext);
  const { header, show, setShow } = props;

  return (
    <div className="absolute z-50 right-0 top-0 bg-opacity-20  bg-black  w-full h-screen horizontal center-h center-v">
      <div className="flex flex-col text-text top-1/3 bg-sec  border border-gradient-2 shadow-xl rounded-md p-1">
        <div className="flex flex-row h-6 justify-between items-center border-b border-gradient-2 p-2 pb-2">
          <h1 className="text-sm">{header}</h1>
          <div>
            <button
              onClick={() => {
                setShow(!show);
                refresh();
              }}
            >
              <X />
            </button>
          </div>
        </div>
        <div className="h-full w-full p-1">{props.children}</div>
      </div>
    </div>
  );
}
