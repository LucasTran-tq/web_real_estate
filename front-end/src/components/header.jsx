import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import "./header.css";
import {
  Link, NavLink
} from "react-router-dom";
import logo from "../assests/user_page/logo homeV.png";
import global from "../assests/user_page/global.png";
import Popup from 'reactjs-popup';
//#region Popup
import SignIn from "../components/sign/sign-in";
import SignUp from "../components/sign/sign-up";
import ConfirmEmail from "./sign/confirm-email";
import ForgotPassword from "./sign/forgot-password";
import UpdateInformation from "./sign/change-email";
//#endregion
import Dropdown from '../components/main-admin/dropdown/Dropdown'
import user_image from '../assests/avatar.jpg'
import ic_logout from '../assests/ic_logout.png'
import ic_nolike from '../assests/no-like.svg'
import axios from "axios";
import Cookies from 'js-cookie';
import moment from "moment";
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';
import { LoadWishlist, DeleteLikePost } from '../redux/action';


var posX = window.innerWidth;
window.onresize = () => {
  posX = window.innerWidth;
}

const landForSaleLink = "/user/land-for-sale/";
const landForRentLink = "/user/land-for-rent/";
const meetingRoomLink = "/upcoming";
const newsLink = "/user/news";
const informationLink = "/user/information";
const contractAddressLink = "/upcoming";

let navbarItems = [
  {
    displayName: "Nhà đất bán",
    link: landForSaleLink + "all",
    dropDownItems: [
      {
        displayName: "Bán căn hộ chung cư",
        link: landForSaleLink,
      },
      {
        displayName: "Bán nhà biệt thự, liền kề",
        link: landForSaleLink,
      },
      {
        displayName: "Bán nhà mặt phố",
        link: landForSaleLink,
      },
      {
        displayName: "Bán đất nền, dự án",
        link: landForSaleLink,
      },
      {
        displayName: "Bán đất",
        link: landForSaleLink,
      },
      {
        displayName: "Bán trang trại, khu nghỉ dưỡng",
        link: landForSaleLink,
      },
      {
        displayName: "Bán condotel",
        link: landForSaleLink,
      },
      {
        displayName: "Bán kho, nhà xưởng",
        link: landForSaleLink,
      },
      {
        displayName: "Bán loại bất động sản khác",
        link: landForSaleLink,
      },
    ],
  },
  {
    displayName: "Nhà đất cho thuê",
    link: landForRentLink + "all",
    dropDownItems: [
      {
        displayName: "Cho thuê căn hộ chung cư",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê nhà riêng",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê nhà mặt phố",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê nhà trọ, phòng trọ",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê văn phòng",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê cửa hàng - ki-ốt",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê kho, nhà xưởng, đất",
        link: landForRentLink,
      },
      {
        displayName: "Cho thuê loại bất động sản khác",
        link: landForRentLink,
      },
    ],
  },
  {
    displayName: "Phòng họp",
    link: meetingRoomLink,
    dropDownItems: [],
  },
  {
    displayName: "Tin tức",
    link: newsLink,
    dropDownItems: [
      {
        displayName: "BĐS & Covid-19",
        link: '/upcoming',
      },
      {
        displayName: "Thị trường",
        link: '/upcoming',
      },
      {
        displayName: "Phân tích - nhận định",
        link: '/upcoming',
      },
      {
        displayName: "Chính sách - Quản lý",
        link: '/upcoming',
      },
      {
        displayName: "Thông tin quy hoạch",
        link: '/upcoming',
      },
      {
        displayName: "Bất động sản thế giới",
        link: '/upcoming',
      },
      {
        displayName: "Tài chính - Chứng khoán - BĐS",
        link: '/upcoming',
      },
      {
        displayName: "Tư vấn luật",
        icon: "fas fa-angle-right angle-left",
        link: '/upcoming',
      },
      {
        displayName: "Lời khuyên",
        icon: "fas fa-angle-right angle-left",
        link: '/upcoming',
      },
    ],
  },
  {
    displayName: "Thông tin",
    link: informationLink,
    dropDownItems: [],
  },
  {
    displayName: "Liên hệ",
    link: contractAddressLink,
    dropDownItems: [],
  },
];
const noti_item = [
  {
    "content": "Curabitur id eros quis nunc suscipit blandit pretium a erat"
  },
  {
    "content": "Duis malesuada justo eu sapien elementum, in semper diam posuere"
  },

  {
    "content": "Donec at nisi sit amet tortor commodo porttitor pretium a erat"
  },
  {
    "content": "In gravida mauris et nisi commodo porttitor pretium a erat"
  },
  {
    "content": "Curabitur id eros quis nunc suscipit blandit pretium a erat"
  }
]
const liked_item = [
  {
    "thumpnail": user_image,
    "title": "Curabitur id eros quis nunc suscipit blandit pretium a erat",
    "time": "Vừa lưu xong"
  },
  {
    "thumpnail": user_image,
    "title": "Duis malesuada justo eu sapien elementum, in semper diam posuere",
    "time": "Vừa lưu xong"
  },
  {
    "thumpnail": user_image,
    "title": "Donec at nisi sit amet tortor commodo porttitor pretium a erat",
    "time": "Lưu ... phút trước"
  }
]

