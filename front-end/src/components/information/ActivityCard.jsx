import React from 'react'
import './ActivityCard.css'
import { Fragment } from 'react/cjs/react.production.min';
import activity1 from '../../assests/introduction_page/activity1.png'
import {Link} from 'react-router-dom'
export default function ActivityCard(props) {
    return (
        <Fragment>
            <a href={props.link} className="activity-card-container" style={{background: `url(${props.img})`}}>
                <div className="activity-card-content">
                    <h className="activity-card-title">{props.title}</h>
                    <p className="activity-card-p">{props.content}</p>
                </div>
            </a>
        </Fragment>
    )
}
