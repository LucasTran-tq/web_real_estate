import "../../assests/css/group1_post.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./contact";
import OtherInfo from "./other-info";
import Image from "./image";
import BasicInfo from "./basic_info";
import Des_info from "./des_info";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { FaPhoneVolume } from "react-icons/fa";

const schema = yup.object().shape({
  title: yup
    .string()
    .required(
      "Vui lòng nhập tiêu đề tin đăng của bạn. Tối thiểu là 30 ký tự và tối đa là 99 ký tự."
    )
    .min(
      30,
      "Vui lòng nhập tiêu đề tin đăng của bạn. Tối thiểu là 30 ký tự và tối đa là 99 ký tự."
    )
    .max(
      99,
      "Vui lòng nhập tiêu đề tin đăng của bạn. Tối thiểu là 30 ký tự và tối đa là 99 ký tự."
    ),
  category: yup
    .string()
    .required("Bạn cần nhập thông tin")
    .test("inValid", "Vui lòng chọn hình thức", (value) => {
      return value !== "none";
    }),
  type: yup
    .string()
    .required("Bạn cần nhập thông tin")
    .test("inValid", "Vui lòng chọn loại bất động sản", (value) => {
      return value !== "none";
    }),
  province_Id: yup
    .string()
    .required("Bạn cần nhập thông tin")
    .test("inValid", "Vui lòng chọn Tỉnh/Thành phố", (value) => {
      return value !== "";
    }),
  district_Id: yup
    .string()
    .required("Bạn cần nhập thông tin")
    .test("inValid", "Vui lòng chọn Quận/Huyện", (value) => {
      return value !== "";
    }),
  ward_Id: yup
    .string()
    .required("Bạn cần nhập thông tin")
    .test("inValid", "Vui lòng chọn Phường/Xã", (value) => {
      return value !== "";
    }),

  note: yup.string().required("Bạn cần nhập đường phố"),

  content: yup
    .string()
    .required(
      "Vui lòng nhập mô tả tin đăng của bạn. Tối thiểu là 30 ký tự và tối đa là 3000 ký tự."
    )
    .min(
      30,
      "Vui lòng nhập mô tả tin đăng của bạn. Tối thiểu là 30 ký tự và tối đa là 3000 ký tự."
    )
    .max(
      3000,
      "Vui lòng nhập mô tả tin đăng của bạn. Tối thiểu là 30 ký tự và tối đa là 3000 ký tự."
    ),

  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại.")
    .test("inValid", "Vui lòng nhập số điện thoại.", (value) => {
      return value !== "none";
    }),
  unit: yup.string().required("Bạn cần chọn đơn vị"),
});

const apiImage = "https://api.cloudinary.com/v1_1/webbdsse347/upload";

const PostRealEstate = () => {
  const history = useHistory();
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const [type, setType] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [detail, setDetail] = useState({
    frontispiece: "",
    lengthOfAlley: "",
    numFloor: "",
    numBathroom: "",
    directOfHouse: "",
    directOfBalcony: "",
    numBedroom: "",
    furnitureInfo: "",
    legalInfo: "",
  });

  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (files.length > 8) {
      const newFiles = files.slice("", 8);
      setFiles(newFiles);
    }
  }, [files]);

  const [contact, setContact] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [author, setAuthor] = useState("");
  useEffect(() => {
    const Token = Cookies.get("token");
    if (!Token) return;
    const userInfo = JSON.parse(atob(Token.split(".")[1]));
    if (!userInfo) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${userInfo.id}/users`)
      .then((res) => {
        const data = res.data;
        const user = data[0];
        let {
          _id,
          fullName,
          email,
          password,
          image,
          birthday,
          sex,
          cardNumber,
          accountNumber,
          address,
          role,
          isVerifyEmail,
        } = user;

        sex = sex || "Nam";
        cardNumber =
          cardNumber && cardNumber.length < 9 ? "000000000" : cardNumber;
        address = {
          province_Id: address.province_Id,
          district_Id: address.district_Id,
          ward_Id: address.ward_Id,
        };

        const userData = {
          _id,
          fullName,
          email,
          password,
          image,
          birthday,
          sex,
          cardNumber,
          accountNumber,
          address,
          role,
          isVerifyEmail,
        };
        setAuthor(userData);
      });
  }, []);

  const handleSubmitForm = async (e) => {
    setSubmitting(true);
    let pictures = [];
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imagerealestate");
      const res = await axios.post(apiImage, formData);
      const data = res.data;
      if (data != null) {
        const url = data.secure_url;
        pictures = pictures.concat(url);
      }
      URL.revokeObjectURL(file.preview);
    }

    let { title, project, phone } = e;

    const detail = getDetailData(e);
    detail.totalPrice = detail.unitPrice * detail.square
    const contact = getContactData(phone);
    const dateEnd = Date.now();

    const formData = {
      title,
      type,
      project,
      detail,
      author,
      contact,
      pictures,
      dateEnd,
    };

    if (!project) delete formData["project"];

    const apiURL = `${process.env.REACT_APP_API_URL}/api/v1/real-estate/`;
    axios
      .post(apiURL, formData)
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success("Đăng bài thành công", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: true,
        });
        history.push(`/user/real-estate-info/${data.realeState._id}`);
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đăng bài thất bại", {
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
  };

  const getDetailData = (e) => {
    let {
      unitPrice,
      square,
      province_Id,
      district_Id,
      ward_Id,
      note,
      content,
      unit,
    } = e;
    const address = {
      province_Id,
      district_Id,
      ward_Id,
      note,
    };
    const detailData = {
      ...detail,
      content,
      address,
      square,
      totalPrice,
      unitPrice,
    };
    if (!square) delete detailData["square"];
    if (!totalPrice) delete detailData["totalPrice"];
    if (!unitPrice) delete detailData["unitPrice"];

    for (const key in detail) {
      if (!detail[key]) delete detailData[key];
    }
    return detailData;
  };

  const getContactData = (phone) => {
    const contactData = {
      ...contact,
      phone,
    };
    if (!contactData["name"]) delete contactData["name"];
    if (!contactData["address"]) delete contactData["address"];
    if (!contactData["email"]) delete contactData["email"];

    return contactData;
  };

  return (
    <>
      <div className="post-real-estate-container">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmitForm)}
            className="post__container"
          >
            <h1 className="post__title">
              ĐĂNG TIN RAO BÁN CHO THUÊ BẤT ĐỘNG SẢN TẠI VIỆT NAM
            </h1>
            <p className="text__title">
              (Quý khách vui lòng nhập thông tin bất động sản cần bán, cho thuê
              theo các mục dưới đây)
            </p>
            <BasicInfo
              setTypeSelected={setType}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <Des_info />
            <OtherInfo detail={detail} setDetail={setDetail} />
            <Image
              files={files}
              setFiles={setFiles}
              fileLength={files.length}
            />
            <Contact contact={contact} setContact={setContact} />
            <input type="submit" value="Đăng tin" className="btnPost" />
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
    </>
  );
};

export default PostRealEstate;
