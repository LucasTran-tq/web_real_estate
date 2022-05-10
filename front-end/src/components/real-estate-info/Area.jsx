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
import axios from 'axios'
import Cookies from 'js-cookie';
import { LoadAreaRealEstate } from "../../redux/action";
import { useDispatch, useSelector } from 'react-redux';
const prevIcon = `<img src=${prev} />`
const nextIcon = `<img src=${next} />`

export default function Area(props) {

    const [isBusy, setIsBusy] = useState(true)
    const [isLogin, setIsLogin] = useState(false);
    const { dataAreaRealEstate } = useSelector(state => state.commonReducer)
    const dispatch = useDispatch();
    const Token = Cookies.get("token");
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1/real-estate/area/${props.provinceID}`
    useEffect(() => {
        async function fetchData() {
            await axios.get(baseUrl, { headers: { Authorization: "Bearer " +  Token } }).then((res) => {
                // setListBds(res.data)
                dispatch(LoadAreaRealEstate(res.data))

            }).catch((err) => {
                console.log(err)
            })
            setIsBusy(false)
        }
        fetchData()
    }, [])


    return (

        <Fragment>
            {
                !isBusy && <div className="owl-container">
                    <div className="owl-title">
                        <p>Bất động sản cùng khu vực</p>
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
                            !!dataAreaRealEstate && dataAreaRealEstate.map((item, index) => {
                                return (
                                    <div className="area_item">
                                        <ReCardInfo
                                        price={item.detail.totalPrice}
                                        name={item.title}
                                        address={item.detail.address.note}
                                        numofbed={item.detail.numBedroom}
                                        numofbath={item.detail.numBathroom}
                                        areainfo={item.detail.square}
                                        img={item.pictures[0]}
                                        landId={item._id}
                                        isLike={item.tym}
                                        checkLogin={setIsLogin}
                                    />
                                    </div>
                                )
                            })
                        }
                    </OwlCarousel >
                </div >
            }
        </Fragment>
    )
}
