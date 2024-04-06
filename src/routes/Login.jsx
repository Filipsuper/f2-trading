import React, { useContext, useRef, useState, use, useEffect } from "react";
import { post_login } from "../tools/tools";
import { ApplicationContext } from "../providers/ApplicationProvider";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [signup, setSignup] = useState(false);
  const { refresh } = useContext(ApplicationContext);
  const mailRef = useRef();
  const passwordRef = useRef();
  const [opacity, setOpacity] = useState(false);

  useEffect(() => {
    setOpacity(true);
  }, []);

  const log_in = async () => {
    let user_data = {
      username: mailRef.current.value,
      password: passwordRef.current.value,
    };
    post_login(user_data, refresh).then((res) => {
      if (res.msg) {
        setMessage(res.msg);
      } else {
        localStorage.setItem("access-token", res.access_token);
        navigate("/");
      }
    });
  };
  const toggle_signup = () => {
    setSignup(!signup);
  };

  return (
    <main className="h-screen w-full horizontal center-v center-h bg-gradient-to-tr from-gray-100 to-gray-200 ">
      <div className="absolute">
        <h1 className="text-[800px] font-bold italic text-gray-200 -z-0 ">
          F2
        </h1>
      </div>
      <div
        className={
          "z-0 min-w-fit p-10 flex flex-col bg-gray-100 border border-gray-300 rounded-xl shadow-sm transition-height " +
          (signup ? "max-h-96" : "max-h-72")
        }
      >
        {!signup ? (
          <>
            <h2 className="text-gray-400">F2 trademaxxer</h2>
            <div className="inp-cont">
              <input ref={mailRef} placeholder="Example@F2.com" type="text" />
            </div>
            <div className="inp-cont">
              <input ref={passwordRef} placeholder="Password" type="password" />
            </div>
            <p className="text-xs mt-2 text-red-300">{message}</p>

            <p className="text-xs underline text-blue-400">
              <button
                onClick={() => {
                  toggle_signup();
                }}
              >
                Create account
              </button>
            </p>

            <div className="w-full vertical center-h">
              <button
                onClick={() => {
                  log_in();
                }}
                className={
                  "text-text border p-2 w-fit rounded-md border-gray-200 bg-gray-100 hover:border-gray-400  hover:text-gray-400 transition-color trans-op opacity-0 " +
                  (opacity ? "opacity-100" : "")
                }
              >
                Log in
              </button>
            </div>
          </>
        ) : (
          <Signup toggle={toggle_signup} />
        )}
      </div>
    </main>
  );
}
