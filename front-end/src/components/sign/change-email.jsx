import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './change-email.css'
import exit from '../../assests/forgot_password/exit.png'
import { checkValidEmail } from './valid-email'
import axios from 'axios'
import { showErrMsg } from './notification/notification'
import Cookies from 'js-cookie';
function ChangeEmail({ handleClose, setHeaderEmail, headerEmail }) {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState();
    const [error, setError] = useState("");
   
    const handleClick = () => {
        setError("")
        if (checkValidEmail(email)) {
            setIsValidEmail(true);
            updateEmail(headerEmail, email)

        }
        else {
            getEmailError();
        }
    }

    const updateEmail = (headerEmail, email) => {

        axios
        .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/updateemail`, {
            email: headerEmail,
            new_email: email
        })
        .then(res => {
            const bearerToken = res.headers['authorization']

            Cookies.set('bearerToken', bearerToken);
            if (bearerToken.startsWith('Bearer ')) {
                const token = bearerToken.substring(7, bearerToken.length);
                Cookies.set('token', token);
            }

           setHeaderEmail(email)
           handleClose();
        })
        .catch(err => {
            const code = err.message.substring(32, err.message.length);
            if (code == "401") {
                setEmail("")
                setError("Email này đã được dùng cho một tài khoản khác")
            }
            else {
                setEmail("")
                setError("Lỗi mạng không xác định")
            }
        });
       

    }


    const getEmailError = () => {
        setIsValidEmail(false);
        if (!email) {
            setEmailError("Email không được để trống")
        }
        else {
            setEmailError("Email sai định dạng")
        }
    }
    function handleEmailChange(email) {
        setEmail(email);
    }
    return (
        <Fragment>
            <div className="container w-440 h-auto">
                <div className="header-change-email">
                    <span></span>
                    <span className="weight-500 m-top-28 font-24">Cập nhật email</span>
                    <button className="m-top-28" onClick={handleClose}>
                        <img src={exit} />
                    </button>
                </div>
                {error && showErrMsg(error)}
                <div className="forgot-title">
                    <div className="opacity-50 font-16">Cập nhật lại email của bạn</div>
                </div>
                <div className="content">
                    <div className={isValidEmail ? "forgot-input-field" : "invalid-input-field"}>
                        <input
                            value={email}
                            onChange={(e) => {
                                handleEmailChange(e.target.value)
                            }}
                            className="w-full email-input" type="text" placeholder="Email" />
                    </div>
                    {!isValidEmail && <small className="forgot-text-danger">{emailError}</small>}
                    <button
                        onClick={handleClick}
                        className="change-email-btn">
                        Cập nhật email
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default ChangeEmail;
