import React, {Component} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import banner from '../../assests/house.png';
import { BiRightArrowAlt } from 'react-icons/fa';

class NewsCard extends Component {
    render() {
        return (
            <Fragment>
                <div className='news__card-block'>
                    <div className='news__card-img-container'>
                        <img className='news__card-img' src={banner} alt="Banner"></img>
                    </div>
                    <div className='news__card-content'>
                        <div className='news__card-content-label'>
                            <span> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam </span>
                        </div>
                        <button className='news__card-content-btn'>Xem thêm <i className="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </Fragment>
          );
    }
}

export default NewsCard;