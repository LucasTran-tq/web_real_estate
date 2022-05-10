import React, { useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Img_intro from "./../../assests/img_advantages/img_intro.png"



const Intro = () => {
    const [isCollapsible, setIsCollapsible] = useState(false)
    return (
        <Fragment>
            <div className="wrap__introduction">
                <div className="introduction">
                    <div className="table__intro">
                        <div className="intro__title">
                            <h1>Tìm kiếm <span className="circle__home">ngôi nhà</span></h1>
                            <h1 className="sub__title">mơ ước của bạn!</h1>
                        </div>
                        <div className="intro__text">
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et hic suscipit repellendus dolore neque consequatur dolores pariatur voluptas possimus culpa.</p>
                        </div>
                        <div className="intro__form">
                            <div className="categories__search">
                                <button>Nhà đất bán</button>
                                <button>Nhà đất cho thuê</button>
                                <button>Dự án</button>
                            </div>
                            <div className="text__search">
                                <div className="intro__form__search">
                                    <form>
                                        <input type="text" className="input__search" placeholder="Nhập địa điểm, khu vực ví dụ: Thành phố Thủ Đức" />
                                        <button type="search" className="btn__search">
                                            <i className="fa fa-search"></i>Tìm kiếm
                                        </button>
                                    </form>
                                </div>
                                <div className="intro__form__option_search">
                                    <div className="intro__form__option_search__expand">
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Trên toàn quốc
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Mức giá
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Diện tích
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Dự án
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down" style={{ width: "7px" }}></i>
                                        </div>
                                        <button className="btn-expand"
                                            onClick={() => { setIsCollapsible(true) }}
                                            style={isCollapsible ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
                                        >Mở rộng <i className="fa fa-chevron-down"></i></button>
                                    </div>
                                    {isCollapsible ? <div className="intro__form__option_search__collapse">
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Quận, huyện
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Xã, phường
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Đường, phố
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className="customSelect">
                                            <select>
                                                <option>
                                                    Số phòng
                                                </option>
                                            </select>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <button className="btn-collapse" onClick={() => { setIsCollapsible(false) }}>Thu gọn <i className="fa fa-chevron-up"></i></button>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image__intro">
                        <img src={Img_intro} alt="hinhAnh" />
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Intro
