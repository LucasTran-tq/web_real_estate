import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./user.css";

const Home = React.lazy(() => import("../components/home.jsx"));
const LandForSale = React.lazy(() =>
  import("../components/land-for-sale/land-for-sale")
);
const LandForRent = React.lazy(() => import("../components/land-for-rent"));
const LandForSaleProvince = React.lazy(() => import("../components/land-for-sale-province/land-for-sale-province"));
const MeetingRoom = React.lazy(() => import("../components/meeting-room.jsx"));
const Information = React.lazy(() => import("../components/information/information.jsx"));
const News = React.lazy(() => import("../components/news/news.jsx"));
const ContactAddress = React.lazy(() =>
  import("../components/contact-address.jsx")
);
const PostRealEstate = React.lazy(() =>
  import("../components/post-real-estate/post-real-estate")
);
const RealEstateInfo = React.lazy(() =>
  import("../components/real-estate-info/real-estate-info")
);
const NewsDetail = React.lazy(() =>
  import("../components/news-detail")
);
const NotFound = React.lazy(() => import("../components/not-found"));
class User extends Component {
  render() {
    return (
      <Fragment>
          <Router>
            <Header> </Header>
        <Switch>
            <Route exact path="/user" component={Home} />
            <Route exact path="/user/land-for-sale/:idType" component={LandForSale} />
            <Route exact path="/user/land-for-rent/:idType" component={LandForRent} />
            <Route exact path="/user/land-for-sale-province/:id" component={LandForSaleProvince} />
            <Route exact path="/user/meeting-room" component={MeetingRoom} />
            <Route exact path="/user/information" component={Information} />
            <Route exact path="/user/news" component={News} />
            <Route exact path="/user/contact-address" component={ContactAddress} />
            <Route exact path="/user/real-estate/create" component={PostRealEstate} />
            <Route path="/user/real-estate-info/:id">
              <RealEstateInfo />
            </Route>
            <Route exact path="/user/news-detail/:id">
              <NewsDetail />
            </Route>
            <Route exact path="/user/*">
              <NotFound />
            </Route>
        </Switch>
          </Router>         
        <Footer> </Footer>
      </Fragment>
    );
  }
}

export default User;
