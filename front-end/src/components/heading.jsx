import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dropdown from "./main-admin/dropdown/Dropdown";
import user_image from "../assests/avatar.jpg";
import ic_logout from "../assests/ic_logout.png";
import axios from "axios";
import Cookies from "js-cookie";
import "./heading.css";
const curr_user = {
    display_name: "Tai Nguyen",
    image: user_image,
};


const user_menu = [
    {
      content: "Quản lý tin đăng",
      icon: "fas fa-angle-right angle-left",
      link: '/admin'
    },
    {
      content: "Quản lý tài khoản",
      icon: "fas fa-angle-right angle-left",
      link: '/admin/profile'
    },
    {
      content: "Thay đổi mật khẩu",
      icon: "fas fa-angle-right angle-left",
      link: '/admin/password'
    }
  ]

const renderUserToggle = (image, name) => {
    return (
      <li className="topnav__right-user">
        <div className="topnav__right-user__li">
          <div className="topnav__right-user__image">
            <img src={image} alt="" />
          </div>
        </div>
        <div>
          <div className="topnav__right-user__name">
            {name}
          </div>
        </div>
        <div>
          <i className="fas fa-angle-down margin8"></i>
        </div>
      </li>)
  }

const renderUserMenu = (item, index) => (
    <Link to={item.link} key={index}>
        <div className="user-menu">
            <span className="user-menu__item">{item.content}</span>
            <i className={item.icon}></i>
        </div>
    </Link>
);

function AdminInfo() {
    const [name, setName] = useState("Name");
    const [image, setImage] = useState(user_image);
    const [isLogin, setIsLogin] = useState(false);
    const handleLogin = () => {
        setIsLogin(true);
      }
    const handleLogout = () => {
        Cookies.remove('bearerToken');
        Cookies.remove('token');
        // Cookies.remove('userEmail');
        // Cookies.remove('userPassword');
        window.location.reload();
    }
    const checkLogin = async () => {
        const Token = Cookies.get('token')
        if (!!Token) {
          var a = JSON.parse(atob(Token.split(".")[1]));
          console.log(a);
          setIsLogin(true);
          await getUserData(a);
        } else {
            window.location=`${process.env.REACT_APP_CLIENT_URL}`
        }
      }
    useEffect(() => {
        checkLogin();
    });
    const getUserData = async (a) => {
        await axios
        .get(
            `${process.env.REACT_APP_API_URL}/api/v1/users/` + a["id"] + "/users"
        )

        .then((res) => {
            const data = res.data;
            const list_1 = data.map((item) => ({
                fullname: item.fullName,
                image: item.image,
            }));

            setName(list_1[0].fullname);
            setImage(list_1[0].image);
        })
        .catch((error) => console.log(error));
      }

    return (
        <div className="topnav__right">
            <div className="topnav__right-item">
                {/* dropdown here */}
                <Dropdown
                    contentStyle = "dropdown__content"
                    customToggle={() => renderUserToggle(image, name)}
                    contentData={user_menu}
                    renderItems={(item, index) => renderUserMenu(item, index)}
                    renderFooter={() => (
                        <Link to="/user">
                            <hr width="100%" />{" "}
                            <button onClick={handleLogout} className="logout">
                                Đăng xuất
                                <img src={ic_logout} alt="" className="ic-logout" />
                            </button>
                        </Link>
                    )}
                />
            </div>

        </div>
    );
}
class   Admin extends Component {
    render() {
        return (
            <Fragment>
                <div className="topnav">
                    <ul className="breadcrumb marginright8">
                        <i className="fas fa-angle-right marginright8"></i>
                        <li style={{ color: "#A18474", marginRight: "16px" }}>{this.props.title}</li>
                        <i className="fas fa-angle-right marginright8"></i>
                        <li>{this.props.name}</li>
                    </ul>
                    <div className="topnav__right">
                        <AdminInfo
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Admin;
