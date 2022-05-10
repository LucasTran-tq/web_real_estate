import React, {Component} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import hcm from '../../assests/zz.png'
import hanoi from '../../assests/hanoi.png'
import dongnai from '../../assests/dongnai.png'
import danang from '../../assests/danang.png'
import haiphong2 from '../../assests/haiphong2.png'

class Place extends Component {
    render() {
        return (
            <Fragment>
                 <div className='place__block'>
                    <div className='place__content-container'>
                        <div className='place__content-container-header'>
                            <span className='pacle__content-header-label'>Bất động sản theo địa điểm</span>
                            <span className='place__content-header-sublabel'>Dựa trên những địa điểm đã tìm kiếm từ trước</span>
                        </div>

                        <div className='place__item-container'>
                            <div className='place__item-left'>
                                <img className='place__item-left-img' src={hcm} alt="Banner">
                                </img>
                                <div className='place__item-left-info'>
                                    <span className='place__item-left-info-city'>Thành phố Hồ Chí Minh</span>
                                    <span className='place__item-left-info-new'>15121 tin đăng</span>
                                </div>
                            </div>

                            <div className='place__item-right'>
                                <div className='place__item-right-1'>
                                    <img className='place__item-right-img' src={hanoi} alt="Banner">
                                </img>
                                <div className='place__item-right-info'>
                                    <span className='place__item-right-info-city'>Hà Nội</span>
                                    <span className='place__item-right-info-new'>15121 tin đăng</span>
                                </div>
                                </div>
                                <div className='place__item-right-2'>
                                    <img className='place__item-right-img' src={danang} alt="Banner">
                                </img>
                                <div className='place__item-right-info'>
                                    <span className='place__item-right-info-city'>Đà Nẵng</span>
                                    <span className='place__item-right-info-new'>15121 tin đăng</span>
                                </div>
                                </div>
                                <div className='place__item-right-3'>
                                    <img className='place__item-right-img' src={haiphong2} alt="Banner">
                                </img>
                                <div className='place__item-right-info'>
                                    <span className='place__item-right-info-city'>Hải Phòng</span>
                                    <span className='place__item-right-info-new'>15121 tin đăng</span>
                                </div>
                                </div>
                                <div className='place__item-right-4'>
                                    <img className='place__item-right-img' src={dongnai} alt="Banner">
                                </img>
                                <div className='place__item-right-info'>
                                    <span className='place__item-right-info-city'>Đồng Nai</span>
                                    <span className='place__item-right-info-new'>15121 tin đăng</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
          );
    }
}

export default Place;
