import React, {Component} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { BiRightArrowAlt } from 'react-icons/fa';
import "./articleCard.css";

function ArticleCard(props) {
    return (
    <Fragment>
    {
        <div className='article__card-block'>
        <Link to= {`/user/news-detail/${props.id}`}>
            <div className='article__card-img-container'>
                <img className='article__card-img' src={props.image} alt="No img"></img>
            </div>
            <div className='article__card-content'>
                <div className='article__card-content-title'>
                    <span> {props.title} </span>
                </div>
                <div className='article__card-content-time'>
                    <Moment format="DD-MM-YYYY HH:MM">
                        {props.timepost}
                    </Moment>
                </div>
                <div className='article__card-content-detail'>
                    <span> {props.content} </span>
                </div>
            </div>
            </Link>
        </div>
    }
    </Fragment>
    );
}

export default ArticleCard;