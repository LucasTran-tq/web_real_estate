import React, { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route, Link, Redirect,useParams } from "react-router-dom";
import Img_intro from "./../../assests/img_advantages/img_intro.png";
import "../../home/main/main.css";
import prev from "../../assests/introduction_page/arrow-left.png";
import next from "../../assests/introduction_page/arrow-right.png";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import img_reset from "./../../assests/img_advantages/reset.png";
import banner from "../../assests/introduction_page/banner.png";
import downBtn from "../../assests/introduction_page/downBtn.png";
const prevIcon = `<img src=${prev} />`;
const nextIcon = `<img src=${next} />`;
const Intro = () => {
  const [searchInfo, setSearchInfo] = useState({
    category: "Nhà đất bán",
  });
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [IsSearching,setIssearching]=useState(false);
  const [square, setSquare] = useState("");
  const [style1, setStyle1] = useState("");
  const [style2, setStyle2] = useState("");
  const [style3, setStyle3] = useState("");
  const [valuebtn, setValuebtn] = useState("Nhà đất bán");
  useEffect(() => {
    if (valuebtn == "Nhà đất bán") {
      setStyle1("btn-active");
      setStyle2("btn-none-active");
      setStyle3("btn-none-active");
    } else if (valuebtn == "Nhà đất cho thuê") {
      setStyle1("btn-none-active");
      setStyle2("btn-active");
      setStyle3("btn-none-active");
    } else {
      setStyle1("btn-none-active");
      setStyle2("btn-none-active");
      setStyle3("btn-active");
    }
  });

  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [type, setType] = useState([]);

  const [idCategory, setIdCategory] = useState(
    "6193a1e36a03d69a07417779,Nhà đất bán"
  );
  const [idCity, setIdCity] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idWard, setIdWard] = useState("");

  const [project, setProject] = useState("");
  const [arrayNone, setArrayNone] = useState({
    idnumberRoom: "",
    idDirection: "",
  });
  useEffect(() => {
    async function handleFetchType() {
      const id = idCategory.split(",")[0];
      if (id) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/categories/${id}/types`
        );
        setType(response.data);
      }
    }
    if (idCategory) {
      handleFetchType();
    }
  }, [idCategory]);

  const handleFetchCity = async () => {
    if (city.length == 0) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/provinces`
      );
      setCity(response.data);
    }
  };
  useEffect(() => {
    async function handleFetchDistrict() {
      const id = idCity.split(",")[0];
      if (id) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/address/provinces/${id}/districts`
        );
        setDistrict(response.data);
      }
    }
    handleFetchDistrict();
    document.querySelector(".districtSelect").value = "";
    document.querySelector(".wardSelect").value = "";
    if (idCity == "") {
      let b = searchInfo;
      delete b.province_Id;
      delete b.district_Id;
      setSearchInfo(b);
    }
  }, [idCity]);


  useEffect(() => {
    async function handleFetchWard() {
      const id = idDistrict.split(",")[0];
      if (id) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/address/districts/${id}/wards`
        );
        setWard(response.data);
      }
    }
    handleFetchWard();
    if (idDistrict == "") {
      let b = searchInfo;
      delete b.district_Id;
      delete b.ward_Id;
      setSearchInfo(b);
      document.querySelector(".wardSelect").value = "";
    }
  }, [idDistrict]);

  useEffect(() => {
    if (idWard == "") {
      let b = searchInfo;
      delete b.ward_Id;
      setSearchInfo(b);
    }
  }, [idWard]);


  useEffect(() => {
    if (arrayNone.idnumberRoom == "") {
      let b = searchInfo;
      delete b.numBedroom;
      setSearchInfo(b);
    }
  }, [arrayNone.idnumberRoom]);

  useEffect(() => {
    if (arrayNone.idDirection == "") {
      let b = searchInfo;
      delete b.directOfHouse;
      setSearchInfo(b);
    }
  }, [arrayNone.idDirection]);
  const resetSearchData = () => {
    let b = searchInfo;
    delete b.square;
    delete b.province_Id;
    delete b.district_Id;
    delete b.ward_Id;
    delete b.numBedroom;
    delete b.directOfHouse;
    delete b.totalPrice;
    document.querySelector(".squareSelect").value = "";
    document.querySelector(".provinceSelect").value = "";
    document.querySelector(".districtSelect").value = "";
    document.querySelector(".wardSelect").value = "";

    if (document.querySelector(".roomSelect")) {
      document.querySelector(".roomSelect").value = ""
      document.querySelector(".directSelect").value = "";
      document.querySelector(".priceSelect").value = "";
    }
    setSearchInfo(b);
  };
  const handleSquare = (e) => {
    let a = e.target.value;
    let square = {};
    switch (a) {
      case "": {
        let b = searchInfo;
        delete b.square;
        setSearchInfo(b);
        break;
      }
      case "30": {
        square = {
          square1: 0,
          square2: 30,
        };
        break;
      }
      case "30-50": {
        square = {
          square1: 30,
          square2: 50,
        };
        break;
      }
      case "50-80": {
        square = {
          square1: 50,
          square2: 80,
        };
        break;
      }
      case "80-100": {
        square = {
          square1: 80,
          square2: 100,
        };
        break;
      }
      case "100-150": {
        square = {
          square1: 100,
          square2: 150,
        };
        break;
      }
      case "150-200": {
        square = {
          square1: 150,
          square2: 200,
        };
        break;
      }
      case "200-250": {
        square = {
          square1: 200,
          square2: 250,
        };
        break;
      }
      case "250-300": {
        square = {
          square1: 250,
          square2: 300,
        };
        break;
      }
      case "300-500": {
        square = {
          square1: 300,
          square2: 500,
        };
        break;
      }
      case "500": {
        square = {
          square1: 500,
          square2: 1000,
        };
        break;
      }
    }
    if (a != "") {
      setSearchInfo({ ...searchInfo, square: square });
    }
  };

  const handlePrice = (e) => {
    let a = e.target.value;
    let totalPrice = {};
    switch (a) {
      case "": {
        let b = searchInfo;
        delete b.totalPrice;
        setSearchInfo(b);
        break;
      }
      case "<500": {
        totalPrice = {
          price1: 0,
          price2: 500000000,
        };
        break;
      }
      case "500,800": {
        totalPrice = {
          price1: 500000000,
          price2: 800000000,
        };
        break;
      }
      case "800,1": {
        totalPrice = {
          price1: 800000000,
          price2: 1000000000,
        };
        break;
      }
      case "1,2": {
        totalPrice = {
          price1: 1000000000,
          price2: 2000000000,
        };
        break;
      }
      case "2,3": {
        totalPrice = {
          price1: 2000000000,
          price2: 3000000000,
        };
        break;
      }
      case "3,5": {
        totalPrice = {
          price1: 3000000000,
          price2: 5000000000,
        };
        break;
      }
      case "5,7": {
        totalPrice = {
          price1: 5000000000,
          price2: 7000000000,
        };
        break;
      }
      case "7,10": {
        totalPrice = {
          price1: 7000000000,
          price2: 10000000000,
        };
        break;
      }
      case "10,20": {
        totalPrice = {
          price1: 10000000000,
          price2: 20000000000,
        };
        break;
      }
      case "20,30": {
        totalPrice = {
          price1: 20000000000,
          price2: 30000000000,
        };
        break;
      }
      case ">30": {
        totalPrice = {
          price1: 30000000000,
          price2: 50000000000,
        };
        break;
      }
    }
    if (a != "") {
      setSearchInfo({ ...searchInfo, totalPrice: totalPrice });
    }
  };
  const [arrayData, setArrayData] = useState([])
  const callSearch = async () => {
    const result = { ...searchInfo, project: project };
    console.log('result',searchInfo);
    setIssearching(true);
  };
  const [searchArray, setSearchArray] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/real-estate/search`,
        {}
      );
      const flag = response.data.map(({ _id, detail }) => {
        return {
          _id: _id,
          detail: detail,
        };
      });
      setSearchArray(flag);
    }
    fetchData()
  }, []);
  //SEARCH HERE
  const [searchWords, setSearchWords] = useState("");
  const [dropdownArr, setDropdownArr] = useState([]);
  useEffect(() => {
    const result = searchArray.filter((item) =>
      item.detail.content.toLowerCase().includes(searchWords.toLowerCase())
    );
    // console.log(result)
    setDropdownArr(result);
  }, [searchWords]);

  const Introform = (
    <div className="intro__form">
      <div className="categories__search">
        <button
          type="button"
          className={style1}
          value="Nhà đất bán"
          onClick={(e) => {
            setValuebtn(e.target.value);
            setSearchInfo({
              ...searchInfo,
              category: e.target.value,
            });
            setIdCategory("6193a1e36a03d69a07417779,Nhà đất bán");
          }}
        >
          Nhà đất bán
        </button>
        <button
          type="button"
          className={style2}
          value="Nhà đất cho thuê"
          onClick={(e) => {
            setValuebtn(e.target.value);
            setSearchInfo({
              ...searchInfo,
              category: e.target.value,
            });
            setIdCategory("6193a2b06a03d69a0741777a,Nhà đất cho thuê");
          }}
        >
          Nhà đất cho thuê
        </button>
        <button
          type="button"
          className={style3}
          value="dự án"
          onClick={(e) => {
            setValuebtn(e.target.value);
            setIdCategory(e.target.value);
          }}
        >
          Dự án
        </button>
      </div>
      <div className="text__search">
        {idCategory == "dự án" ? (
          <div className="intro__form__search">
            <select
              className="left_input__search"
              onChange={(e) => {
                setProject(e.target.value);
              }}
            >
              <option value="">Tất cả dự án</option>
              <option value="Căn hộ, chung cư">Căn hộ, chung cư</option>
              <option value="Cao ốc, văn phòng">Cao ốc, văn phòng</option>
              <option value="Trung tâm thương mại">Trung tâm thương mại</option>
              <option value="Khu đô thị mới">Khu đô thị mới</option>
              <option value="Khu phức hợp">Khu phức hợp</option>
              <option value="Nhà ở xã hội">Nhà ở xã hội</option>
              <option value="Khu nghỉ dưỡng, sinh thái">
                Khu nghỉ dưỡng, sinh thái
              </option>
              <option value="Khu công nghiệp">Khu công nghiệp</option>
              <option value="Biệt thự liền kề">Biệt thự liền kề</option>
              <option value="Dự án khác">Dự án khác</option>
            </select>
            <input
              // {...register("province_name")}
              type="text"
              className="input__search"
              placeholder="Nhập địa điểm, khu vực ví dụ: Thành phố Thủ Đức"
              onChange={(e) => {
                setSearchWords(e.target.value);
              }}
            />
            <button
              // to={`/land-for-sale/all?category=${searchInfo?.category}&province_Id=${searchInfo?.province_Id}&district_Id=${searchInfo?.district_Id}&ward_Id=${searchInfo?.ward_Id}&square1=${searchInfo?.square.square1}&square2=${searchInfo?.square.square2}&price1=${searchInfo?.totalPrice.price1}&price2=${searchInfo?.totalPrice.price2}&numBedroom=${searchInfo?.numBedroom}&directOfHouse=${searchInfo?.directOfHouse}`}
              type="submit"
              className="btn__search"
              onClick={() => {
                // callSearch();
              }}
            >
              <i className="fa fa-search"></i>Tìm kiếm
            </button>
          </div>
        ) : (
          <div className="intro__form__search">
            <select
              className="left_input__search"
            >
              <option value="">{`Tất cả ${valuebtn.toLowerCase()}`}</option>
              {type &&
                type.map((item, index) => {
                  return (
                    <option key={item._id} value={index}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <input
              type="text"
              className="input__search"
              placeholder="Nhập địa điểm, khu vực ví dụ: Thành phố Thủ Đức"
              onChange={(e) => {
                setSearchWords(e.target.value);
              }}
            />
            <button
              type="submit"
              className="btn__search"
              onClick={() => {
                // callSearch();
              }}
            >
              <i className="fa fa-search"></i>Tìm kiếm
            </button>
          </div>
        )}
        {searchWords !== "" ? (<div className="dropdown_input">
          {dropdownArr.map((item, index) => (
            <div key={index} className="item-drop">
              {item.detail.content}
            </div>
          ))}
        </div>) : null}
        <div className="intro__form__option_search">
          <img src={img_reset} alt="img_reset" onClick={resetSearchData} />
          <div className="intro__form__option_search__expand">
            <div className="customSelect">
              <select
                className="provinceSelect"
                // {...register("province_Id")}
                onClick={() => {
                  handleFetchCity();
                }}
                onChange={(e) => {
                  setSearchInfo({
                    ...searchInfo,
                    province_Id: e.target.value,
                  });
                  setIdCity(e.target.value);
                }}
              >
                <option value="">Trên toàn quốc</option>
                {city &&
                  city.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <i className="fa fa-chevron-down"></i>
            </div>
            <div className="customSelect">
              <select
                className="districtSelect"
                // {...register("district_Id")}
                onChange={(e) => {
                  setIdDistrict(e.target.value);
                  setSearchInfo({
                    ...searchInfo,
                    district_Id: e.target.value,
                  });
                }}
              >
                <option value="">Quận/Huyện</option>
                {district &&
                  district.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <i className="fa fa-chevron-down"></i>
            </div>
            <div className="customSelect">
              <select

                onChange={(e) => {
                  setIdWard(e.target.value);
                  setSearchInfo({
                    ...searchInfo,
                    ward_Id: e.target.value,
                  });
                }}
                className="wardSelect"
              >
                <option value="">Xã, phường</option>
                {ward &&
                  ward.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <i className="fa fa-chevron-down"></i>
            </div>
            <div className="customSelect">
              <select
                className="squareSelect"
                // {...register("square")}
                onChange={(e) => {
                  handleSquare(e);
                }}
              >
                <option value="">Diện tích</option>
                <option value="30">30 m² trở xuống</option>
                <option value="30-50">30 - 50 m²</option>
                <option value="50-80">50 - 80 m²</option>
                <option value="80-100">80 - 100 m²</option>
                <option value="100-150">100 - 150 m²</option>
                <option value="150-200">150 - 200 m²</option>
                <option value="200-250">200 - 250 m²</option>
                <option value="250-300">250 - 300 m²</option>
                <option value="300-500">300 - 500 m²</option>
                <option value="500>">500 m² trở lên</option>
              </select>
              <i className="fa fa-chevron-down"></i>
            </div>
            <button
              type="button"
              className="btn-expand"
              onClick={() => {
                setIsCollapsible(true);
              }}
              style={
                isCollapsible
                  ? { opacity: 0, pointerEvents: "none" }
                  : { opacity: 1 }
              }
            >
              Mở rộng <i className="fa fa-chevron-down"></i>
            </button>
          </div>
          {isCollapsible ? (
            <div className="intro__form__option_search__collapse">
              <div className="customSelect">
                <select
                  className="priceSelect"
                  onChange={(e) => {
                    handlePrice(e);
                  }}
                >
                  <option value="">Mức giá</option>
                  <option value="<500">500 triệu trở xuống</option>
                  <option value="500,800">500 - 800 triệu</option>
                  <option value="800,1">800 triệu - 1 tỷ</option>
                  <option value="1,2">1 - 2 tỷ</option>
                  <option value="2,3">2 - 3 tỷ</option>
                  <option value="3,5">3 - 5 tỷ</option>
                  <option value="5,7">5 - 7 tỷ</option>
                  <option value="7,10">7 - 10 tỷ</option>
                  <option value="10,20">10 - 20 tỷ</option>
                  <option value="20,30">20 - 30 tỷ</option>
                  <option value=">30">30 tỷ trở lên</option>
                </select>
                <i className="fa fa-chevron-down"></i>
              </div>
              <div className="customSelect">
                <select
                  className="roomSelect"
                  // {...register("numBedroom")}
                  onChange={(e) => {
                    setArrayNone({
                      ...arrayNone,
                      idnumberRoom: e.target.value,
                    });
                    setSearchInfo({
                      ...searchInfo,
                      numBedroom: e.target.value,
                    });
                  }}
                >
                  <option value="">Số phòng</option>
                  <option value="1">1 phòng trở lên</option>
                  <option value="2">2 phòng trở lên</option>
                  <option value="3">3 phòng trở lên</option>
                  <option value="4">4 phòng trở lên</option>
                  <option value="5">5 phòng trở lên</option>
                </select>
                <i className="fa fa-chevron-down" style={{ width: "7px" }}></i>
              </div>
              <div className="customSelect">
                <select
                  // {...register("directOfHouse")}
                  onClick={(e) => {
                    setArrayNone({
                      ...arrayNone,
                      idDirection: e.target.value,
                    });
                    setSearchInfo({
                      ...searchInfo,
                      directOfHouse: e.target.value,
                    });
                  }}
                  className="directSelect"
                >
                  <option value="">Hướng nhà</option>
                  <option value="Đông">Đông</option>
                  <option value="Tây">Tây</option>
                  <option value="Nam">Nam </option>
                  <option value="Bắc">Bắc</option>
                  <option value="Đông - Bắc">Đông - Bắc</option>
                  <option value="Tây - Bắc">Tây - Bắc</option>
                  <option value="Đông - Nam">Đông - Nam</option>
                  <option value="Tây - Nam">Tây - Nam</option>
                </select>
                <i className="fa fa-chevron-down"></i>
              </div>
              <button
                type="button"
                className="btn-collapse"
                onClick={() => {
                  setIsCollapsible(false);
                }}
              >
                Thu gọn <i className="fa fa-chevron-up"></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
  if (IsSearching) return <Redirect to={{
    pathname: `/user/land-for-sale/all?category=${searchInfo.category}&province_Id=${searchInfo.province_Id}&district_Id=${searchInfo.district_Id}&ward_Id=${searchInfo.ward_Id}&square1=${searchInfo?.square.square1}&square2=${searchInfo?.square.square2}&price1=${searchInfo?.totalPrice.price1}&price2=${searchInfo?.totalPrice.price2}&numBedroom=${searchInfo?.numBedroom}&directOfHouse=${searchInfo?.directOfHouse}`,
  }} />
  return (
    <Fragment>
      <div className="wrap__introduction">
        <div className="home-introduction-container">
          <div className="home-introduction-title">
            <span>Tìm kiếm ngôi nhà mơ ước của bạn</span>
          </div>
          <div className="home-search-box">{Introform}</div>
          <OwlCarousel
            items={1}
            nav
            autoplay={true}
            autoplayTimeout={5000}
            loop
            dots={true}
            navContainerClass="home-nav-container"
            dotClass="home-dot"
            dotsClass="home-dot-container"
            navText={[prevIcon, nextIcon]}
            navClass={["home-prev-owl", "home-next-owl"]}
            onClick={() => { }}
          >
            <div className="banner-content">
              <img src={banner} />
            </div>
            <div className="banner-content">
              <img src={banner} />
            </div>
            <div className="banner-content">
              <img src={banner} />
            </div>
          </OwlCarousel>
        </div>
      </div>
    </Fragment>
  );
};

export default Intro;