const user_menu = [
  {
    content: "Quản lý tin đăng",
    icon: "fas fa-angle-right angle-left",
    link: '/admin/posts'
  },
  {
    content: "Quản lý tài khoản",
    icon: "fas fa-angle-right angle-left",
    link: '/admin/profile'
  },
  {
    content: "Thay đổi mật khẩu",
    icon: "fas fa-angle-right angle-left",
    link: '/admin/password'
  }
]
const renderNoFooter = () => (
  <div className="no-footer"></div>
)
const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const renderHoverTag = () => (
  <div className="like-hover">Danh sách tin yêu thích</div>
)

const renderLikeHeader = () => (
  <div className="like-header">
    Tin đăng yêu thích
  </div>
)

const renderNoLike = () => (
  <div className="like-item no-like">
    <img className="no-like_img" src={ic_nolike} />
    <span>Hãy lưu tin bạn yêu thích</span>
    <span>và xem chúng tại đây</span>
  </div>
)
const renderLikeFooter = () => (
  <div className="like_footer">
    <a className="like-see-all" href='/admin/favourite'>
      <button className="footer_btn font14">Xem tất cả</button>
    </a>
  </div>

)

const renderUserToggle = (name, image) => {
  return (
    <li className="topnav__right-user">
      <div className="topnav__right-user__li">
        <div className="topnav__right-user__image">
          <img src={image} alt="" />
        </div>
      </div>
      <div>
        <div className="topnav__right-user__name">
          {name}
        </div>
      </div>
      <div>
        <i className="fas fa-angle-down margin8"></i>
      </div>
    </li>)
}

const renderUserMenu = (item, index) => (
  <div key={index}>
    <a href={item.link} >
      <div className="user-menu">
        <span className="user-menu__item" >{item.content}</span>
        <i className={item.icon}></i>
      </div>
    </a>
  </div>
)

