import React, { useEffect, useState } from "react";
import "../../assests/css/hot_and_types.css";
import axios from "axios";
import ReCardInfo from "../real-estate-info/ReCardInfo";
import Cookies from 'js-cookie';
import { LoadHotRealEstate } from "../../redux/action";
import { useDispatch, useSelector } from 'react-redux';
function Hot() {

  const numRenderInit = 8;
  const numRenderLoadMore = 16;
  const [listNewest, setListNewest] = useState([]);
  const [listNewestRender, setListNewestRender] = useState([]);
  const [displayBtn,setDisplayBtn] = useState("block")
  const [isLogin, setIsLogin] = useState(false);
  const {dataHotRealEstate} = useSelector(state => state.commonReducer)
  const dispatch = useDispatch();
  const Token = Cookies.get("token");
  const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/real-estate/newestate/dateupload/`;
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseURL, { headers: { Authorization: "Bearer " +  Token } })
        .then(res => {
          dispatch(LoadHotRealEstate(res.data))
          setListNewest(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }
        fetchData();
  }, []);
  useEffect(()=>{
    if(dataHotRealEstate != []){
      setListNewestRender(dataHotRealEstate.slice(0, numRenderInit));
    }
  },[listNewest])
  const loadMore = () => {
    setListNewestRender(dataHotRealEstate.slice(0, numRenderLoadMore));
    setDisplayBtn("none")
  };

  return (
    <div className="hot__wrapper">
      <div className="hot__container">
        <h3 className="hot__title">Bất động sản mới nhất</h3>

        <div className="hot__list">
          {listNewestRender.map((item, index) => {
            return (
              <div className="hot__item" key={index}>
                <ReCardInfo
                  price={item.detail.totalPrice}
                  name={item.title}
                  address={item.detail.address.note}
                  numofbed={item.detail.numBedroom}
                  numofbath={item.detail.numBathroom}
                  areainfo={item.detail.square}
                  img={item.pictures[0]}
                  landId={item._id}
                  isLike={item.tym}
                  checkLogin = {setIsLogin}
                />
              </div>
            );
          })}
        </div>
        <div className="morebutton" >
          <button className="button" onClick={loadMore} style={{display: displayBtn}} >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hot;
