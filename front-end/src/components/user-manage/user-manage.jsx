import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftMenuUser from "../user-manage/left-menu-user";
import FooterManage from "./footer-user-manage";
import Heading from "../heading";
import './user-manage.css'
const User = React.lazy(() => import("../../pages/user"));



const ContentComponent = (title) => (<h1> content</h1>)


class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = ({ title: 'QUẢN LÝ DỊCH VỤ', name: 'Quản lí bài đăng' })
        console.log("Hello");
    }
    callBackTitle = (title) => {
        this.setState({ title: title })
    }
    callBackName = (name) => {
        this.setState({ name: name })
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/user" component={User} />
                            <div className="user-manage__container">
                                <div className="user-manage__menu">
                                    <LeftMenuUser parentCallBackTitle={this.callBackTitle} parentCallBackName={this.callBackName}></LeftMenuUser>
                                </div>
                                <div className="user-manage__content">
                                    <div className="user-manage__header">
                                        <Heading title={this.state.title} name={this.state.name}></Heading>
                                    </div>
                                    <div className="user-manage__view">
                                        <Route exact path="/user/manage" component={ContentComponent} />
                                        <Route exact path="/user/manage/information" component={ContentComponent}/>
                                        <Route exact path="/user/manage/profile" component={ContentComponent} />
                                        <Route exact path="/user/manage/favourite" component={ContentComponent} />
                                        <Route exact path="/user/manage/password" component={ContentComponent} />
                                        <Route exact path="/user/manage/notification" component={ContentComponent} />
                                        <Route exact path="/user/manage/setting" component={ContentComponent} />
                                    </div>
                                    <FooterManage />
                                </div>
                            </div>
                        </Switch>
                    </div>


                </Router>
            </Fragment>
        );
    }
}

export default UserManage;
