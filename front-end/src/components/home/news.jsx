import React, { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import NewsCard from './newsCard';
import { AiOutlineArrowRight } from "react-icons/ai";
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function News(props) {
    const [newsList, setNewsList] = useState([])
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1/news/allnews/`

    useEffect(() => {
      async function fetchData(){
        await axios.get(baseUrl).then((res) => {
            setNewsList(res.data)
        }).catch((err) => {
            console.log(err)
        })
      }
      fetchData()
    }, [])

    return (
        <Fragment>
            <div className='news__block'>
                <div className='news__content-container'>
                    <div className='news__content-container-header'>
                        <span className='news__content-header-label'>Tin tức bất động sản</span>
                        <Link to="/user/news" className='news__content-header-button'>Xem thêm <i className="fas fa-arrow-right"></i> </Link>
                    </div>

                    <div className='news__article-container'>
                        <ul className='news__article-list'>
                            {
                                newsList.map((news, index) => {
                                    return (
                                        <li key={index} className='news__article-item'>
                                            <NewsCard image={news.image} title={news.title} content={news.content} id={news._id}/>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}