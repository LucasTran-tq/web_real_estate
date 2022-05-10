import React, {useEffect, useState} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import "./land-for-sale.css";
import Heart from "../../assests/image/Heart.png";
import RedHeart from "../../assests/image/RedHeart.png"
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import SignIn from "../../components/sign/sign-in";
import SignUp from "../../components/sign/sign-up";
import ConfirmEmail from "./../sign/confirm-email";
import { useDispatch } from 'react-redux';
import { LikePost, DeleteLikePost } from '../../redux/action';
import Cookies from 'js-cookie';
function LandInfo(props) {
    // const initLike = props.isLike ? RedHeart : Heart;
    //let isLike = props.isLike;
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
                dispatch(LikePost(props.landId))
            } else {
                setimg(Heart);
                dispatch(DeleteLikePost(props.landId))
            }
            
        } else {
            setimg(Heart);
            setIsShowSignIn(true);
        }
        
    }
    // if(isLike && img === Heart) {
    //     setimg(RedHeart);
    // }
    useEffect(() => {
        if(isLogin) {
            props.checkLogin(isLogin);
            window.location.reload();
        }

    }, [isLogin]);

    useEffect(() => {
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
        return (
            <Fragment>
                <div className="landinfo__container">
                    <div className="landinfo__left" >
                        <img src={props.landImage} alt="banner" className="landinfo__left-image" />
                        <button className="landinfo__left-heart"
                            onClick={hanndleOnclickHeart}>
                            <img src={img} alt="heart" style={{position: 'absolute', backgroundRepeat: 'none', width : "20.09px", heigh:"17.99px"}}></img>
                        </button>
                        <div className="landinfo__left-content" >
                            <p style={{ fontWeight: 500, fontSize: "15px", lineHeight: "18px" }}>{props.imageLength}</p>
                            <i className="far fa-image" style={{ fontSize: "17px"}}></i>
                        </div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className="landinfo__right">
                    <Link to= {`/user/real-estate-info/${props.landId}`}>
                        <div className="landinfo__right-content1">
                            <span style={{ fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "19px" }}> {props.landName} </span>
                            <span style={{ fontStyle: "normal", fontWeight: 500, fontSize: "20px", lineHeight: "23px", color: "#A18474", marginTop: "15px" }}> {props.landPrice} </span>
                                <span className="landinfo__address"> {props.landAddress} </span>
                            <span className="landinfo__description">{props.landDescription}</span>
                        </div>
                    </Link>
                        <div className="landinfo__right-content2">
                            <div>
                                <span>{props.landTime}</span>
                                <span>{props.landAuthor}</span>
                            </div>
                        </div>
                       
                    </div>
                </div>
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
            </Fragment>
          );
}

export default LandInfo;