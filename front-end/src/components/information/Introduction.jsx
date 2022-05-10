import React, { useEffect, useState } from "react";
import "./Introduction.css";
import { Fragment } from "react/cjs/react.production.min";
import axios from "axios";
import { Link } from 'react-router-dom'
export default function Introduction() {
  const [info, setInfo] = useState([]);
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1/company/info/`;
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl)
        .then(res => {
          setInfo(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetchData()
  }, []);
  return (
    <Fragment>
      {info.map((item, index) => {
        return (
          <div>
            <div className="intro_wrapper">
              <div className="intro_frame_picture_left">
                <div className="intro_picture">
                  <img src={item.image}></img>
                </div>
              </div>
              <div className="intro_frame_title_right">
                <p className="intro_title_top">{item.name}</p>
                <p className="intro-title">{item.slogan}</p>
                <p className="intro-content">
                  {`${item.description}`}
                </p>
                <button className="intro_button">
                  <a className="intro_button" href="/upcoming">Tìm kiếm ngay</a>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
