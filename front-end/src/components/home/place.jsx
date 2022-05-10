import React, { useEffect, useState, Component } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import hcm from "../../assests/zz.png";
import hanoi from "../../assests/hanoi.png";
import dongnai from "../../assests/dongnai.png";
import danang from "../../assests/danang.png";
import haiphong2 from "../../assests/haiphong2.png";

function Place() {
  const [dataProvinces, setDataProvinces] = useState(null);

  useEffect(() => {
    async function getDataProvince() {
      // fetch(`http://localhost:5000/api/v1/address/province-list/`)
      await fetch(`${process.env.REACT_APP_API_URL}/api/v1/address/top-provinces/`)
        .then((res) => res.json())
        .then((data) => {
          setDataProvinces(data);
        })
        .catch((err) => console.log(err));
    }
    getDataProvince();
  }, []);

  return (
    <Fragment>
      <div className="place__block">
        <div className="place__content-container">
          <div className="place__content-container-header">
            <span className="pacle__content-header-label">
              Bất động sản theo địa điểm
            </span>
            <span className="place__content-header-sublabel">
              Dựa trên những địa điểm nổi bật
            </span>
          </div>

          <div className="place__item-container">
            {!!dataProvinces && (
              <Link
                to={`/user/land-for-sale-province/${dataProvinces[0]._id[0]._id}`}
              >
                <div className="place__item-left">
                  <img
                    className="place__item-left-img"
                    src={hcm}
                    alt="Banner"
                  ></img>
                  <div className="place__item-left-info">
                    <span className="place__item-left-info-city">
                      {dataProvinces[0]._id[0].name}
                    </span>
                    <span className="place__item-left-info-new">
                      {dataProvinces[0].amount} tin đăng
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className="place__item-right">
              {!!dataProvinces && (
                <Link
                  to={`/user/land-for-sale-province/${dataProvinces[1]._id[0]._id}`}
                >
                  <div className="place__item-right-1">
                    <img
                      className="place__item-right-img"
                      src={hanoi}
                      alt="Banner"
                    ></img>
                    <div className="place__item-right-info">
                      <span className="place__item-right-info-city">
                        {dataProvinces[1]._id[0].name}
                      </span>
                      <span className="place__item-right-info-new">
                        {dataProvinces[1].amount} tin đăng
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {!!dataProvinces && (
                <Link
                  to={`/user/land-for-sale-province/${dataProvinces[2]._id[0]._id}`}
                >
                  <div className="place__item-right-2">
                    <img
                      className="place__item-right-img"
                      src={danang}
                      alt="Banner"
                    ></img>
                    <div className="place__item-right-info">
                      {!!dataProvinces && (
                        <span className="place__item-right-info-city">
                          {dataProvinces[2]._id[0].name}
                        </span>
                      )}
                      {!!dataProvinces && (
                        <span className="place__item-right-info-new">
                          {dataProvinces[2].amount} tin đăng
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )}

              {!!dataProvinces && (
                <Link
                  to={`/user/land-for-sale-province/${dataProvinces[3]._id[0]._id}`}
                >
                  <div className="place__item-right-3">
                    <img
                      className="place__item-right-img"
                      src={haiphong2}
                      alt="Banner"
                    ></img>
                    <div className="place__item-right-info">
                      {!!dataProvinces && (
                        <span className="place__item-right-info-city">
                          {dataProvinces[3]._id[0].name}
                        </span>
                      )}
                      {!!dataProvinces && (
                        <span className="place__item-right-info-new">
                          {dataProvinces[3].amount} tin đăng
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )}

              {!!dataProvinces && (
                <Link
                  to={`/user/land-for-sale-province/${dataProvinces[4]._id[0]._id}`}
                >
                  <div className="place__item-right-4">
                    <img
                      className="place__item-right-img"
                      src={dongnai}
                      alt="Banner"
                    ></img>
                    <div className="place__item-right-info">
                      {!!dataProvinces && (
                        <span className="place__item-right-info-city">
                          {dataProvinces[4]._id[0].name}
                        </span>
                      )}
                      {!!dataProvinces && (
                        <span className="place__item-right-info-new">
                          {dataProvinces[4].amount} tin đăng
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Place;
