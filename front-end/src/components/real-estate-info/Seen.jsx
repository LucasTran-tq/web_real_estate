import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import prev from "../../assests/image/ReCarouselOwl/prev.png";
import next from "../../assests/image/ReCarouselOwl/next.png";
import './real-estate-info.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReCardInfo from './ReCardInfo.jsx';

import Axios from 'axios'

const prevIcon = `<img src=${prev} />`
const nextIcon = `<img src=${next} />`
export default function Seen(props) {
    var listBds = []
    listBds = props.listBDS;
    var listBdsSeen = []
    for (let i = 0; i < listBds.length; i++) {
        for (let j = 0; j < listBds[i].length; j++) {
            listBdsSeen.push(listBds[i][j])
        }
    }
    return (
        <Fragment>
            {
                <div className="owl-container">
                    <div className="owl-title">
                        <p>Tin đăng đã xem</p>
                    </div>
                    <OwlCarousel
                        items={3}
                        margin={24}
                        nav
                        dots={false}
                        autoWidth
                        navContainerClass="re-nav-container"
                        navText={[prevIcon, nextIcon]}
                        navClass={['re-prev-owl', 're-next-owl']}
                        onClick={() => {
                        }}
                    >
                        {
                            listBdsSeen.map((reCard, index) => {
                                return (
                                    <div className='area_item' key={index}>
                                        <ReCardInfo
                                            price={reCard.detail.totalPrice}
                                            name={reCard.title}
                                            address={reCard.detail.address.note}
                                            numofbed={reCard.detail.numBedroom}
                                            numofbath={reCard.detail.numBathroom}
                                            areainfo={reCard.detail.square}
                                            img={reCard.pictures[0]}
                                            landId={reCard._id}
                                        />
                                    </div>
                                )
                            })
                        }
                    </OwlCarousel >
                </div >
            }
        </Fragment>
    );
}

