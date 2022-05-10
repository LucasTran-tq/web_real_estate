import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import moment from "moment";
import "./basic-info.css";
import "../../../assests/css/group1_post.css";
import * as yup from "yup";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BasicInfo from "./basic-info";
import ContactInfo from "./contact-info";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Bạn cần nhập thông tin")
    .min(
      3,
      "Vui lòng nhập tên của bạn. Tối thiểu là 3 ký tự và tối đa là 50 ký tự."
    )
    .max(
      50,
      "Vui lòng nhập tên của bạn. Tối thiểu là 3 ký tự và tối đa là 50 ký tự."
    ),

  cardNumber: yup
    .string()
    .required("Vui lòng nhập CMND/CCCD.")
    .min(
      9,
      "Vui lòng nhập CMND/CCCD của bạn. Tối thiểu là 9 chữ số và tối đa là 12 chữ số."
    )
    .max(
      12,
      "Vui lòng nhập CMND/CCCD của bạn. Tối thiểu là 9 chữ số và tối đa là 12 chữ số."
    ),

  note: yup.string(),

  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại.")
    .min(
      10,
      "Vui lòng nhập số điện thoại của bạn. Số điện thoại cần đủ 10 chữ số."
    )
    .max(
      10,
      "Vui lòng nhập số điện thoại của bạn. Số điện thoại cần đủ 10 chữ số."
    ),
});

function Profile() {
  let user;

  const history = useHistory();

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const { formState, setFocus, setError } = methods;

  const apiImage = "https://api.cloudinary.com/v1_1/webbdsse347/upload";

  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    birthday: "",
    gender: "",
    cardNumber: "",
  });

  const [contactInfo, setContactInfo] = useState({
    province_Id: "",
    provinceName: "",
    district_Id: "",
    districtName: "",
    ward_Id: "",
    wardName: "",
    note: "",
    email: "",
    phone: "",
    type: "",
  });

  const [files, setFiles] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Token = Cookies.get("token");
    user = JSON.parse(atob(Token.split(".")[1]));
    // console.log(Token);

    const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/users/profile/${user.id}`;

    function getUserInfo() {
      axios.get(baseURL).then((response) => {
        const data = response.data[0];
        // console.log(`first loading data: ${JSON.stringify(data)}`);

        // when user dont have address. Assign default address to user
        if (Object.keys(data.address).length <= 2) {
          // add province object into address
          const province_Id = {
            _id: "60b7a50331c6ba3de5e7a353",
            name: "TP. Hồ Chí Minh",
            __v: 0,
          };
          const district_Id = {
            _id: "60b7a50631c6ba3de5e7a5f6",
            name: "Thành phố Thủ Đức",
            __v: 0,
          };
          const ward_Id = {
            _id: "60b7a51231c6ba3de5e7cbcc",
            name: "Phường Linh Trung",
            __v: 0,
          };
          const note = "";
          data.address["province_Id"] = province_Id;
          data.address["district_Id"] = district_Id;
          data.address["ward_Id"] = ward_Id;
          data.address["note"] = note;
        }


        const userBasicInfo = {
          fullName: data.fullName,
          birthday: moment(data.birthday).format("YYYY-MM-DD"),
          image: data.image,
          gender: data.sex ? data.sex : "Nam",
          cardNumber: data.cardNumber ? data.cardNumber : "",
        };

        const userContact = {
          province_Id: data.address.province_Id._id,
          provinceName: data.address.province_Id.name,
          district_Id: data.address.district_Id._id,
          districtName: data.address.district_Id.name,
          ward_Id: data.address.ward_Id._id,
          wardName: data.address.ward_Id.name,
          note: data.address.note,
          email: data.email,
          phone: data.phone ? data.phone : "",
          type: data.type,
        };

        setContactInfo({
          ...contactInfo,
          ...userContact,
        });

        setBasicInfo({
          ...basicInfo,
          ...userBasicInfo,
        });
      });
    }
    getUserInfo();
  }, []);

  const handleChangeBasicInfo = (e) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeContact = (newTargetName, newTargetValue) => {
    // is needed a object

    setContactInfo({
      ...contactInfo,
      [newTargetName]: newTargetValue,
    });

    if ([newTargetName] == "district_Id") {
      setIsLoading(false);
    }
  };

  async function checkCardNumer(cardNumber) {
    const Token = Cookies.get("token");
    user = JSON.parse(atob(Token.split(".")[1]));

    const apiURL = `${process.env.REACT_APP_API_URL}/api/v1/users/profile/checkCardNumber/${user.id}/${cardNumber}`;
    let result;
    await axios
      .get(apiURL)
      .then((res) => {
        result = res.data.isMatched;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  }

  const handleSubmitForm = async (data) => {


    let { fullName, birthday, image, gender, cardNumber } = basicInfo;

    let { province_Id, district_Id, ward_Id, note, email, phone, type } =
      contactInfo;


    // if file have change
    let newImage;
    if (files) {
      const imageFormData = new FormData();
      imageFormData.append("file", files);
      imageFormData.append("upload_preset", "imagerealestate");
      const res = await axios.post(apiImage, imageFormData);
      const imageData = res.data;
      if (imageData != null) {
        const url = imageData.secure_url;
        newImage = url;
      }
      image = newImage;
    }

    const address = {
      province_Id,
      district_Id,
      ward_Id,
      note,
    };

    const formData = {
      fullName,
      email,
      image,
      birthday,
      sex: gender,
      cardNumber,
      address,
      phone,
      type,
    };

    let isMatched = await checkCardNumer(cardNumber);

    //current user's cardNumber is matched to another
    if (isMatched) {
      setFocus("cardNumber");
      formState.errors.cardNumber = false;
      setError("cardNumber", {
        type: "manual",
        message: "Trùng CMNN/CCCD. Vui lòng nhập lại!",
      });
    }

    // anything is available for updating user1
    else {
      setSubmitting(true);
      // console.log(`-------------->>>> formData: ${JSON.stringify(formData)}`);

      const Token = Cookies.get("token");
      user = JSON.parse(atob(Token.split(".")[1]));

      const config = {
        headers: { Authorization: `Bearer ${Token}` },
      };

      const apiURL = `${process.env.REACT_APP_API_URL}/api/v1/users/${user.id}`;
      axios
        .put(apiURL, formData, config)
        .then((res) => {
          const data = res.data;
          // console.log(data);
          toast.success("Cập nhật thành công", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: true,
          });

          history.push(`/admin/profile`);
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);

          toast.error("Cập nhật thất bại. Hết phiên đăng nhập", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setSubmitting(false);
        });
    }
  };

  return (
    <Fragment>
      <div class="parent_container">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
            <div className="basic_info">
              <BasicInfo
                data={basicInfo}
                setBasicInfo={handleChangeBasicInfo}
                setFiles={setFiles}
              />

              <ContactInfo
                data={contactInfo}
                setContact={handleChangeContact}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />

              <input type="submit" value="Lưu" className="btnSave" />
            </div>
          </form>
        </FormProvider>
        <ToastContainer />
        {isSubmitting && (
          <div className="post-real-estate-overlay">
            <ClipLoader
              color={"white"}
              css={css`
                border-width: 3px;
              `}
              loading={true}
              size={40}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Profile;
