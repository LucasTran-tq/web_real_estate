import React, { Component, useEffect, useReducer, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import "./information.css"
import axios from "axios";
import { toast, ToastPosition } from 'react-toastify';
//#region value reducer
const SET_NAME = "set_name";
const SET_SLOGAN = "set_slogan";
const SET_OVERVIEW = "set_overview";

const initState = {
    name: "",
    slogan: "",
    overview: ""
}
const setName = (payload) => ({
    type: SET_NAME,
    payload: payload,
})
const setSlogan = (payload) => ({
    type: SET_SLOGAN,
    payload: payload,
})
const setOverview = (payload) => ({
    type: SET_OVERVIEW,
    payload: payload,
})
function reducer(state, action) {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case SET_SLOGAN:
            return {
                ...state,
                slogan: action.payload,
            }
        case SET_OVERVIEW:
            return {
                ...state,
                overview: action.payload,
            }
        default:
            throw new Error("Invalid action");
    }
}
//#endregion

//#region valid reducer
const SET_VALID_NAME = "set_valid_name";
const SET_VALID_SLOGAN = "set_valid_slogan";
const SET_VALID_OVERVIEW = "set_valid_overview";
const validInitState = {
    validName: true,
    validSlogan: true,
    validOverview: true
}
const setValidName = (payload) => ({
    type: SET_VALID_NAME,
    payload: payload,
})
const setValidSlogan = (payload) => ({
    type: SET_VALID_SLOGAN,
    payload: payload
})
const setValidOverview = (payload) => ({
    type: SET_VALID_OVERVIEW,
    payload: payload
})
function validReducer(state, action) {
    switch (action.type) {
        case SET_VALID_NAME:
            return {
                ...state,
                validName: action.payload
            }
        case SET_VALID_SLOGAN:
            return {
                ...state,
                validSlogan: action.payload,
            }
        case SET_VALID_OVERVIEW:
            return {
                ...state,
                validOverview: action.payload,
            }
        default:
            throw new Error("Invalid action");
    }
}
//#endregion
toast.configure()
function Information() {
    const validFileType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let imageURL;
    const [state, dispatch] = useReducer(reducer, initState);
    const [checkValidState, dispatchValid] = useReducer(validReducer, validInitState);
    const [image, setImage] = useState("");
    const { name, slogan, overview } = state;
    const { validName, validSlogan, validOverview } = checkValidState;
    const maxFileSize = 10000000;
    const handleClick = () => {
        if (!name) {
            dispatchValid(setValidName(false));
        }
        if (name) {
            dispatchValid(setValidName(true));
        }
        if (!slogan) {
            dispatchValid(setValidSlogan(false));
        }
        if (slogan) {
            dispatchValid(setValidSlogan(true));
        }
        if (!overview) {
            dispatchValid(setValidOverview(false));
        }
        if (overview) {
            dispatchValid(setValidOverview(true));
        }

        if (name && slogan && overview) {
            const formData = new FormData();
            console.log(image);
            formData.append("file", image);
            formData.append("upload_preset", "new_preset");
            console.log("image value", image.value, "image url", imageURL);
            axios
                .post("https://api.cloudinary.com/v1_1/webbds/image/upload", formData)
                .then((response) => {
                    console.log(response)
                    imageURL = response.data.url;
                    axios
                        .put(`${process.env.REACT_APP_API_URL}/api/v1/company`, {
                            name: name,
                            description: overview,
                            image: imageURL,
                            slogan: slogan
                        })
                        .then(res => {
                            alert("Đã lưu thông tin giới thiệu thành công")

                        })
                        .catch(err => {
                            alert("Xảy ra lỗi. Vui lòng thử lại!")
                        })
                })
                .catch((err) => {
                    axios
                        .put(`${process.env.REACT_APP_API_URL}/api/v1/company`, {
                            name: name,
                            description: overview,
                            slogan: slogan
                        })
                        .then(res => {
                            alert("Đã lưu thông tin giới thiệu thành công")

                        })
                        .catch(err => {
                            alert("Xảy ra lỗi. Vui lòng thử lại!")
                        })
                });
        }
    }

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image.value);
        }
    }, [image])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/company/info`, {

            })
            .then(res => {
                const image = { value: res.data[0].image };
                setImage(image);
                imageURL = image.value;
                dispatch(setName(res.data[0].name))
                dispatch(setSlogan(res.data[0].slogan))
                dispatch(setOverview(res.data[0].description))
            })
            .catch(err => {

            });
    }, [])

    const handleUploadImage = (e) => {
        const tempFile = e.target.files[0];
        if (tempFile && validFileType.includes(tempFile.type) && tempFile.size <= maxFileSize) {
            tempFile.value = URL.createObjectURL(tempFile);
            setImage(tempFile)
        }
        else {
            if (!tempFile) {

            }
            else {
                alert("File sai định dạng");
            }
        }
    }

    return (
        <Fragment>
            <div className="information-very-big-container">
                <div className="information-manager-container">
                    <div className="information-content-container">
                        <div className="information-big-title">Thông tin công ty</div>
                        <div className="m-top-12 information-medium-title">Ảnh công ty</div>
                        <div className="m-top-12 information-image-container">
                            <div className="information-image">
                                <img className="information-image"
                                    src={image.value} className="image" hidden={image.value ? false : true} />
                            </div>
                            <div className="information-management-input-container">
                                <input
                                    className="custom-file-input"
                                    onChange={handleUploadImage}
                                    type="file" />
                                <div className="upload-constraint m-top-8">Chỉ JPG, GIF hoặc PNG lớn nhất là 10MB</div>
                            </div>
                        </div>
                        <div className="m-top-16 information-management-input-title">Tên công ty</div>
                        <div className={validName ? "information-management-input-field" : "wrong-information-management-input-field"}>
                            <input
                                className="information-management-input"
                                value={name}
                                onChange={(e) => dispatch(setName(e.target.value))}
                                placeholder="Tên của công ty" />
                        </div>
                        {!validName && <small className='information-small'>Tên công ty không được để trống</small>}
                        <div className="m-top-16 information-management-input-title">Khẩu hiệu</div>
                        <div className={validSlogan ? "information-management-input-field" : "wrong-information-management-input-field"}>
                            <input
                                className="information-management-input"
                                value={slogan}
                                onChange={(e) => dispatch(setSlogan(e.target.value))}
                                placeholder="Khẩu hiệu của công ty" />
                        </div>

                        {!validSlogan && <small className='information-small'>Khẩu hiệu của công ty không được để trống</small>}
                        <div className="m-top-16 information-management-input-title">Tổng quan</div>
                        <div className={validOverview ? "overview-information-management-input-field" : "wrong- overview-information-management-input-field"}>
                            <textarea
                                className="overview-information-management-input"
                                value={overview}
                                onChange={(e) => dispatch(setOverview(e.target.value))}
                                placeholder="Tổng quan về công ty" />
                        </div>
                        {!validOverview && <small className='information-small'>Tổng quan về công ty không được để trống</small>}
                        <button onClick={handleClick} className="information-container-save-btn">Lưu</button>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Information;