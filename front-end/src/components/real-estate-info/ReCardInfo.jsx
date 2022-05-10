import React, {useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";

import heart1 from "../../assests/image/ReCarouselOwl/heart1.png";
import share1 from "../../assests/image/ReCarouselOwl/share1.png";
import bed from "../../assests/image/ReCarouselOwl/bed.png";
import bath from "../../assests/image/ReCarouselOwl/bath.png";
import area from "../../assests/image/ReCarouselOwl/area.png";
import filled_heart from "../../assests/image/ReCarouselOwl/filled_heart.png";
import "./real-estate-info.css";
import { useDispatch } from 'react-redux';
import { LikePost,DeleteLikePost } from '../../redux/action';
import Popup from 'reactjs-popup';
import SignIn from "../../components/sign/sign-in";
import SignUp from "../../components/sign/sign-up";
import ConfirmEmail from "./../sign/confirm-email";
import Cookies from 'js-cookie';

export default function ReCardInfo(props) {

    const [isShowSignIn, setIsShowSignIn] = useState(false);
    const [isShowSignUp, setIsShowSignUp] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
  
    const [isLogin, setIsLogin] = useState(false);
    const [headerEmail, setHeaderEmail] = useState();

    const [iconHeart, setIconHeart] = useState(heart1)

    const [isLike, setIsLike] = useState(props.isLike)
    const dispatch = useDispatch();

    const onMouseClick = () => {
        const Token = Cookies.get("token");

        if (!!Token) {
            if(!isLike){
                setIsLike(true)
                dispatch(LikePost(props.landId))
            }else{
                setIsLike(false)
                dispatch(DeleteLikePost(props.landId))
            }

        } else {
            setIsLike(false)
            setIsShowSignIn(true);
        }
    }
    useEffect(() => {
        if(isLogin) {
            props.checkLogin(isLogin);
            window.location.reload();
        }
    }, [isLogin]);

    useEffect(() => {
        if(props.isLike) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    },[props.isLike])

    function convert(totalPrice){
        const billion = 1000000000;
        const million = 1000000;
        if(totalPrice >= billion) {
            return (totalPrice / billion).toFixed(2) + " tỷ";
        } else if(totalPrice >= million) {
            return (totalPrice / million).toFixed(2) + " triệu";
        }
        return totalPrice+" VNĐ";
    }
    const handleSignUp = () => {
        setIsShowSignUp(true);
        setIsShowSignIn(false);
        setIsShowConfirm(false);
      }
      const loginHandle = () => {
        setIsLogin(true);
      }
      const handleConfirm = () => {
        setIsShowConfirm(true);
        setIsShowSignUp(false);
        setIsShowSignIn(false);
        //setIsLogin(true);
      }
      const handleSignInClose = () => {
        setIsShowSignIn(false);
      }
      const handleSignIn = () => {
        setIsShowSignIn(true);
        setIsShowSignUp(false);
        setIsShowConfirm(false);
      }
    const { name, address,numofbed,numofbath,areainfo } = props

    const titleCard = name.length > 30 ? `${name.slice(0, 40)}...` : name
    const addressCard = address.length > 45 ? `${address.slice(0, 45)}...` : address
    return (
            <div className="re-card-info-container">
                <div>
                    <a href={`/user/real-estate-info/${props.landId}`}>
                        <div className="re-card-img">
                            <img src={props.img}></img>
                        </div>
                    </a>
                    <div className="re-card-info">
                        <div className="re-card-title">
                            <p>{convert(props.price)}/m²</p>
                            <div className="re-card-title-icon-container">
                                <div className="re-card-icon-heart">
                                    <img
                                        src={isLike ? filled_heart : heart1}
                                        onClick={onMouseClick}
                                    />
                                </div>
                                {/* <div className="re-card-icon-share">
                                    <img src={share1} />
                                </div> */}
                            </div>
                        </div>
                        <a href={`/user/real-estate-info/${props.landId}`}>
                            <div className="re-card-name-container"><p className="re-card-name">{titleCard}</p></div>
                        </a>
                        <div className="re-card-address-container"> <p className="re-card-address">{addressCard}</p></div>
                        <div className="re-card-info-detail">
                            <ul className="re-card-info-list">
                                <li>
                                    <div>
                                        <span className="re-card-info-num" style={{"font-size": numofbed >=100 ? "8px" : "12px"}}>{numofbed}</span>
                                        <div className="mid-dot" />
                                    </div>

                                    <img src={bed} />
                                </li>
                                <li>
                                    <div>
                                        <span className="re-card-info-num" style={{"font-size": numofbath >=100 ? "8px" : "12px"}}>{numofbath}</span>
                                        <div className="mid-dot" />
                                    </div>
                                    <img src={bath} />
                                </li>
                                <li>
                                    <div>
                                        <span className="re-card-info-num" style={{"font-size":  areainfo >=1000 ? "8px" : "12px"}}>
                                            {areainfo}m<sup>2</sup>
                                        </span>
                                        <div className="mid-dot" />
                                    </div>
                                    <img src={area} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
                <Popup open={isShowSignIn} onClose={() => setIsShowSignIn(false)} modal nested closeOnDocumentClick={false}>
                    {<SignIn 
                        setIsShowSignIn={handleSignInClose} 
                        handleSignUp={handleSignUp}
                        isShowSignUp={isShowSignUp}
                        setIsLogin={loginHandle}
                    />}
                </Popup>
                <Popup open={isShowSignUp} onClose={() => setIsShowSignUp(false)} closeOnDocumentClick={false} >
                {<SignUp
                  setEmailHeader={setHeaderEmail}
                  handleConfirm={handleConfirm}
                  handleSignInOpen={handleSignIn}
                  setIsSignUpOpen={setIsShowSignUp} />}
                </Popup>
                <Popup open={isShowConfirm}>
                    {<ConfirmEmail
                        setIsLogin={setIsLogin}
                        email={headerEmail} />}
                </Popup>
            </div >
    );
}
