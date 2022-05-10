import React, {Component} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewsCard from './newsCard';
import { AiOutlineArrowRight } from "react-icons/ai";

class News extends Component {
    render() {
        return (
            <Fragment>
                <div className='news__block'>
                    <div className='news__content-container'>
                        <div className='news__content-container-header'>
                            <span className='news__content-header-label'>Tin tức bất động sản</span>
                            <button className='news__content-header-button'>Xem thêm <i className="fas fa-arrow-right"></i> </button>
                        </div>

                        <div className='news__article-container'>
                            <ul className='news__article-list'>
                                <li className='news__article-item'>
                                    <NewsCard></NewsCard>
                                </li>
                                <li>
                                    <NewsCard></NewsCard>
                                </li>
                                <li>
                                    <NewsCard></NewsCard>
                                </li>
                                <li>
                                    <NewsCard></NewsCard>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
          );
    }
}

export default News;