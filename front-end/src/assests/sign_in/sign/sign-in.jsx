import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookLoginUI from "./facebook-login";
import GoogleLogin from "react-google-login";
import GoogleLoginUI from "./google-login";
import { Fragment } from "react/cjs/react.production.min";
import eyeOn from "../../assests/sign_in/eye_on.png";
import eyeOff from "../../assests/sign_in/eye_off.png";
import user from "../../assests/sign_in/user.png";
import exit from "../../assests/sign_in/exit.png";
//import "./bootstrap.css";
import "./sign-in.css";
const SignIn = () => {
  const [visibility, setVisibility] = useState(eyeOff);
  const [inputType, setInputType] = useState("password");
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  let changeVisibilityHandler = () => {
    if (visibility === eyeOn) {
      setVisibility(eyeOff);
      setInputType("password");
    }
    if (visibility === eyeOff) {
      setVisibility(eyeOn);
      setInputType("text");
    }
  };
  return (
    <Fragment>
      <div className="w-440 h-500 bg-fffff ">
        <span className="w-99 h-28 hello-box">Xin chào,</span>
        <button className="square-16 exit-button">
          <img src={exit} />
        </button>

        <div className="title">Đăng nhập hoặc tạo tài khoản mới</div>
        <div>
          <div className="input-box">
            <input
              className="username-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tên đăng nhập/Email"
            />
          </div>

          <div className="input-box">
            <input
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={inputType}
              placeholder="Mật khẩu"
            />

            <button className="show-button" onClick={changeVisibilityHandler}>
              <img src={visibility} />
            </button>
          </div>

          <button className="sign-in-button">Đăng nhập</button>
          <br />

          <span className="weight-400 block m-top-19">
            <input
              type="checkbox"
              className=" border-5 border-brown square-20 m-left-32 middle"
            />
            <span className=" m-left-8 font-12 remember middle">
              Nhớ tài khoản
            </span>
            <a
              className="m-top-16 font-14 font-brown m-left-172"
              href="forgot-pass"
            >
              Quên mật khẩu?
            </a>
          </span>

          <div className="other-option">Hoặc</div>

          <div className="m-top-n-10">
            <FacebookLogin
              render={(renderProps) => <FacebookLoginUI />}
            ></FacebookLogin>

            <GoogleLogin render={(renderProps) => <GoogleLoginUI />}>
              Google
            </GoogleLogin>
          </div>

          <br />
        </div>
        <br />
        <br />

        <div className="m-top-n-57 m-left-111 font-14">
          <span className="font-14">Chưa có tài khoản? </span>
          <a className="font-14" href="sign-up">
            Đăng kí
          </a>
          <span className="font-14"> tại đây</span>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
