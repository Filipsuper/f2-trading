import React, { useContext, useRef, useState, use, useEffect } from "react";
import { ApplicationContext } from "../providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { create_account } from "../tools/tools";

export default function Signup(props) {
  const mailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const targetRef = useRef();
  const stopRef = useRef();
  const sizeRef = useRef();
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(false);
  const [next, setNext] = useState(false);
  const [userData, setUserData] = useState({});
  const { toggle, setMessage } = props;

  useEffect(() => {
    setOpacity(!opacity);
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

  const validate_input_fields = () => {
    // CHECK IF PASSWORDS ARE MATCHING AND IF INPUTS ARE EMPTY
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      setMessage("Passwords does not match");
      return true;
    } else if (
      passwordConfirmRef.current.value === "" ||
      passwordRef.current.value === "" ||
      mailRef.current.value === ""
    ) {
      setMessage("Missing fields");
      return true;
    } else return false;
  };

  const toggle_next = () => {
    //HANDLE VALIDATION
    if (validate_input_fields()) return;

    setNext(!next);
    setUserData({
      email: mailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const SignUpComp = () => {
    return (
      <>
        <div className="flex items-start mb-2">
          <button
            className="text-text flex justify-center text-xl"
            onClick={() => {
              toggle();
            }}
          >
            <ArrowLeftCircleFill />
          </button>
        </div>
        <h2 className="text-text">F2 Trademaxxer</h2>
        <div className="inp-cont">
          <input ref={mailRef} placeholder="Example@F2.com" type="email" />
        </div>
        <div className="inp-cont">
          <input ref={passwordRef} placeholder="Password" type="password" />
        </div>
        <div className="inp-cont">
          <input
            ref={passwordConfirmRef}
            placeholder="Confirm password"
            type="password"
            className="trans-op-500"
          />
        </div>

        <div className="w-full flex flex-row h-full mt-4 items-center justify-center">
          <button
            onClick={() => {
              toggle_next();
            }}
            className={
              "text-text p-2 w-fit rounded-md  bg-sec hover:text-a  trans-op-1000"
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
            className="text-text flex justify-center text-xl"
            onClick={() => toggle()}
          >
            <ArrowLeftCircleFill />
          </button>
        </div>
        <h2 className="text-gray-400">Setup Default Values</h2>
        <div className="inp-cont">
          <input ref={targetRef} placeholder="Target %" type="number" />
        </div>

        <div className={"inp-cont "}>
          <input
            ref={stopRef}
            placeholder="Stop %"
            type="number"
            className={"h-full trans-op-500"}
          />
        </div>
        <div className={"inp-cont  "}>
          <input
            ref={sizeRef}
            placeholder="Size (kr)"
            type="text"
            className={"h-full trans-op-1000"}
          />
        </div>

        <div className="w-full flex flex-row h-full mt-4 items-center justify-center">
          <button
            onClick={() => {
              signup();
            }}
            className={
              "text-text p-2 w-fit rounded-md bg-sec hover:text-a trans-op-1500"
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
