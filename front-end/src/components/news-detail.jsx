import React, { useEffect, useState } from "react";
import "./news-detail.css";
import { Fragment } from "react/cjs/react.production.min";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Time from 'react-time-format'
let image
let title
let content
let timepost
let image_description

export default function NewsDetail() {
    var { id } = useParams();
    const [listNews, setListNews] = useState([]);
    const [isBusy, setIsBusy] = useState(true)
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1/news/allnews/news/title`;
    const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/news/newdetail/${id}`;
    useEffect(() => {
        async function fetchData() {
            await axios
                .get(baseURL)
                .then(res => {
                    image = res.data[0].image;
                    title = res.data[0].title;
                    content = res.data[0].content;
                    image_description = res.data[0].image_description;
                    timepost = res.data[0].timepost;
                })
                .catch(err => {
                    console.log(err);
                })
                setIsBusy(false)
        }
        fetchData()
    }, []);
    useEffect(() => {
        async function fetchData() {
            await axios
                .get(baseUrl)
                .then(res => {
                    setListNews(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        fetchData()
    }, []);
    return (
        <Fragment>
            {
                !isBusy &&  <div className="news-detail-container">
                <div className="new-detail-wrapper">
                    <span className="new-detail-top-header">{title}</span>
                    <div className="new-detail-time"><Time value={timepost} format="MM-DD-YYYY"/></div>
                    <div className="new-detail-image">
                        <img src={image}></img>
                    </div>
                    <span className="new-detail-image-content">{image_description}</span>
                    <div className="new-detail-frame-content">
                        <p>
                            {`${content}`}
                        </p>
                    </div>
                    <div className="new-detail-frame-end">
                        <span className="new-detail-header">Tin tức nổi bật khác</span>
                        <div className="new-detail-title">
                            <ul>   {listNews.map((news, index) => {
                                return (
                                    <a
                                        href={`/user/news-detail/${news._id}`}
                                        className="news-detail-bonus-item"
                                        key={index}
                                    >
                                        {news.title}
                                    </a>
                                );
                            })}</ul>
                        </div>
                        <div className="new-detail-seemore">
                            <Link to="/user/news">Xem tiếp</Link>
                        </div>
                    </div>
                </div>
            </div>

            }
        </Fragment>
    );
}
