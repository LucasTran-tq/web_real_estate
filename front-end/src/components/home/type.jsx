import React, { Component } from "react";
import "../../assests/css/hot_and_types.css";
import hinh1 from "../../assests/image/hinh1.png";
import hinh2 from "../../assests/image/hinh2.png";
import hinh3 from "../../assests/image/hinh3.png";
import hinh4 from "../../assests/image/hinh4.png";

function Hot() {
  return (
    <div className="hot__wrapper">
      <div className="hot__container">
        <h3 className="type__title">
          Cung cấp bất động sản phù hợp với mọi yêu cầu
        </h3>
        <div className="type__list">
          <div className="type__item">
            <img src={hinh1} alt="Nhà ở" className="type__item-img" />
            <div className="type__item-info">
              <p className="type__item-name">Nhà ở</p>
              <div className="type__item-more">
                <a href="/upcoming" className="type__item-link">Xem thêm</a>
                <i className="fas fa-arrow-right type__item-icon" />
              </div>
            </div>
          </div>
          <div className="type__item">
            <img src={hinh2} alt="Nhà ở" className="type__item-img" />
            <div className="type__item-info">
              <p className="type__item-name">Chung cư</p>
              <div className="type__item-more">
                <a href="/upcoming" className="type__item-link">Xem thêm</a>
                <i className="fas fa-arrow-right type__item-icon" />
              </div>
            </div>
          </div>
          <div className="type__item">
            <img src={hinh3} alt="Nhà ở" className="type__item-img" />
            <div className="type__item-info">
              <p className="type__item-name">Văn phòng</p>
              <div className="type__item-more">
                <a href="/upcoming"className="type__item-link">Xem thêm</a>
                <i className="fas fa-arrow-right type__item-icon" />
              </div>
            </div>
          </div>

          <div className="type__item">
            <img src={hinh4} alt="Nhà ở" className="type__item-img" />
            <div className="type__item-info">
              <p className="type__item-name">Coworking</p>
              <div className="type__item-more">
                <a href="/upcoming"className="type__item-link">Xem thêm</a>
                <i className="fas fa-arrow-right type__item-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hot;
