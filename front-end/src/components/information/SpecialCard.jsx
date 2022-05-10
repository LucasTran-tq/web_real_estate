import React from 'react'
import './SpecialCard.css'
import { Fragment } from 'react/cjs/react.production.min';
import {Link} from 'react-router-dom'
export default function SpecialCard(props) {
    return (
        <Fragment>
            <a href={props.link} className="special-card-container" style={{background: `url(${props.img})`}}>
                <div className="special-card-content">
                    <h className="special-card-title">{props.title}</h>
                    <p className="special-card-p">{props.content}</p>
                </div>
            </a>
        </Fragment>
    )
}
