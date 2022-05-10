import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './change-password.css'

import exit from '../../assests/forgot_password/exit.png'
import eyeOn from "../../assests/sign_up/eye_on.png"
import eyeOff from "../../assests/sign_up/eye_off.png"
import { checkValidPassword } from './valid-password';
import axios from 'axios'
import { showErrMsg } from './notification/notification'
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import WebFont from 'webfontloader'
const jwt = require('jsonwebtoken')
function ChangePassword() {
    const history = useHistory();
    const { reset_token } = useParams();
    const [announce, setAnnounce] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidRePassword, setIsValidRePassword] = useState(true);
    const [passVisibility, setPassVisibility] = useState(eyeOff);
    const [rePassVisibility, setRePassVisibility] = useState(eyeOff);
    const [inputType, setInputType] = useState("password");
    const [reInputType, setReInputType] = useState("password");
    const [passwordError, setPasswordError] = useState();
    const [rePasswordError, setRePasswordError] = useState();
    const [isValidToken, setIsValidToken] = useState(true);
    const [error, setError] = useState("");

    function getPasswordError(password) {
        let errorMessage = "";
        if (!checkValidPassword(password)) {
            errorMessage = password
                ? "Mật khẩu tối thiểu 6 ký tự bao gồm tối thiểu 1 ký tự in hoa và 1 chữ số"
                : "Mật khẩu không được trống";
            setIsValidPassword(false);
            setPasswordError(errorMessage);
        }
        else {
            setIsValidPassword(true);
        }
    }
    function getRePasswordError(password, rePassword) {
        let errorMessage = "";
        if (rePassword == password && rePassword && password) {
            setIsValidRePassword(true);
            return;
        }
        else {
            setIsValidRePassword(false);
            if (!rePassword) {
                errorMessage = "Nhập lại mật khẩu không được để trống";
            }
            else {
                errorMessage = "Mật khẩu không khớp";
            }
            setRePasswordError(errorMessage)
            return;
        }
    }
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto:400,500']   
            }
        });
        if (reset_token) {
            try {
                jwt.verify(reset_token, process.env.REACT_APP_PASSPORT_JWT_RESET_PASSWORD)
            } catch (err) {
                setIsValidToken(false);
            }
        }
    }, [reset_token])
    const handleClick = () => {
        setError("")
        getPasswordError(password);
        getRePasswordError(password, rePassword);
        if (isValidPassword && password && rePassword && password == rePassword) {
            console.log("actiavtion token is" + reset_token);
            if (reset_token) {
                //ham reset password
                resetPassword(reset_token, password);

            }
        }
    }

    const resetPassword = (token, password) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/reset`, {
                token: token,
                password: password
            })
            .then(res => {
                alert("Thay đổi mật khẩu thành công")
                history.replace('/');
            })
            .catch(err => {
                setError("Link đã hết hạn hoặc lỗi mạng")
            });
    }

    const changePassVisibility = () => {
        if (passVisibility === eyeOn) {
            setPassVisibility(eyeOff);
            setInputType("password");
        }
        if (passVisibility === eyeOff) {
            setPassVisibility(eyeOn);
            setInputType("text");
        }
    }

    const changeRePassVisibility = () => {
        if (rePassVisibility === eyeOn) {
            setRePassVisibility(eyeOff);
            setReInputType("password");
        }
        if (rePassVisibility === eyeOff) {
            setRePassVisibility(eyeOn);
            setReInputType("text");
        }
    }
    return (

        isValidToken ? (<Fragment>
            <div className="change-pass-main-container">
                <div className="bg-white"> <div className="change-pass-container">
                    <div className="change-pass-header">
                        <span></span>
                        <span className="weight-500 m-top-28 font-24">Thay đổi mật khẩu</span>
                    </div>
                    {error && showErrMsg(error)}
                    <div className="forgot-title">
                        <div className="opacity-50 font-16">Đặt mật khẩu mới của bạn</div>
                    </div>

                    <div className="change-pass-content">
                        <div className={isValidPassword ? "input-field" : "invalid-input"}>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="input-sign-up required" type={inputType} required="required" />
                            <div className="placeholder">
                                Mật khẩu <span className="require">*</span>
                            </div>
                            <button onClick={changePassVisibility} className="m-right-5-per">
                                <img src={passVisibility} />
                            </button>
                        </div>

                        {!isValidPassword && <small className="change-password-text-danger">{passwordError}</small>}
                        <div className={isValidRePassword ? "input-field" : "invalid-input"}>
                            <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="input-sign-up required" type={reInputType} required="required" />
                            <div className="placeholder">
                                Nhập lại mật khẩu <span className="require">*</span>
                            </div>
                            <button onClick={changeRePassVisibility} className="m-right-5-per">
                                <img src={rePassVisibility} />
                            </button>
                        </div>
                        {!isValidRePassword && <small className="change-password-text-danger">{rePasswordError}</small>}
                        <button
                            onClick={handleClick}
                            className="change-password-btn">
                            Đổi mật khẩu
                        </button>
                    </div>
                </div></div>

            </div>
        </Fragment>) : (
            <Fragment>
                <div className="activation-container">
                    <h1>Link hết hạn, vui lòng thử lại sau</h1>
                    <button onClick={() => history.replace('/')} className="activation-custom-btn">Đi đến trang chủ</button>
                </div>
            </Fragment>)
    );
}

export default ChangePassword;
