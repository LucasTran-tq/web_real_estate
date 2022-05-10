import React, { useEffect, Fragment, useState, useRef } from "react";
import ReactDOM, { render } from "react-dom";
import { useForm, useFormContext } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import arrowDown from "../../../assests/image/arrow-down.svg";
import "./basic-info.css";
import hanoi from "../../../assests/hanoi.png";

const BasicInfo = ({ data, setBasicInfo, setFiles }) => {
  const {
    register,
    formState: { errors, isValidating },
    formState,

    setValue,
  } = useFormContext();

  const [fullName, setFullName] = useState("");
  const [birthday, setBirthDay] = useState();
  const [gender, setGender] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [preview, setPreview] = useState();

  useEffect(() => {
    setFullName(data.fullName);
    setBirthDay(data.birthday);
    setGender(data.gender);
    setCardNumber(data.cardNumber);

    setValue("fullName", data.fullName);
    setValue("cardNumber", data.cardNumber);
  }, [data]);

  // const showToast = () => {
  //   toast.success("Đã thêm ảnh thành công");
  // };

  return (
    <Fragment>
      {data && (
        <div>
          <div className="select_container">
            <div className="title2">
              <h3>THÔNG TIN CƠ BẢN</h3>
            </div>
          </div>

          <div className="select_container">
            <div className="avatar_container">
              <div className="image_user_container">
                {preview ? (
                  <img src={URL.createObjectURL(preview)} alt="" />
                ) : (
                  <img src={data.image} alt="" />
                )}
              </div>
              <div className="image_info_container">
                <input
                  type="file"
                  id="upload"
                  hidden
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];

                    if (file && file.type.substr(0, 5) === "image") {
                      setFiles(event.target.files[0]);
                      setPreview(event.target.files[0]);
                    } else {
                      setFiles(null);
                      setPreview(null);
                    }
                  }}
                />
                <label for="upload" className="upload_file">
                  Tải ảnh lên
                </label>

                <h4>Chỉ PNG, GIF hoặc PNG lớn nhất là 10MB</h4>
              </div>
            </div>
          </div>

          <div className="select_container">
            <div className="left">
              <p>
                Họ và Tên <span>*</span>
              </p>

              <div className="select__items">
                <input
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={fullName}
                  className="input_items"
                  maxLength="99"
                  {...register("fullName")}
                  onChange={(e) => {
                    setBasicInfo(e);
                  }}
                />
              </div>
              <p className={errors.fullName?.message ? "active" : "non-active"}>
                {errors.fullName?.message}
              </p>
            </div>

            <div className="right">
              <p>Ngày sinh</p>
              <div className="select__items">
                <input
                  type="date"
                  placeholder="Nhập ngày sinh của bạn"
                  value={birthday}
                  className="input_items"
                  maxLength="99"
                  {...register("birthday")}
                  onChange={(e) => {
                    setBasicInfo(e);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="select_container">
            <div className="left">
              <p>
                Giới tính <span>*</span>
              </p>

              <div className="gender-select m-top-16">
                <label className="custom-radio-btn">
                  <input
                    value={gender}
                    checked={gender == "Nam"}
                    {...register("gender")}
                    onChange={(e) => {
                      setBasicInfo(e);
                    }}
                    type="radio"
                    name="gender"
                    value="Nam"
                  />
                  <span className="checkmark"></span>
                  <span className="label">Nam</span>
                </label>

                <label className="custom-radio-btn">
                  <input
                    value={gender}
                    checked={gender == "Nữ"}
                    {...register("gender")}
                    onChange={(e) => {
                      setBasicInfo(e);
                    }}
                    type="radio"
                    name="gender"
                    value="Nữ"
                  />
                  <span className="checkmark"></span>
                  <span className="label">Nữ</span>
                </label>

                <label className="custom-radio-btn">
                  <input
                    value={gender}
                    checked={gender == "Khác"}
                    {...register("gender")}
                    onChange={(e) => {
                      setBasicInfo(e);
                    }}
                    type="radio"
                    name="gender"
                    value="Khác"
                  />

                  <span className="checkmark"></span>
                  <span className="label">Khác</span>
                </label>
              </div>
              <p className={errors.gender?.message ? "active" : "non-active"}>
                {errors.gender?.message}
              </p>
            </div>

            <div className="right">
              <p>CMND/CCCD</p>
              <div className="select__items">
                <input
                  {...register("cardNumber")}
                  type="number"
                  placeholder="Nhập CMND/CCCD của bạn"
                  value={cardNumber}
                  className="input_items"
                  maxLength="15"
                  onChange={(e) => {
                    setCardNumber(e);
                    setBasicInfo(e);
                  }}
                />
              </div>
              <p
                className={errors.cardNumber?.message ? "active" : "non-active"}
              >
                {errors.cardNumber?.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default BasicInfo;
