import React, { Component } from "react";
import "./App.css";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import OnDeveloping from "./components/on-developing";
import NotFound from "./components/not-found";
//import UserManage from './components/user-manage/user-manage.jsx'
const User = React.lazy(() => import("./pages/user.jsx"));
const Admin = React.lazy(() => import("./pages/admin.jsx"));
// const NotFound = React.lazy(() => import("./components/not-found"));
// const OnDeveloping = React.lazy(() => import("./components/on-developing"));
const ActivationEmail = React.lazy(() =>
  import("./components/sign/activation-email")
);
const ChangePassword = React.lazy(() =>
  import("./components/sign/change-password")
);
//sh
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={<div>Loading....</div>}>
          <Switch>
            {/* <Route exact path="/user/manage/" component={UserManage} /> */}
            <Route path="/user" component={User} />
            <Route path="/admin" component={Admin} />
            <Route
              path="/activate/:activation_token"
              component={ActivationEmail}
              exact
            />
            <Route
              path="/reset/:reset_token"
              component={ChangePassword}
              exact
            />
            <Route exact path="/">
              <Redirect to="/user" />
            </Route>

            <Route path="/upcoming" component={OnDeveloping} />
            <Route path="/404" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
