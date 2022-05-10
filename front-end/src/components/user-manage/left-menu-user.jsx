import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../left-menu.css";

import logo from "../../assests/logo.svg";
import home from "../../assests/admin_LeftMenu/home.png";
import b_home from "../../assests/admin_LeftMenu/b_home.png";
import post from "../../assests/admin_LeftMenu/post.png";
import b_post from "../../assests/admin_LeftMenu/b_post.png";
import w_post from "../../assests/admin_LeftMenu/w_post.png";
import person from "../../assests/admin_LeftMenu/person.png";
import b_person from "../../assests/admin_LeftMenu/b_person.png";
import w_person from "../../assests/admin_LeftMenu/w_person.png";
import like from "../../assests/admin_LeftMenu/like.png";
import b_like from "../../assests/admin_LeftMenu/b_like.png";
import w_like from "../../assests/admin_LeftMenu/w_like.png";
import lock from "../../assests/admin_LeftMenu/lock.png";
import b_lock from "../../assests/admin_LeftMenu/b_lock.png";
import w_lock from "../../assests/admin_LeftMenu/w_lock.png";
import bell from "../../assests/admin_LeftMenu/bell.png";
import b_bell from "../../assests/admin_LeftMenu/b_bell.png";
import w_bell from "../../assests/admin_LeftMenu/w_bell.png";
import setting from "../../assests/admin_LeftMenu/setting.png";
import b_setting from "../../assests/admin_LeftMenu/b_setting.png";
import w_setting from "../../assests/admin_LeftMenu/w_setting.png";
import log_out from "../../assests/admin_LeftMenu/log_out.png";
import b_log_out from "../../assests/admin_LeftMenu/b_log_out.png";
var name;
const sectionContent = [
    {
        title: "QUẢN LÝ DỊCH VỤ",
        option: [
            {
                name: "Quản lý bài đăng",
                icon: post,
                hover: b_post,
                focus: w_post,
                link: "/user/manage",
            },
        ],
    },
    {
        title: "QUẢN LÝ NGƯỜI DÙNG",
        option: [
            {
                name: "Thông tin cá nhân",
                icon: person,
                hover: b_person,
                focus: w_person,
                link: "/user/manage/profile",
            },
            {
                name: "Yêu thích",
                icon: like,
                hover: b_like,
                focus: w_like,
                link: "/user/manage/favourite",
            },
            {
                name: "Đổi mật khẩu",
                icon: lock,
                hover: b_lock,
                focus: w_lock,
                link: "/user/manage/password",
            },
            {
                name: "Thông báo",
                icon: bell,
                hover: b_bell,
                focus: w_bell,
                link: "/user/manage/notification",
            },
        ],
    },
    {
        title: "CÀI ĐẶT",
        option: [
            {
                name: "Cài đặt",
                icon: setting,
                hover: b_setting,
                focus: w_setting,
                link: "/user/manage/setting",
            },

        ],
    },
];

class MenuBtn extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            img: this.props.icon,
            clicked: false,
            paddingLeft: 0,
        };

        // Binding this keyword. COMPULSORY!!
        this.handleHover = this.handleHover.bind(this);
        this.handleNormal = this.handleNormal.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleHover() {
        if (!this.state.clicked)
            this.setState({
                img: this.props.hover,
                paddingLeft: 22,
                color: "#A18474",
            });
    }
    handleNormal() {
        if (!this.state.clicked) {
            this.setState({
                img: this.props.icon,
                paddingLeft: 0,
                color: "#000000",
            });
        }
    }
    handleFocus() {
        this.setState({
            img: this.props.focus,
            paddingLeft: 0,
            // backgroundColor: "#A18474",
            color: "#fff",
            clicked: true,
        });
    }
    handleBlur() {
        this.setState({
            img: this.props.icon,
            backgroundColor: "#fff",
            color: "#000000",
            clicked: false,
        });
    }

    render() {
        const styles = {
            contentStyle: {
                paddingLeft: this.state.paddingLeft,
                color: this.state.color,
                // backgroundColor: this.state.backgroundColor
            },
        };
        const { contentStyle } = styles;

        return (
            <Fragment>
                <div className="menu--btn chosen">
                    <div className="content flex_left">
                        <div className="icon">
                            <img src={this.props.focus} />
                        </div>
                        <p className="">{this.props.name}</p>
                    </div>
                </div>
                <NavLink
                    exact
                    to={this.props.link}
                    activeStyle={{
                        display: "none",
                    }}
                    onMouseEnter={this.handleHover}
                    onMouseLeave={this.handleNormal}
                    // onFocus={this.handleFocus}
                    // onBlur={this.handleBlur}
                    className="menu--btn"
                    style={contentStyle}
                >
                    <div className="content flex_left">
                        <div className="icon">
                            <img src={this.state.img} />
                        </div>
                        <p className="">{this.props.name}</p>
                    </div>
                </NavLink>
            </Fragment>
        );
    }
}

