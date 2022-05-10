import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookLoginUI from "./facebook-login";
import GoogleLogin from "react-google-login";
import GoogleLoginUI from "./google-login";
import { Fragment } from "react/cjs/react.production.min";
import eyeOn from "../../assests/sign_in/eye_on.png";
import eyeOff from "../../assests/sign_in/eye_off.png";
import exit from "../../assests/sign_in/exit.png";
import { checkValidEmail } from "./valid-email"
import { checkValidPassword } from "./valid-password"
import axios from 'axios'
import Cookies from 'js-cookie';
import { showErrMsg } from './notification/notification'
import Popup from 'reactjs-popup';
import SignUp from "./sign-up"
//import "./bootstrap.css";
import "./sign-in.css";
var posX = window.innerWidth;
window.onresize = () => {
  posX = window.innerWidth;
}
const SignIn = ({ setIsShowSignIn, handleSignUp, isSignUpOpen, setIsLogin , handleForgotOpen: handleShowForgotForm}) => {
  const [visibility, setVisibility] = useState(eyeOff);
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [emailError, setEmailError] = useState();
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(true);
  const facebookAppID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  const googleAppID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isRememberMe, setIsRemember] = useState(false);
  const history = useHistory()
  useEffect(() => {
    //Check if the Cookies name rememberStatus is exist to prevent null exception
    const userEmail = Cookies.get("userEmail");
    const userPassword = Cookies.get("userPassword");
    if (userEmail && userPassword) {
      setEmail(userEmail);
      setPassword(userPassword);
      setIsRemember(true);
    }
  }, [])
  const setUserCookies = (email, password) => {
    Cookies.set("userEmail", email);
    Cookies.set("userPassword", password);
  }
  const removeUserCookies = () => {
    Cookies.remove("userEmail");
    Cookies.remove("userPassword");
  }
  const responseFacebook = (response) => {
    setError("")
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken);
  }
  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/facebook`, {
        userID,
        accessToken
      })
      .then(res => {
        // Đăng nhập thành công, bên server sẽ trả về user ở body và bearer token ở header
        const { cardNumber, role } = res.data.user

        const bearerToken = res.headers['authorization']
        Cookies.set('bearerToken', bearerToken);
        if (bearerToken.startsWith('Bearer ')) {
          const token = bearerToken.substring(7, bearerToken.length);
          Cookies.set('token', token);
        }
        setError("")

        if (role == 'USER' || role == 'ADMIN') {
          setIsLogin();
        }
        if (cardNumber == null) alert("Tài khoản chưa đầy đủ thông tin, vui lòng cập nhật sau");

      })
      .catch(error => {
        setError("Đăng nhập bằng Facebook thất bại")
      });
  };

  const responseGoogle = (response) => {
    setError("")
    console.log(response);
    sendGoogleToken(response.tokenId)
  }

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/google`, {
        idToken: tokenId
      })
      .then(res => {
        const { cardNumber, role } = res.data.user

        const bearerToken = res.headers['authorization']
        Cookies.set('bearerToken', bearerToken);
        if (bearerToken.startsWith('Bearer ')) {
          const token = bearerToken.substring(7, bearerToken.length);
          Cookies.set('token', token);
        }

        setError("")

        if (role == 'USER' || role == 'ADMIN') {
          setIsLogin();
        }
        if (cardNumber == null) alert("Tài khoản chưa đầy đủ thông tin, vui lòng cập nhật sau");
        setIsShowSignIn();
      })
      .catch(error => {
        setError("Đăng nhập bằng Google thất bại")

      });
  };
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
  const loginHandler = () => {
    setError("")
    setValidEmail(checkValidEmail(email));
    setValidPassword(checkValidPassword(password));
    setCheckEmptyPassword(password);

    if (!checkValidEmail(email)) {
      setEmailError(email ? "Email sai định dạng" : "Email không được để trống")
    }
    if (checkValidEmail(email) && password) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
          email: email,
          password: password
        })
        .then(res => {
          const { role } = res.data.user
          const bearerToken = res.headers['authorization']
          if (isRememberMe) {
            setUserCookies(email, password);
          }
          else {
            const emailInCookies = Cookies.get("userEmail");
            const passwordInCookies = Cookies.get("userPassword");
            if (emailInCookies === email && passwordInCookies === password) {
              removeUserCookies();
            }
          }
          Cookies.set('bearerToken', bearerToken);
          if (bearerToken.startsWith('Bearer ')) {
            const token = bearerToken.substring(7, bearerToken.length);
            Cookies.set('token', token);
          }
          setEmail("");
          setPassword("");
          setError("")
          if (role == 'USER' || role == 'ADMIN') {
            setIsLogin();
          }
          setIsShowSignIn();
        })
        .catch(err => {
          setError("Sai email hoặc mật khẩu")
        });
    }
  }


  const handleShowLoginForm = () => {
    setIsShowSignIn();
  }
  return (
    <Fragment>
      <div className="container-sign-in w-440 h-auto bg-fffff border-radius-20 ">
        <span className="w-99 h-28 hello-box">Xin chào,</span>
        <button onClick={handleShowLoginForm} className="square-16 exit-button">
          <img src={exit} />
        </button>

        <div className="title-sign-in">Đăng nhập hoặc tạo tài khoản mới</div>
        {error && showErrMsg(error)}
        <div>
          <div className={validEmail ? "input-box" : "wrong-input-format"}>
            <input
              className="username-input"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidEmail(true) }}
              placeholder="Email"
            />
          </div>
          {!validEmail && <small className="text-danger">{emailError}</small>}
          <div className={checkEmptyPassword ? "input-box" : "wrong-input-format"}>
            <input
              className="password-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setCheckEmptyPassword(true) }}
              type={inputType}
              placeholder="Mật khẩu"
            />

            <button className="show-button" onClick={changeVisibilityHandler}>
              <img src={visibility} />
            </button>
          </div>
          {!checkEmptyPassword && <small className="text-danger">Mật khẩu không được để trống</small>}
          <button onClick={loginHandler} className="sign-in-button">Đăng nhập</button>
          <br />

          <span className="weight-400 block m-top-10">
            <input
              type="checkbox"
              checked={isRememberMe}
              onClick={() => {
                setIsRemember(!isRememberMe)
              }}
              className=" border-5 border-brown square-20 m-left-32 signin-middle"
            />
            <span className=" m-left-8 font-12 remember signin-bottom">
              Nhớ tài khoản
            </span>
            <button
              onClick = {handleShowForgotForm}
              className="m-top-16 font-14 font-brown m-left-172 sign-in-anchor weight-400"
            >
              Quên mật khẩu?
            </button>
          </span>

          <div className="other-option"><span className="other-text">Hoặc</span></div>

          <div className="m-top-12">
            <FacebookLogin
              appId={facebookAppID}
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              render={renderProps => (
                <FacebookLoginUI onPress={renderProps.onClick} />
              )}
            ></FacebookLogin>

            <GoogleLogin
              clientId={googleAppID}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <GoogleLoginUI onPress={renderProps.onClick} />
              )}

            />
          </div>

          <br />
        </div>
        <br />
        <br />

        <div className="m-top-n-57 m-left-111 font-14 padding-bot-18">
          <span className="font-14  weight-400">Chưa có tài khoản? </span>
          <button onClick={handleSignUp} className="font-14 sign-in-anchor  weight-400">Đăng ký</button>
          {/* <Popup
            open={isSignUpOpen}
            offsetX={475}
            position="right center"
            closeOnDocumentClick={false}
            arrow={false}>
            {close => <SignUp close={close} />}
          </Popup> */}

          <span className="font-14  weight-400"> tại đây</span>
        </div>
      </div >
    </Fragment >
  );
};

export default SignIn;
