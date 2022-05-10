import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import ReactPaginate from 'react-paginate';
import { useParams, Link, useLocation } from "react-router-dom";
import hcm from '../../assests/hcm.png';
import w_img from '../../assests/ic_white_img.svg';
import b_heart from '../../assests/ic_b_heart.png';
import revert_heart from '../../assests/ic_revert_b_heart.png';
// import { useDispatch, useSelector } from 'react-redux';
// import { LoadWishlist, DeleteLikePost } from '../../redux/action';
import axios from "axios";
import Cookies from 'js-cookie';
import moment from "moment";
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import './favourite.css'
import { DeleteLikePost, LoadLikedPage, LikePost } from '../../redux/action';



const options = [
    { value: '0', content: 'Lưu mới nhất' },
    { value: '1', content: 'Tin mới nhất' },
    { value: '2', content: 'Tin cũ nhất' },
    { value: '3', content: 'Giá từ thấp lên cao' },
    { value: '4', content: 'Giá từ cao xuống thấp' },
    { value: '5', content: 'Diện tích từ bé đến lớn' },
    { value: '6', content: 'Diện tích từ lớn đến bé' },
]

const LikeItem = (item, index) => {
    const [heart, setHeart] = useState(b_heart);
    const dispatch = useDispatch();

    const hanndleOnclickHeart = () => {
        if (heart === b_heart) {
            setHeart(revert_heart);
            dispatch(LikePost(item.id));
        } else {
            setHeart(b_heart);
            dispatch(DeleteLikePost(item.id));
        }
        //// Put or Del Item /////////
    };
    return (
        <div className="item-container" key={index}>
            <a className="item-link" href={`/user/real-estate-info/${item && item.id}`}>
                <div className="thumpnail-container">
                    <img className="thumpnail" src={item && item.thumpnail}></img>
                    <span className="img-quantity">
                        <p>{item.imgQuantity}</p>
                        <img className="img-icon" src={w_img}></img>
                    </span>
                </div>

                <div className="info-container">
                    <span className="title">{item.title}</span>

                    <div className="info-row">
                        <span className="address fontsize12 overflow1">{item.address}</span>
                        <span className="price brown fontsize14">{item.price}</span>
                        <span className="area brown fontsize14">{item.area} m2</span>
                        <span className="bedroom fontsize14-4">{item.bedroom}</span>
                        <span className="bathroom fontsize14-4">{item.bathroom}</span>
                    </div>

                    <span className="description fontsize12">{item.description}</span>

                    <div className="item-footer ">
                        <span className="time brown fontsize12">{item.time}</span>
                        <span className="author brown fontsize12">{item.author}</span>
                    </div>
                </div>
            </a>
            <button className="heart-btn"
                onClick={hanndleOnclickHeart}>
                <img src={heart} alt="heart"></img>
            </button>
        </div>
    )

}


