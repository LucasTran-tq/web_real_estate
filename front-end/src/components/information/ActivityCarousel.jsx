import React from "react";
import ActivityCard from "./ActivityCard";
import activity1 from "../../assests/introduction_page/activity1.png";
import activity2 from "../../assests/introduction_page/activity2.png";
import activity3 from "../../assests/introduction_page/activity3.png";
import prev from "../../assests/image/ReCarouselOwl/prev.png";
import next from "../../assests/image/ReCarouselOwl/next.png";
import { Fragment } from "react/cjs/react.production.min";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./ActivityCarousel.css";
import {Link} from 'react-router-dom'
const prevIcon = `<img src=${prev} />`;
const nextIcon = `<img src=${next} />`;

const items = [
    {
        img: activity1,
        title: "Chào đón",
        content: "Tân sinh viên khóa 2021",
        link: '/upcoming',
    },
    {
        img: activity2,
        title: "Chiến dịch tình nguyện",
        content: "Xuân tình nguyện 2021",
        link: '/upcoming',
    },
    {
        img: activity3,
        title: "Chương trình",
        content: "Team Building OEP - K2020",
        link: '/upcoming',
    },
];
export default function ActivityCarousel() {
    return (
        <Fragment>

            <div className="info-section-container">
                <p className="info-section-title">Các hoạt động của công ty</p>
                <div className="carousel-activity-container">
                    <OwlCarousel
                        items={3}
                        margin={20}
                        nav
                        loop
                        autoWidth
                        navContainerClass="information-nav-container"
                        navText={[prevIcon, nextIcon]}
                        navClass={["re-prev-owl", "re-next-owl"]}
                        onClick={() => { }}
                    >
                        {items.map((item, index) => {
                            return (
                                <ActivityCard
                                    img={item.img}
                                    title={item.title}
                                    content={item.content}
                                    link={item.link}
                                />
                            );
                        })}
                    </OwlCarousel>
                    <a href="/upcoming" className="carousel-activity-see-all">Xem tất cả</a>
                </div>
            </div>
        </Fragment>
    );
}
