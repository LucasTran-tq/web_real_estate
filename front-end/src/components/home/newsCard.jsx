import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom'
class NewsCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {content,title} = this.props
        const contentNews = content.length > 100 ? `${content.slice(0, 100)}...` : content
        const titleNews = title.length > 85 ? `${title.slice(0, 85)}...` : title
        return (
            <Fragment>
                <div className='news__card-block'>
                        <div className='news__card-img-container'>
                            <img className='news__card-img' src={this.props.image} alt="Banner"></img>
                        </div>
                        <div className='news__card-content'>
                            <div className="news-card-title-container">
                                <p className="news-card-title">{titleNews}</p>
                            </div>
                            <div className='news__card-content-label'>
                                <span> {contentNews} </span>
                            </div>
                           <div> <Link to={`/user/news-detail/${this.props.id}`} className='news__card-content-btn'>Xem thêm <i className="fas fa-arrow-right"></i></Link></div>
                        </div>
                </div>
            </Fragment>
        );
    }
}

export default NewsCard;