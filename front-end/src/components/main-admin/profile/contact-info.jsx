import ReactDOM, { render } from "react-dom";
import React, { useEffect, Fragment, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import axios from "axios";
import arrowDown from "../../../assests/image/arrow-down.svg";
import { number } from "yup";
import "./basic-info.css";
import { set } from "js-cookie";

const ContactInfo = ({ data, setContact, isLoading, setIsLoading }) => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useFormContext();

  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const [idCity, setIdCity] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idWard, setIdWard] = useState("");

  const [firstDistrictId, setFirstDistrictId] = useState("");

  const [email, setEmail] = useState("");

  const [type, setType] = useState();
  const [phone, setPhone] = useState();

 

  const [contact_Info, setContact_Info] = useState();

  const [checkCity, setCheckCity] = useState();
  const [checkDistrict, setCheckDistrict] = useState();
  const [checkWard, setCheckWard] = useState();

  // if city is clicked, data is loaded in district and ward (follow first district)
  const [checkCityClick, setCheckCityClick] = useState();
  const [checkDistrictClick, setCheckDistrictClick] = useState();

  const handleFetchCity = async () => {
    if (checkCity == 1) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/provinces`
      );
      setCity(response.data);
    }
  };

  const handleFetchDistrict = async () => {
    let response;
    if (checkDistrict == 1) {
      const id = idCity.split(",")[0];
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/provinces/${id}/districts`
      );
      setDistrict(response.data);
    }

    if (checkCityClick == 1) {

      // District
      const firstDistrictId = response.data[0]._id;
      setFirstDistrictId(response.data[0]._id);
      setIdDistrict(firstDistrictId);

      await setContact("district_Id", firstDistrictId);

      setIsLoading(true);
    }
  };

  

  const handleFetchWard = async () => {
    let response;
    if (checkWard == 1) {
      const id = idDistrict.split(",")[0];
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/districts/${id}/wards`
      );
      setWard(response.data);
    }
    if(checkDistrictClick == 1){
      setFirstDistrictId(idDistrict)
    }
  };

  function short(data) {
    const text = data + " ";
    const length = text.length;
    return length < 30
      ? text
      : text.slice(0, 25) + "..." + text.slice(length - 11, length);
  }


  useEffect(() => {
    handleFetchDistrict();
  }, [idCity]);

  useEffect(() => {
    handleFetchWard();
  }, [idDistrict]);


  // set id for first ward in wardList
  useEffect(() => {
    // Ward
    if (isLoading == false && firstDistrictId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/v1/address/districts/${firstDistrictId}/wards`
        )
        .then((response) => {
          const firstWardId = response.data[0]._id;
          setIdWard(firstWardId);

          // wait setContact district successfully
          setContact("ward_Id", firstWardId);
          setCheckCityClick(0);
          setCheckDistrictClick(0)
        });
    }
  }, [isLoading, firstDistrictId]);


  useEffect(() => {
    setContact_Info(data);

    setEmail(data.email);
    setType(data.type);

    setPhone(data.phone);

    setValue("note", data.note);
    setValue("phone", data.phone);

    if (city.length <= 1) {
      setCity([
        {
          _id: data.province_Id,
          name: data.provinceName,
        },
      ]);
      setCheckCity(1);

      if (typeof data.province_Id !== "undefined" && data.province_Id) {
        setIdCity(data.province_Id);
      }
    }
    if (district.length <= 1) {
      setDistrict([
        {
          _id: data.district_Id,
          name: data.districtName,
        },
      ]);
      setCheckDistrict(1);

      if (typeof data.district_Id !== "undefined" && data.district_Id) {
        setIdDistrict(data.district_Id);
      }
    }

    if (ward.length <= 1) {
      setWard([
        {
          _id: data.ward_Id,
          name: data.wardName,
        },
      ]);
      setCheckWard(1);
    }
  }, [data]);

  return (
    <Fragment>
      {data && (
        <div>
          <div className="select_container">
            <div className="title">
              <h1>THÔNG TIN LIÊN LẠC</h1>
            </div>
          </div>

          <div className="select_container">
            <div className="left">
              <p>Tỉnh/Thành phố</p>
              <div className="select__items">
                <select
                  {...register("province_Id")}
                  onClick={() => {
                    handleFetchCity();
                  }}
                  onChange={(e) => {
                    setIdCity(e.target.value);
                    // setContact(e);
                    setContact(e.target.name, e.target.value);
                    setCheckCityClick(1);
                  }}
                >
                  {city &&
                    city.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <img className="icon_down" src={arrowDown} alt="arrowDown" />
              </div>
              <p
                className={
                  errors.province_Id?.message ? "active" : "non-active"
                }
              >
                {errors.province_Id?.message}
              </p>
            </div>

            <div className="right">
              <p>Quận/Huyện</p>
              <div className="select__items">
                <select
                  {...register("district_Id")}
                  onClick={() => {
                    handleFetchDistrict();
                  }}
                  onChange={(e) => {
                    setIdDistrict(e.target.value);
                    // setContact(e);t
                    setContact(e.target.name, e.target.value);
                    setCheckDistrictClick(1)
                  }}
                >
                  {district &&
                    district.map((item) => {
                      return (
                        <option key={item._id} value={`${item._id}`}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <img className="icon_down" src={arrowDown} alt="arrowDown" />
              </div>
              <p
                className={
                  errors.district_Id?.message ? "active" : "non-active"
                }
              >
                {errors.district_Id?.message}
              </p>
            </div>
          </div>

          <div className="select_container">
            <div className="left">
              <p>Phường xã</p>
              <div className="select__items">
                <select
                  {...register("ward_Id")}
                  onClick={() => {
                    handleFetchWard();
                  }}
                  onChange={(e) => {
                    setIdWard(e.target.value);
                    // setContact(e);
                    setContact(e.target.name, e.target.value);
                  }}
                >
                  {ward &&
                    ward.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <img className="icon_down" src={arrowDown} alt="arrowDown" />
              </div>
              <p className={errors.ward_Id?.message ? "active" : "non-active"}>
                {errors.ward_Id?.message}
              </p>
            </div>

            <div className="right">
              <p>Đường phố</p>
              <input
                type="text"
                placeholder="Chọn đường phố"
                className="input_items"
                {...register("note")}
                name="note"
                onChange={(e) => {
                  // setContact(e);
                  setContact(e.target.name, e.target.value);
                }}
              />
              <p className={errors.note?.message ? "active" : "non-active"}>
                {errors.note?.message}
              </p>
            </div>
          </div>

          <div className="select_container">
            <div className="left">
              <p>Email </p>
              <h2>{short(email)}</h2>
            </div>

            <div className="right">
              <p>
                Số điện thoại <span>*</span>
              </p>
              <input
                type="number"
                placeholder="Nhập số điện thoại"
                className="input_items"
                {...register("phone")}
                onChange={(e) => {
                  // setContact(e);
                  setContact(e.target.name, e.target.value);
                }}
              />
              <p className={errors.phone?.message ? "active" : "non-active"}>
                {errors.phone?.message}
              </p>
            </div>
          </div>

          <div className="select_container">
            <div className="title">
              <h1>THÔNG TIN KHÁC</h1>
            </div>
          </div>

          <div className="select_container">
            <div className="left">
              <div className="gender-select-second m-top-16">
                <label className="custom-radio-btn-second">
                  <input
                    {...register("type")}
                    value={type}
                    checked={type == "CN"}
                    onChange={(e) => {
                      // setContact(e);
                      setContact(e.target.name, e.target.value);
                    }}
                    type="radio"
                    value="CN"
                  />

                  <span className="checkmark"></span>
                  <span className="label">Cá nhân</span>
                </label>

                <label className="custom-radio-btn-second">
                  <input
                    {...register("type")}
                    value={type}
                    checked={type == "DN"}
                    onChange={(e) => {
                      // setContact(e);
                      setContact(e.target.name, e.target.value);
                    }}
                    type="radio"
                    value="DN"
                  />
                  <span className="checkmark"></span>
                  <span className="label">Công ty</span>
                </label>
              </div>
              <p className={errors.type?.message ? "active" : "non-active"}>
                {errors.type?.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ContactInfo;
