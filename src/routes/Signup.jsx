import React, { useContext, useRef, useState, use, useEffect } from "react";
import { ApplicationContext } from "../providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { create_account } from "../tools/tools";

export default function Signup({ toggle }) {
  const mailRef = useRef();
  const passwordRef = useRef();
  const targetRef = useRef();
  const stopRef = useRef();
  const sizeRef = useRef();
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(false);
  const [next, setNext] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setOpacity(true);
  }, []);

  const signup = () => {
    const data = {
      email: userData.email,
      password: userData.password,
      defaultTarget: targetRef.current.value,
      defaultStop: stopRef.current.value,
      defaultSize: sizeRef.current.value,
    };

    create_account(data)
      .then((res) => console.log(res))
      .then(toggle());
  };

  const SignUpComp = () => {
    return (
      <>
        <div className="flex items-start mb-2">
          <button
            className="text-gray-300 flex justify-center text-xl"
            onClick={() => toggle()}
          >
            <ArrowLeftCircleFill />
          </button>
        </div>
        <h2 className="text-gray-400">F2 Trademaxxer</h2>
        <div className="inp-cont">
          <input ref={mailRef} placeholder="Example@F2.com" type="email" />
        </div>
        <div className="inp-cont">
          <input
            ref={passwordRef}
            onChange={() => {}}
            placeholder="Password"
            type="password"
          />
        </div>

        <div
          className={
            "inp-cont  trans-op-500 opacity-0" + (opacity ? "opacity-100" : "")
          }
        >
          <input
            ref={passwordRef}
            placeholder="Confirm password"
            type="password"
            className={
              "trans-op-500 opacity-0 " + (opacity ? "opacity-100" : "")
            }
          />
        </div>

        <div className="w-full flex flex-row h-full mt-4 items-center justify-center">
          <button
            onClick={() => {
              setNext(!next);
              setUserData({
                email: mailRef.current.value,
                password: passwordRef.current.value,
              });
            }}
            className={
              "text-text  border p-2 w-fit rounded-md border-gray-200 bg-gray-100 hover:border-gray-400  hover:text-gray-500  trans-op-1000  opacity-0 " +
              (opacity ? "opacity-100" : "")
            }
          >
            Next
          </button>
        </div>
      </>
    );
  };

  const NextComp = () => {
    return (
      <>
        <div className="flex items-start mb-2">
          <button
            className="text-gray-300 flex justify-center text-xl"
            onClick={() => toggle()}
          >
            <ArrowLeftCircleFill />
          </button>
        </div>
        <h2 className="text-gray-400">Setup Default Values</h2>
        <div className="inp-cont">
          <input ref={targetRef} placeholder="Target %" type="number" />
        </div>

        <div
          className={
            "inp-cont  trans-op-500 opacity-0" + (opacity ? "opacity-100" : "")
          }
        >
          <input
            ref={stopRef}
            placeholder="Stop %"
            type="number"
            className={
              "h-full trans-op-500 opacity-0 " + (opacity ? "opacity-100" : "")
            }
          />
        </div>
        <div
          className={
            "inp-cont  trans-op-500 opacity-0" + (opacity ? "opacity-100" : "")
          }
        >
          <input
            ref={sizeRef}
            placeholder="Size (kr)"
            type="text"
            className={
              "h-full trans-op-500 opacity-0 " + (opacity ? "opacity-100" : "")
            }
          />
        </div>

        <div className="w-full flex flex-row h-full mt-4 items-center justify-center">
          <button
            onClick={() => {
              signup();
            }}
            className={
              "text-text  border p-2 w-fit rounded-md border-gray-200 bg-gray-100 hover:border-gray-400  hover:text-gray-500  trans-op-1000  opacity-0 " +
              (opacity ? "opacity-100" : "")
            }
          >
            Sign Up
          </button>
        </div>
      </>
    );
  };

  return <>{!next ? <SignUpComp /> : <NextComp />}</>;
}
