import React, { useState, memo } from "react";
import arrowDown from "../../assests/image/arrow-down.svg";

const OtherInfo = ({ detail, setDetail }) => {
  const [directHouseSelected, setDirectHouseSelected] =
    useState("info__form-select");
  const [directBalconySelected, setDirectBalconySelected] =
    useState("info__form-select");

  const {
    frontispiece,
    lengthOfAlley,
    numFloor,
    numBathroom,
    directOfHouse,
    directOfBalcony,
    numBedroom,
    furnitureInfo,
    legalInfo,
  } = detail;

  const handleChangeInput = (e) => {
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      handleChangeInfo(e);
    }
  };

  const handleChangeInfo = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="info__container">
      <h3 className="info__title">THÔNG TIN KHÁC</h3>

      <div className="info__form-big-content">
        <div className="info__form-content">
          <div className="info__form-group">
            <label htmlFor="frontispiece" className="info__form-label">
              Mặt tiền (m)
            </label>
            <input
              className="info__form-input"
              id="frontispiece"
              name="frontispiece"
              type="number"
              placeholder="Nhập mặt tiền của bất động sản"
              value={frontispiece}
              onChange={handleChangeInput}
            />
          </div>

          <div className="info__form-group">
            <label htmlFor="lengthOfAlley" className="info__form-label">
              Đường vào (m)
            </label>
            <input
              className="info__form-input"
              id="lengthOfAlley"
              name="lengthOfAlley"
              type="number"
              placeholder="Nhập khoảng cách từ đường chính"
              value={lengthOfAlley}
              onChange={handleChangeInput}
            />
          </div>
          <div className="info__form-group">
            <label htmlFor="numFloor" className="info__form-label">
              Số tầng
            </label>
            <input
              className="info__form-input"
              id="numFloor"
              name="numFloor"
              type="number"
              placeholder="Nhập số tầng"
              value={numFloor}
              onChange={handleChangeInput}
            />
          </div>

          <div className="info__form-group">
            <label htmlFor="numBathroom" className="info__form-label">
              Số nhà tắm/toilet
            </label>
            <input
              className="info__form-input"
              id="numBathroom"
              name="numBathroom"
              type="number"
              placeholder="Nhập số nhà tắm/toilet"
              value={numBathroom}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="info__form-content">
          <div className="info__form-group">
            <label htmlFor="directOfHouse" className="info__form-label">
              Hướng nhà
            </label>
            <div className="info__form-select">
              <select
                className={`info__form-input ${directHouseSelected}`}
                value={directOfHouse}
                onChange={(e) => {
                  setDirectHouseSelected("");
                  handleChangeInfo(e);
                }}
                id="directOfHouse"
                name="directOfHouse"
              >
                <option className="info_form-disable" value="" disabled>
                  Chọn hướng nhà của bất động sản
                </option>
                <option value="Đông">Đông</option>
                <option value="Tây">Tây</option>
                <option value="Nam">Nam</option>
                <option value="Bắc">Bắc</option>
                <option value="Đông - Bắc">Đông - Bắc</option>
                <option value="Tây - Bắc">Tây - Bắc</option>
                <option value="Đông - Nam">Đông - Nam</option>
                <option value="Tây - Nam">Tây - Nam</option>
              </select>
              <img
                className="info__form-select-icon"
                src={arrowDown}
                alt="arrowDown"
              />
            </div>
          </div>

          <div className="info__form-group">
            <label htmlFor="directOfBalcony" className="info__form-label">
              Hướng ban công
            </label>
            <div className="info__form-select">
              <select
                className={`info__form-input ${directBalconySelected}`}
                onChange={(e) => {
                  setDirectBalconySelected("");
                  handleChangeInfo(e);
                }}
                id="directOfBalcony"
                value={directOfBalcony}
                name="directOfBalcony"
              >
                <option className="info_form-disable" value="" disabled>
                  Chọn hướng ban công
                </option>
                <option value="Đông">Đông</option>
                <option value="Tây">Tây</option>
                <option value="Nam">Nam</option>
                <option value="Bắc">Bắc</option>
                <option value="Đông - Bắc">Đông - Bắc</option>
                <option value="Tây - Bắc">Tây - Bắc</option>
                <option value="Đông - Nam">Đông - Nam</option>
                <option value="Tây - Nam">Tây - Nam</option>
              </select>
              <img
                className="info__form-select-icon"
                src={arrowDown}
                alt="arrowDown"
              />
            </div>
          </div>
          <div className="info__form-group">
            <label htmlFor="numBedroom" className="info__form-label">
              Số phòng ngủ
            </label>
            <input
              className="info__form-input"
              id="numBedroom"
              name="numBedroom"
              type="number"
              placeholder="Nhập số phòng ngủ"
              value={numBedroom}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>

      <div className="info__form-group col-full">
        <label htmlFor="furnitureInfo" className="info__form-label">
          Nội thất
        </label>
        <input
          className="info__form-input"
          id="furnitureInfo"
          name="furnitureInfo"
          type="text"
          placeholder="Nhập những nội thất đặc biệt, đáng chú ý"
          value={furnitureInfo}
          onChange={handleChangeInfo}
        />
      </div>
      <div className="info__form-group col-full">
        <label htmlFor="legalInfo" className="info__form-label">
          Thông tin pháp lý
        </label>
        <input
          className="info__form-input"
          id="legalInfo"
          name="legalInfo"
          type="text"
          placeholder="VD: sổ đỏ, sổ hồng, phê duyệt đầu tư"
          value={legalInfo}
          onChange={handleChangeInfo}
        />
      </div>
    </div>
  );
};

export default OtherInfo;
