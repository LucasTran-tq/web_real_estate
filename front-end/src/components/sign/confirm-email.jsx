import React, { Component, useState, useEffect } from "react";

import { Fragment } from "react/cjs/react.production.min";
import exit from "../../assests/confirm_email/exit.png"
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";
import "./confirm-email.css";
import Cookies from 'js-cookie';
import { showErrMsg } from './notification/notification'
var posX = window.innerWidth;
window.onresize = () => {
    posX = window.innerWidth;
}



const ConfirmEmail = ({ email, setIsLogin, handleShowUpdateInformation }) => {
    const history = useHistory();
    const [isFirst, setIsFirst] = useState(true);
    const [error, setError] = useState("");

    const sendVerificationEmail = (email) => {
        setError("")
        const token = Cookies.get("token");
        console.log(token)
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

        axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/sendverificationemail`, {
                email: email
            })
            .then(res => {
                setIsFirst(false);
                alert("Một email xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra!")
            })
            .catch(err => {
                setError("Lỗi mạng không xác định")
            });


    }
    return (

        isFirst ? (
            <Fragment>
                <div className="container w-440 h-auto">
                    <div className="header-confirm-email">
                        <span></span>
                        <span className="weight-500 m-top-28 font-24">Xác thực email</span>
                        <button className="m-top-28" onClick={() => {
                            setIsLogin(true);
                        }}>
                            <img src={exit} />
                        </button>
                    </div>
                    {error && showErrMsg(error)}
                    <div className="content m-top-42">
                        <span className="weight-400">Email xác thực sẽ được gửi đến </span>
                        <span className="email-link weight-400">{email}</span>
                        <div className="m-top-12 weight-400">Nếu đúng hãy chọn xác thực email, nếu sai email hãy chọn “Đổi email xác thực” ở phía dưới.
                        </div>

                        <button onClick={() => sendVerificationEmail(email)} className="resend-email-btn w-full">Xác thực email</button>

                        <div className="footer-confirm-container m-top-24 padding-bot-24">
                            <button
                                onClick={handleShowUpdateInformation}
                                className="email-link weight-400 font-14">Đổi email xác thực</button>
                        </div>
                    </div>
                </div>
            </Fragment >)
            : (<Fragment>
                <div className="container w-440 h-auto">
                    <div className="header-confirm-email">
                        <span></span>
                        <span className="weight-500 m-top-28 font-24">Xác thực email</span>
                        <button className="m-top-28" onClick={() => {
                            setIsLogin(true);
                        }}>
                            <img src={exit} />
                        </button>
                    </div>
                    {error && showErrMsg(error)}
                    <div className="content m-top-42">
                        <span className="weight-400">Để hoàn thành đăng kí tài khoản, xin vui lòng truy cập&nbsp;</span>
                        <span className="email-link weight-400">{email}</span>
                        <span className="weight-400">&nbsp;và xác thực email (Lưu ý kiểm tra Spam/Junk).</span>

                        <div className="m-top-24 weight-400">Nếu bạn chưa nhận được mail xác thực, hãy chọn “Gửi lại email xác thực ”</div>

                        <button onClick={() => sendVerificationEmail(email)} className="resend-email-btn w-full">Gửi lại email xác thực</button>

                        <div className="footer-confirm-container m-top-24 padding-bot-24">
                            <span className=" weight-400 font-14">Bạn muốn đổi email đăng kí? </span>
                            <button
                                onClick={handleShowUpdateInformation}
                                className="email-link weight-400 font-14">Bấm vào đây</button>
                        </div>
                    </div>
                </div>
            </Fragment >)
    )
};

export default ConfirmEmail;
