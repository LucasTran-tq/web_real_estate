import React, { Component, Fragment } from "react";
import facebookLogo from "../../assests/sign_in/facebook_logo.png";
import { Link } from "react-router-dom";

const FacebookLoginUI = () => {
  return (
    <button className="social-sign-in m-left-32">
      <div className="relative">
        <img className="social-logo facebook-logo" src={facebookLogo} />
        <span className="social-name">Facebook</span>
      </div>
    </button>
  );
};

export default FacebookLoginUI;
