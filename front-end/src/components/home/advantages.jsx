import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../home.css"
import Xemtuoi from "./../../assests/img_advantages/Xemtuoi.png"
import Chiphi from "./../../assests/img_advantages/priceHome.png"
import Tinhtoan from "./../../assests/img_advantages/calculator.png"
import Tuvanphongthuy from "./../../assests/img_advantages/xemtuvi.png"
import Carousel from 'react-elastic-carousel'
import logoPartnerBW from "./../../assests/img_advantages/brand1BW.png"
import logoPartnerFC from "./../../assests/img_advantages/brand1FC.png"
import logoPartnerBW2 from "./../../assests/img_advantages/brand2BW.png"
import logoPartnerFC2 from "./../../assests/img_advantages/brand2FC.png"
import logoPartnerBW3 from "./../../assests/img_advantages/brand3BW.png"
import logoPartnerFC3 from "./../../assests/img_advantages/brand3FC.png"
import logoPartnerBW4 from "./../../assests/img_advantages/brand4BW.png"
import logoPartnerFC4 from "./../../assests/img_advantages/brand4FC.png"
import logoPartnerBW5 from "./../../assests/img_advantages/brand5BW.png"
import logoPartnerFC5 from "./../../assests/img_advantages/brand5FC.png"
import logoPartnerBW6 from "./../../assests/img_advantages/brand6BW.png"
import logoPartnerFC6 from "./../../assests/img_advantages/brand6FC.png"
const breakPoints = [
    { width: 250, itemsToShow: 2 },
    { width: 350, itemsToShow: 3 },
    { width: 500, itemsToShow: 4 },
    { width: 768, itemsToShow: 6 },
];
const Item = (props) => {
    return (
        <div className="item__carousel">{props.children}</div>
    )
}
class Advantage extends Component {
    render() {

        return (
            <Fragment>
                <div className="wrap__advantages">
                    <div className="advantages">
                        <div className="main__utility">
                            <h2>Hỗ trợ tiện ích</h2>
                            <div className="row ">
                                <a href="/upcoming" className="col">
                                    <img src={Xemtuoi} alt="logo" />
                                    <span>Xem tuổi xây nhà</span>
                                </a>
                                <a href="/upcoming" className="col">
                                    <img src={Chiphi} alt="logo" />
                                    <span>Chi phí xây nhà</span>
                                </a>
                                <a href="/upcoming" className="col">
                                    <img src={Tinhtoan} alt="logo" />
                                    <span>Tính toán lãi suất</span>
                                </a>
                                <a href="/upcoming" className="col">
                                    <img src={Tuvanphongthuy} alt="logo" />
                                    <span>Tư vấn phong thủy</span>
                                </a>
                            </div>
                        </div>
                        <div className=" main__partner">
                            <h2>Các đối tác tiêu biểu</h2>
                            <div className="carousel">
                                <Carousel breakPoints={breakPoints} showArrows={false} pagination={false}>
                                    <a href='/upcoming'>
                                        <Item>
                                            <img src={logoPartnerFC} alt="icon__brand__color" className="logoPartner fullcolor" />
                                            <img src={logoPartnerBW} alt="icon__brand__blackwhite" className="logoPartner blackwhite" />
                                        </Item>
                                    </a>
                                    <a href='/upcoming'>
                                        <Item>
                                            <img src={logoPartnerFC2} alt="icon__brand__color" className="logoPartner fullcolor" />
                                            <img src={logoPartnerBW2} alt="icon__brand__blackwhite" className="logoPartner blackwhite" />
                                        </Item>
                                    </a>
                                    <a href='/upcoming'>
                                        <Item>
                                            <img src={logoPartnerFC3} alt="icon__brand__color" className="logoPartner fullcolor" />
                                            <img src={logoPartnerBW3} alt="icon__brand__blackwhite" className="logoPartner blackwhite" />
                                        </Item>
                                    </a>
                                    <a href='/upcoming'>
                                        <Item>
                                            <img src={logoPartnerFC4} alt="icon__brand__color" className="logoPartner fullcolor" />
                                            <img src={logoPartnerBW4} alt="icon__brand__blackwhite" className="logoPartner blackwhite" />
                                        </Item>
                                    </a>

                                    <a href='/upcoming'>
                                        <Item>
                                            <img src={logoPartnerFC5} alt="icon__brand__color" className="logoPartner fullcolor" />
                                            <img src={logoPartnerBW5} alt="icon__brand__blackwhite" className="logoPartner blackwhite" />
                                        </Item>
                                    </a>
                                    <a href='/upcoming'>
                                        <Item>
                                            <img src={logoPartnerFC6} alt="icon__brand__color" className="logoPartner fullcolor" />
                                            <img src={logoPartnerBW6} alt="icon__brand__blackwhite" className="logoPartner blackwhite" />
                                        </Item>
                                    </a>

                                </Carousel>
                            </div>
                        </div>
                        <div className=" main__project">
                            <div className="col">
                                <h3>Bất động sản Hồ Chí Minh</h3>
                                <ul>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận 2</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận 7</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận 9</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Tân Bình</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Bình Thạnh</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Thủ Đức</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận 1</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận 10</a></li>
                                </ul>
                            </div>
                            <div className="col">
                                <h3>Bất động sản Hà Nội</h3>
                                <ul>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Ba Đình</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Đống Đa</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Hà Đông</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Long Biên</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Nam Từ Liên</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Hoàng Hà</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Hai Bà Trưng</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Mua nhà đất Quận Hoàn Kiếm</a></li>
                                </ul>
                            </div>
                            <div className="col">
                                <h3>Các dự án nổi bật</h3>
                                <ul>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Dự ấn Vinhomes Quận 2</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Chung cư Safira Khoa Điền</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Vinhomes Central Park</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Chung cư Richmond City</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Dự án Aqua City</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Dự án Ecocity Premia Đắk Lắk</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Dự án Charm City Bình Dương</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Chung cư Vinhomes Riverside</a></li>
                                </ul>
                            </div>
                            <div className="col">
                                <h3>Nhà đất cho thuê</h3>
                                <ul>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Thuê nhà  Quận Nam Từ Liên</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Thuê nhà Quận 9 </a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Thuê nhà Đông Nai</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Thuê chung cư mini</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Thuê nhà nguyên căn Quận 1</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Cho thuê chung cư</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Nhà trọ Đà Nẵng</a></li>
                                    <li><i className="fas fa-chevron-right"></i><a href='/upcoming'>Thuê nhà Quận Hai Bà Trưng</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Advantage;