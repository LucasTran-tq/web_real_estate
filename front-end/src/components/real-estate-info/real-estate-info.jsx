import React, { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import "./real-estate-info.css";
import ListImage from "./list-image";
import RealEstateName from "./real-estate-name";
import InfoDescription from "./info-description";
import Features from "./features";
import ProjectInfo from "./project-info";
import Area from "./Area";
import Seen from "./Seen";
import { LoadRealEstate } from "../../redux/action";

let imagesUrl;
let newObject = [];

let titleInfo;
let unitPriceInfo;
let totalPriceInfo;
let squareInfo;
let numBedroomInfo;
let tym;

let contentInfo;
let typeNameInfo;
let addressNoteInfo;
let numBathroomInfo;
let furnitureInfo;
let legalInfo;
let provinceID;
let provinceNameInfo;
let districtNameInfo;
let wardNameInfo;

let projectInfo;
let nameAuthorInfo;
let dateUploadInfo;
let dateEndInfo;

let infoDescription_Info;
let features_Info;
let projectInfo_Info;

// file này đổi nhiều không, hau nhu khong dung file nay luon
function RealEstateInfo(props) {
  var { id } = useParams();
  var listBDS = [];
  if (!sessionStorage.getItem("seenListBds1")) {
    sessionStorage.setItem("seenListBds1", []);
  } else {
    let data = sessionStorage.getItem("seenListBds1");
    listBDS = data ? JSON.parse(data) : [];
  }
  const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/real-estate/${id}`;
  const [realEstateInfo, setRealEstateInfo] = useState([]);
  const Token = Cookies.get("token");
  const [isLogin, setIsLogin] = useState(false);
  const {realEstate} = useSelector(state => state.commonReducer)
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = useState(true)

  useEffect(() => {
    async function getData() {
      await axios
        .get(baseURL, { headers: { Authorization: "Bearer " + Token } })
        .then((response) => {
          newObject = [];
          imagesUrl = response.data[0].pictures;
          for (let i = 0; i < imagesUrl.length; i++) {
            var obj = { src: imagesUrl[i] };
            newObject.push(obj);
          }
          if (listBDS.length == 0) {
            listBDS.push(response.data);
            sessionStorage.setItem("seenListBds1", JSON.stringify(listBDS));
          } else {
            if (listBDS.length < 6) {
              var isRepeat = false;
              for (let i = 0; i < listBDS.length; i++) {
                if (listBDS[i][0]._id == response.data[0]._id) {
                  isRepeat = true;
                  break;
                }
              }
              if (!isRepeat) {
                listBDS.push(response.data);
                sessionStorage.setItem("seenListBds1", JSON.stringify(listBDS));
              }
            } else {
              listBDS.splice(0, 1);
              sessionStorage.setItem("seenListBds1", JSON.stringify(listBDS));
              var isRepeat = false;
              for (let i = 0; i < listBDS.length; i++) {
                if (listBDS[i][0]._id == response.data[0]._id) {
                  isRepeat = true;
                  break;
                }
              }
              if (!isRepeat) {
                listBDS.push(response.data);
                sessionStorage.setItem("seenListBds1", JSON.stringify(listBDS));
              }
            }
          }
          console.log(response.data[0]);

          titleInfo = response.data[0].title;
          unitPriceInfo = response.data[0].detail.unitPrice;
          totalPriceInfo = response.data[0].detail.totalPrice;
          squareInfo = response.data[0].detail.square;
          numBedroomInfo = response.data[0].detail.numBedroom;
          tym = response.data[0].tym;

          contentInfo = response.data[0].detail.content;
          typeNameInfo = response.data[0].type.name;
          addressNoteInfo = response.data[0].detail.address.note;
          numBathroomInfo = response.data[0].detail.numBathroom;
          furnitureInfo = response.data[0].detail.furnitureInfo;
          legalInfo = response.data[0].detail.legalInfo;
          provinceID = response.data[0].detail.address.province_Id._id;

          provinceNameInfo = response.data[0].detail.address.province_Id.name;
          districtNameInfo = response.data[0].detail.address.district_Id.name;
          wardNameInfo = response.data[0].detail.address.ward_Id.name;

          projectInfo = response.data[0].project;
          nameAuthorInfo = response.data[0].author.fullName;
          dateUploadInfo = response.data[0].dateUpload;
          dateUploadInfo = moment(dateUploadInfo).format("DD-MM-YYYY");
          dateEndInfo = response.data[0].dateEnd;
          dateEndInfo = moment(dateEndInfo).format("DD-MM-YYYY");

          setRealEstateInfo(response.data);
          dispatch(LoadRealEstate(response.data[0]))
          console.log(response.data[0])
        });
        setIsBusy(false)
    }
    getData();
  }, []);

  // console.log(realEstate.tym)

  infoDescription_Info = {
    content: contentInfo,
  };

  features_Info = {
    typeName: typeNameInfo,
    addressNote: addressNoteInfo,
    provinceName: provinceNameInfo,
    districtName: districtNameInfo,
    wardName: wardNameInfo,
    numBedroom: numBedroomInfo,
    numBathroom: numBathroomInfo,
    furnitureInfo: furnitureInfo,
    legalInfo: legalInfo,
  };

  projectInfo_Info = {
    project: projectInfo,
    nameAuthor: nameAuthorInfo,
    dateUpload: dateUploadInfo,
    dateEnd: dateEndInfo,
    typeName: typeNameInfo,
    idPost: id,
  };

  return (
    <Fragment>
      {!isBusy && <div className="wrap__info">
        <ListImage input={newObject} />

        <RealEstateName
          title={titleInfo}
          content={contentInfo}
          unitPrice={unitPriceInfo}
          totalPrice={totalPriceInfo}
          square={squareInfo}
          numBedroom={numBedroomInfo}
          realEstateID={id}
          isLike={realEstate.tym}
          checkLogin={setIsLogin}
        />

        <InfoDescription input={infoDescription_Info} />

        <Features input={features_Info} />

        <ProjectInfo input={projectInfo_Info} />
        {provinceID ? <Area provinceID={provinceID} /> : null}

        <Seen listBDS={listBDS} />
      </div>
      }
    </Fragment>
  );
}

export default RealEstateInfo;
