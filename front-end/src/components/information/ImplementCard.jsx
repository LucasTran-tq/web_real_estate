import React from 'react'
import './ImplementCard.css'
import { Fragment } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom'
import implement1 from '../../assests/introduction_page/implement1.png'
export default function ImplementCard() {
    return (
        <Fragment>
            <div className="implement-card-container">
                <div className="implement-card-col1">
                    <div className="implement-card-main-content">
                        <h className="implement-title">Khu đô thị</h>
                        <h className="implement-name">Chung cư UIT Thành phố Thủ Đức</h>
                        <p className="implement-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies id risus eget scelerisque. Nulla luctus laoreet lorem quis gravida. Quisque sagittis et massa fermentum posuere. Mauris porta purus quis lectus convallis, a consectetur odio placerat. </p>
                    </div>
                    <a href="/upcoming" className="implement-explore">Khám phá dự án</a>
                </div>
                <div className="implement-card-col2" style={{ background: `url(${implement1})` }}>

                </div>
            </div>
        </Fragment>
    )
}
