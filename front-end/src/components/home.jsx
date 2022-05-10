import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Intro from './home/intro'
import Type from './home/type'
import Hot from './home/hot'
import Place from './home/place'
import News from './home/news'
import Advantage from './home/advantages'


import './home.css'
class Home extends Component {

    render() {
        return (
            <Fragment>
             
                <div>
                    <Intro></Intro>
                </div>
                <div>
                    <Type></Type>
                </div>
                <div>
                    <Hot></Hot>
                </div>
                <div>
                    <Place></Place>
                </div>
                <div>
                    <News></News>
                </div>
                <div>
                    <Advantage></Advantage>
                </div>
            </Fragment>
        );
    }
}

export default Home;