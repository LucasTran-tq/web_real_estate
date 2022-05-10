import React, {useEffect, useState} from 'react';
import './real-estate-name.css';
import Dropdown from './../main-admin/dropdown/Dropdown';
import { useDispatch } from 'react-redux';
import { LikePost, DeleteLikePost } from '../../redux/action';
import Cookies from "js-cookie";
import Popup from 'reactjs-popup';
import SignIn from "../../components/sign/sign-in";
import SignUp from "../../components/sign/sign-up";
import ConfirmEmail from "./../sign/confirm-email";

import ic_share from "./../../assests/real_estate_info/ic_share.png"
import Heart from "../../assests/image/Heart.png";
import RedHeart from "../../assests/image/RedHeart.png"

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton, 
    TwitterIcon,
  } from "react-share";

  function RealEstateName(props) {
    const [img, setimg] = useState("Heart");  
    
    const [isShowSignIn, setIsShowSignIn] = useState(false);
    const [isShowSignUp, setIsShowSignUp] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [headerEmail, setHeaderEmail] = useState();

    const dispatch = useDispatch();

    const hanndleOnclickHeart = () => {
        const Token = Cookies.get("token");
        if(!!Token) {
            if(img === Heart) {
                setimg(RedHeart);
                dispatch(LikePost(props.realEstateID))
            } else {
                setimg(Heart);
                dispatch(DeleteLikePost(props.realEstateID))
            }
            
        } else {
            setimg(Heart);
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
        console.log(props.isLike)
        if(props.isLike) {
            setimg(RedHeart);
        } else {
            setimg(Heart);
        }
    },[props.isLike])
    

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

    function short(data){
        const text = data+" ";
        const length = text.length;
        return  (length<80) ? text : text.slice(0,80) + "...";
    }
    const shareUrl = `${process.env.REACT_APP_DOMAIN_URL}/user/real-estate-info/` + props.realEstateID;
    return (
        <div className='real-estate-name-container'>
            { !!props ?
            <div>
                <div className='real-estate-name-container-header'>
                    <div className='real-estate-name'>{short(props.title)}</div>
                    <div className='real-estate-description'>
                            <span className='real-estate-description-key'>Mô tả ngắn: </span>
                            <span className='real-estate-description-value'>{short(props.content)}</span>    
                    </div>
                </div>
                <div className='real-estate-line' ></div>
                <div className='real-estate-name-footer'>
                    
                    <div className='real-estate-info'>
                        <div className='real-estate-info-key'>Mức giá</div>
                        <div className='real-estate-info-value'>{convert(props.totalPrice)}</div>
                    </div>
                    <div className='real-estate-info'>
                        <h2 className='real-estate-info-key'>Diện tích</h2>
                        <h2 className='real-estate-info-value'>{props.square}m²</h2>
                    </div>
                    <div className='real-estate-info'>
                        <h2 className='real-estate-info-key'>Phòng ngủ</h2>
                        <h2 className='real-estate-info-value'>{props.numBedroom} phòng</h2>
                    </div>
                    <Dropdown
                        contentStyle="dropdown__content"
                        customToggle={() => (
                            <div className='dropdown__toggle'>
                                <img className='ic_share' src={ic_share}></img>
                                <span className="share">Chia sẻ</span>
                            </div>
                        )} 
                        customContent={() => (
                            <div >
                                <FacebookShareButton url={shareUrl} className="btnShare-container">
                                    <FacebookIcon size={40} borderRadius={10}/>
                                    <span>Facebook</span>
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} className="btnShare-container">
                                    <TwitterIcon size={40} borderRadius={10}/>
                                    <span>Twitter</span>
                                </TwitterShareButton>
                            </div>
                        )}                 
                    />
                    <div className='btn-container'>
                        <button className="btn" style={{color: img}} 
                        onClick={hanndleOnclickHeart}
                        >
                            {/* <i className="far fa-heart" ></i>
                            <i className={ img === 'black'? "far fa-heart" : "fas fa-heart" } style={{position: 'absolute'}}></i> */}
                            <img src={img} alt="heart" ></img>
                            <span>Yêu thích</span>
                        </button>                       
                    </div>
                </div>
                <div className='real-estate-info-value-1'>- {convert(props.unitPrice)}/m²</div>
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
            </div>                
            : null }
        </div>
    );
}
export default RealEstateName;