function Header() {
  const [isShowSignIn, setIsShowSignIn] = useState(false);
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowForgot, setIsShowForgot] = useState(false);
  const [isShowChangeEmail, setIsShowChangeEmail] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [headerEmail, setHeaderEmail] = useState();
  const [name, setName] = useState("Name");
  const [image, setImage] = useState(user_image);
  // const [likedsList, setLikedsList] = useState([]);
  const [likedLength, setLikedLength] = useState(0);
  const [allLikedLength, setAllLikedLength] = useState(0);
  const [realEstateItem, setRealEstateItem] = useState([]);
  //state type sale, rent
  const [typeSale, setTypeSale] = useState([]);
  const [typeRent, setTypeRent] = useState([]);
  navbarItems[0].dropDownItems = typeSale.map(type => {
    return {
      displayName: type.name,
      link: `/user/land-for-sale/${type.id}`
    }
  })
  console.log("typeSale", typeSale);
  navbarItems[1].dropDownItems = typeRent.map(type => {
    return {
      displayName: type.name,
      link: `/user/land-for-rent/${type.id}`
    }
  });
  console.log(typeRent);
  const [userID, setUserID] = useState();

  const { likedsList } = useSelector(state => state.commonReducer)
  const dispatch = useDispatch();

  const renderLikeItem = (item, index) => (

    <div className="like-item" key={index}>
      <a href={`/user/real-estate-info/${item && item.id}`} className="like-link">
        <img className="thumpnail" src={item && item.thumpnail} />

        <div className="like-short" >
          <span className="like-title">{item && item.title}</span>
          <span className="like-time">{item && item.time}</span>
        </div>
      </a>
      <span className="fas fa-times like-discard" onClick={() => DelLikedItem(item.id)}></span>
    </div>

  )
  const loginHandle = () => {
    setIsLogin(true);
    window.location.reload()
  }
  //flag
  const handleCloseForgot = () => {
    setIsShowForgot(false);
  }
  const handleSignIn = () => {
    setIsShowSignIn(true);
    setIsShowSignUp(false);
    setIsShowConfirm(false);
    setIsShowForgot(false);
    setIsShowChangeEmail(false);
  }
  const handleSignUp = () => {
    setIsShowSignUp(true);
    setIsShowSignIn(false);
    setIsShowConfirm(false);
  }

  const handleConfirm = () => {
    setIsShowConfirm(true);
    setIsShowSignUp(false);
    setIsShowSignIn(false);
    setIsShowForgot(false);
    //setIsLogin(true);
  }
  const handleForgot = () => {
    setIsShowForgot(true);
    setIsShowSignIn(false);
  }
  const handleLogout = () => {
    setIsShowConfirm(false);
    setIsShowSignIn(false);
    setIsShowSignUp(false);
    setIsLogin(false);
    Cookies.remove('bearerToken');
    Cookies.remove('token');
    const Token = Cookies.get('token')
    console.log('cookie123', Token);
    window.location.reload();

  }
  const handleUpdateConfirmation = () => {
    setIsShowConfirm(false);
    setIsShowChangeEmail(true);
  }
  const halndleLogin = () => {
    setIsLogin(true);
  }
  const handleSignInClose = () => {
    setIsShowSignIn(false);
  }
  const handleChangeEmailClose = () => {
    setIsShowChangeEmail(false);
    setIsShowConfirm(true);
  }
  const checkLogin = async () => {
    const Token = Cookies.get('token')
    if (!!Token) {
      var j = JSON.parse(atob(Token.split('.')[1]));
      setIsLogin(true);
      await getUserData(j['id']);
    } else {
      setIsLogin(false);
    }
  }

  const fetchType = (id, setState) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/api/v1/categories/${id}/types`,
    })
      .then((res) => {
        const data = res.data;
        const newdata = data.map((item) => {
          return {
            id: item._id,
            name: item.name,
          };
        });
        setState(newdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    checkLogin();
    //hardcode
    fetchType('6193a1e36a03d69a07417779', setTypeSale);
    fetchType('6193a2b06a03d69a0741777a', setTypeRent);
  }, []);

  useEffect(() => {
    setListLikesData(likedsList);

  }, [likedsList])

  const getUserData = async (id) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/` + id + '/users'
      )
      .then(res => {
        const data = res.data
        const list_1 = {
          "fullname": data[0].fullName,
          "image": data[0].image,
          "likeds": [...data[0].likeds],
        }
        setUserID(id);
        setName(list_1.fullname);
        setImage(list_1.image);
        dispatch(LoadWishlist(list_1.likeds))
      })
      .catch(error => console.log(error));
  }

  const setListLikesData = (likedsList) => {
    setAllLikedLength(likedsList.length);
    if (!!likedsList) {
      if (likedsList.length > 3) {
        var top3 = likedsList.slice(0, 3);
        //console.log(top3)
        getEstate(top3);
      }
      else { getEstate(likedsList); }
    }
  }

  const getEstate = async (likedsList) => {
    const curArr = []
    if (likedsList.length > 0) {
      for (var i = 0; i < likedsList.length; i++) {

        var likedsItem = likedsList[i]
        var pass = moment(likedsItem['updatedAt']).zone('+07:00').format('YYYY-MM-DD HH:mm:ss');
        var timePass = moment(pass).fromNow();
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/v1/real-estate/` + likedsItem['realEstate']
          )
          .then(res => {
            const data = res.data
            if (!!data) {
              const list_2 = {
                "id": data[0]._id,
                "title": data[0].title,
                "thumpnail": data[0].pictures[0],
                "time": timePass,
                "pos": i
              }
              curArr.push(list_2)
              setLikedLength(curArr.length);
            }
          })
          .catch(error => console.log(error));
        setRealEstateItem(curArr)
      }
    } else {
      setRealEstateItem([])
      setLikedLength(0);
    }
  }
  const DelLikedItem = async (itemID) => {
    // console.log("new list ", likedsList);
    // await axios({
    //   method: 'POST',
    //   url: `${process.env.REACT_APP_API_URL}/api/v1/users/liked`,
    //   data: {
    //     realEstate: itemID,
    //   },
    //   headers: {
    //     Authorization: "Bearer " + Token,
    //   }
    // })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // window.location.reload();

    dispatch(DeleteLikePost(itemID))
  }

  return (
    <Fragment>
      <div className="header-container">
        <ul className="header-col">
          <li className="logo-container">
            <Link to="/user">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </li>
          {navbarItems.map((item, index) => {
            return (
              <li className="header-navbar" key={index}>
                <a
                  exact
                  href={item.link}
                  activeClassName="active"
                  className="navbar-link">
                  {item.displayName}
                </a>
                <div className="line"></div>
                <ul className="navbar-hover-list">
                  {item.dropDownItems.map((item, index) => {
                    return (
                      <li key={index} className="drop-list-item">
                        <a className="drop-link" href={item.link}>{item.displayName}</a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        {!isLogin ? (
          <ul className="header-col">
            <li>
              <a href="/upcoming">
                <img src={global} alt="global" />
              </a>
            </li>
            <li className="header-navbar login">
              <button onClick={handleSignIn} className="navbar-link">Đăng nhập</button>
              <Popup open={isShowSignIn} onClose={() => setIsShowSignIn(false)} modal nested closeOnDocumentClick={false}>
                {<SignIn
                  setIsShowSignIn={handleSignInClose}
                  handleSignUp={handleSignUp}
                  setIsLogin={loginHandle}
                  handleForgotOpen={handleForgot}
                  isShowSignUp={isShowSignUp} />}
              </Popup>
              <div className="line"></div>
            </li>
            <li>
              <button onClick={handleSignUp} className="register-btn">Đăng ký</button>
              <Popup open={isShowSignUp} onClose={() => setIsShowSignUp(false)} closeOnDocumentClick={false} >
                {<SignUp
                  setEmailHeader={setHeaderEmail}
                  handleConfirm={handleConfirm}
                  handleSignInOpen={handleSignIn}
                  setIsSignUpOpen={setIsShowSignUp} />}
              </Popup>

              <Popup open={isShowConfirm} closeOnDocumentClick={false} >
                {<ConfirmEmail
                  setIsLogin={setIsLogin}
                  handleShowUpdateInformation={handleUpdateConfirmation}
                  email={headerEmail} />}
              </Popup>

              <Popup
                closeOnDocumentClick={false}
                onClose={() => setIsShowForgot(false)}
                open={isShowForgot}>
                {<ForgotPassword
                  setIsLogin={setIsLogin}
                  handleClose={handleCloseForgot}
                  headerEmail={headerEmail}
                  handleConfirm={handleConfirm}
                  handleOpenSignIn={handleSignIn} />}
              </Popup>

              <Popup
                closeOnDocumentClick={false}
                open={isShowChangeEmail}
                onClose={handleChangeEmailClose}>
                {<UpdateInformation
                  headerEmail={headerEmail}
                  setHeaderEmail={setHeaderEmail}
                  handleConfirm={handleConfirm}
                  handleClose={handleChangeEmailClose}
                />}
              </Popup>
            </li>
          </ul>) : (
      <ul className="header-col-right">
        {

          !!likedsList && <ul className="topnav__right-item-like">
            <Dropdown
              icon='far fa-heart'
              contentStyle="dropdown__content like-drop no-radius"
              badge={allLikedLength}
              contentData={realEstateItem}
              hoverTag={() => renderHoverTag()}
              renderHeader={() => renderLikeHeader()}
              renderItems={(item, index) => renderLikeItem(item, index)}
              customContent={() => likedLength === 0 ? renderNoLike() : ""}
              renderFooter={() => likedLength != 0 ? renderLikeFooter() : renderNoFooter()} />
          </ul>
        }
        {/* <button onClick={DelLikedItem} className="register-btn">Test Del and Update</button> */}
        <div className="topnav__right-item">
          {
            !!name && !!image && <li>
              <Dropdown
                contentStyle="dropdown__content"
                customToggle={() => renderUserToggle(name, image)}
                contentData={user_menu}
                renderItems={(item, index) => renderUserMenu(item, index)}
                renderFooter={() => <a href='/user'><hr width="100%" /> <button onClick={handleLogout} className="footer_btn">Đăng xuất<img src={ic_logout} alt="" className="ic-logout" /></button>    </a>} />
            </li>
          }
        </div>
        <Link to='/user/real-estate/create'><hr width="100%" /> <button className="post-btn">Đăng tin</button>    </Link>
      </ul>
      )
        }

    </div>
    </Fragment >
  );
}


export default Header;