const Admin = () => {
    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const Token = Cookies.get("token");
    let pageNumber = query.get("page");
    if (pageNumber === null) pageNumber = 0;

    let sort = query.get("sort");
    if (sort === null) sort = 0;

    const link = '/admin/favourite';
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [sortBy, setSortBy] = useState(sort);
    const [lstLength, setLstLength] = useState(1);
    const [isLogin, setIsLogin] = useState(false);
    const items = [...Array(lstLength)];
    const itemsPerPage = 20;
    ////////////////////////////////////////////////////////////////
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);



    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, lstLength]);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setCurrentPage(event.selected);
        setItemOffset(newOffset);
        window.scrollTo(0, 0);
        history.push(link + `?page=` + event.selected);
    };
    ////////////////////////////////////////////////////////////////

    const { dataLikeds } = useSelector(state => state.commonReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentPage(pageNumber);
    }, [pageNumber])
    useEffect(() => {
        const Token = Cookies.get('token');
        var j = JSON.parse(atob(Token.split('.')[1]));
        const url = `${process.env.REACT_APP_API_URL}/api/v1/users/` + j['email'] + `/liked_detail?page=0&sort=${sortBy}`
        async function getdata() {
            fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + Token,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.length - 20 * currentPage < 20) {
                        if (20 * currentPage >= data.result.length)
                            setCurrentPage(0);
                        data.result = data.result.slice(20 * currentPage, data.result.length)
                    }
                    else {
                        data.result = data.result.slice(20 * currentPage, 20 * (currentPage + 1));
                    }

                    data.result.map(value => {
                        if (value._id.pictures.length === 0) value._id.pictures = [hcm];

                        //convert date string to diffDays
                        const date = new Date(value._id.dateUpload);
                        const dateNow = new Date();
                        const diffTime = Math.abs(dateNow - date);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        value._id.dateUpload = diffDays + " ngày trước";
                        ///////////////////////////
                        //convert price to trieu, ty
                        const billion = 1000000000;
                        const million = 1000000;
                        const price = value._id.detail.totalPrice;
                        if (price >= billion) {
                            value._id.detail.totalPrice = (price / billion).toFixed(2) + " tỷ";
                        } else if (price >= million) {
                            value._id.detail.totalPrice = (price / million).toFixed(2) + " triệu";
                        }

                        return value
                    })
                    setLstLength(data.getUser.likeds.length);
                    // setdataLandForSale(data.realEstates);;
                    dispatch(LoadLikedPage(data.result));
                    console.log("uoiuo", data);
                })
                .catch(err => console.log(err));
        };
        getdata();
    }, [currentPage, sortBy])
    console.log(dataLikeds);
    return (
        <Fragment>
            {dataLikeds != 0 ? (
                <div className="like-container">
                    <div className="head-bar">
                        <div className="general-info">
                            <h1 className="page-title">Tin đăng yêu thích</h1>
                            <h2 className="count-status">Hiện có {lstLength} tin đăng yêu thích</h2>
                        </div>
                        <div className="sort-container">
                            <select className="sort-select"
                                onChange={(option) => {
                                    setSortBy(option.target.value);
                                }}>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.content}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="field-bar">
                        <p className="post-field  fontsize14-4">Tin đăng</p>
                        <div className="info-row no-margin flex1">
                            <span className="address fontsize14-4"></span>
                            <p className="price fontsize14-4">Giá</p>
                            <p className="area fontsize14-4">Diện tích</p>
                            <p className="bedroom fontsize14-4">Phòng ngủ</p>
                            <p className="bathroom fontsize14-4">Phòng tắm</p>
                        </div>

                    </div>
                    <div className="like-list">
                        {
                            dataLikeds.map((item, index) => {
                                return (
                                    <LikeItem
                                        id={item._id._id}
                                        isLike={true}
                                        thumpnail={item._id.pictures[0]}
                                        title={item._id.title}
                                        address={item._id.detail.address.note}
                                        description={item._id.detail.content}
                                        time={item._id.dateUpload}
                                        author={item._id.author.fullName}
                                        price={item._id.detail.totalPrice}
                                        area={item._id.detail.square}
                                        bedroom={item._id.detail.numBedroom}
                                        bathroom={item._id.detail.numBathroom}
                                        imgQuantity={item._id.pictures.length}
                                    >
                                    </LikeItem>
                                )

                            })
                        }
                    </div>

                    <div className="pagination">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<i className="fas fa-chevron-right"></i>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel={<i className="fas fa-chevron-left"></i>}
                            renderOnZeroPageCount={null}
                            activeClassName="active"
                            forcePage={parseInt(currentPage)}
                        />
                    </div>
                </div>
            ) : (
                <div className="empty-container">
                    <div className="inside-border">
                        <p>Hiện bạn chưa có tin đăng yêu thích nào</p>
                        <a href="/user" className="realestate-link">
                            <button className="realestate-btn">
                                Thêm tin đăng yêu thích mới
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </Fragment>
    );

}


export default Admin;