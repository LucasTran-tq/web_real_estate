import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LeftMenu from "../components/left-menu";
import Footer from "../components/footer-main";
import Heading from "../components/heading";
import { userService, adminService, sectionContent } from '../components/left-menu-content'
import Cookies from "js-cookie";

import '../assests/css/admin.css'


const User = React.lazy(() => import("./user.jsx"));

const Admin = () => {

  const [title, setTitle] = useState("QUẢN LÝ DỊCH VỤ");
  const [name, setName] = useState("Quản lí bài đăng");
  const [isAdmin, setAdmin] = useState(false);
  const [sections, setSections] = useState(sectionContent);

  useEffect(() => {
    const Token = Cookies.get("token");
    if (!Token) return;
    console.log(Token);
    const user = JSON.parse(atob(Token.split(".")[1]));
    if (!user) return;
    if (user.role === "ADMIN") {
      const newSection = sections;
      newSection[0].option = adminService;
      setAdmin(true);
      setSections(newSection);
    }
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route exact path="/user" component={User} />

        <div className="manage_wrapper">
          <div className="manage__container">
            <div className="manage__menu">
              <LeftMenu
                parentCallBackTitle={setTitle}
                parentCallBackName={setName}
                section={sections}
              />
            </div>
            <div className="manage__view">
              <div className="manage__menu">
                <Heading title={title} name={name}></Heading>
              </div>

              <div className="manage__content">
              <React.Suspense fallback={<div>Loading....</div>}>
                <Switch>
                  {sections.map((section) => {
                    return section.option.map((item) => (
                      <Route
                        exact
                        path={item.link}
                        render={() => {
                          setTitle(section.title);
                          setName(item.name);
                          const Component = item.Component;
                          return <Component />;
                        }}
                      />
                    ));
                  })}
                  <Route path="/admin/*">
                    <Redirect to="/admin" />
                  </Route>
                </Switch>
                </React.Suspense>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Switch>
    </Fragment>
  );
};

export default Admin;