function Section(content) {
    return (
        <Fragment>
            <div className="section">
                <p className="title">{content.title}</p>
                <ul className="buttons">
                    {content.option.map((item, index) => {
                        return (
                            <li className="" onClick={() => (name = item.name)}>
                                <MenuBtn
                                    name={item.name}
                                    icon={item.icon}
                                    hover={item.hover}
                                    focus={item.focus}
                                    link={item.link}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Fragment>
    );
}

class LeftMenuUser extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", displayName: "", icon: `${home}`, iconOut: `${log_out}` };
        this.handleHoverHome = this.handleHoverHome.bind(this);
        this.handleNormalHome = this.handleNormalHome.bind(this);
        this.handleHoverOut = this.handleHoverOut.bind(this);
        this.handleNormalOut = this.handleNormalOut.bind(this);
    }
    sendTitle = () => {
        this.props.parentCallBackTitle(this.state.title);
    };
    sendName = () => {
        this.props.parentCallBackName(this.state.displayName);
    };

    handleHoverHome() {
        this.setState({
            icon: `${b_home}`,
        });
    }
    handleNormalHome() {
        this.setState({
            icon: `${home}`,
        });
    }
    handleHoverOut() {
        this.setState({
            iconOut: `${b_log_out}`,
        });
    }
    handleNormalOut() {
        this.setState({
            iconOut: `${log_out}`,
        });
    }

    render() {
        return (
            <Fragment>
                {/* <h5>đây là thanh lựa chọn bên trái</h5> */}
                <div className="menu--container">
                    <div className="logo flex_center">
                        <img src={logo} alt="logo" className="" />
                    </div>
                    <div className="menu--content">
                        <li
                            className="leftmenu-home-container"
                            onMouseEnter={this.handleHoverHome}
                            onMouseLeave={this.handleNormalHome}
                        >
                            <a href="/user" className="leftmenu-home-link">
                                <div className="left-menu-home">
                                    <div className="leftmenu-home-icon">
                                        <img src={this.state.icon}></img>
                                    </div>
                                    <span>Trang chủ</span>
                                </div>
                            </a>
                        </li>

                        {sectionContent.map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        this.setState(
                                            { title: item.title, displayName: name },
                                            () => {
                                                this.sendTitle();
                                                this.sendName();
                                            }
                                        );
                                    }}
                                >
                                    <Section title={item.title} option={item.option} />
                                </div>
                            );
                        })}

                        <li
                            className="leftmenu-home-container"
                            onMouseEnter={this.handleHoverOut}
                            onMouseLeave={this.handleNormalOut}
                        >
                            <a href="/home" className="leftmenu-home-link">
                                <div className="left-menu-home">
                                    <div className="leftmenu-home-icon">
                                        <img src={this.state.iconOut}></img>
                                    </div>
                                    <span>Đăng xuất</span>
                                </div>
                            </a>
                        </li>


                    </div>
                    <div className="icon_test"></div>
                </div>
            </Fragment>
        );
    }
}
export default LeftMenuUser;
