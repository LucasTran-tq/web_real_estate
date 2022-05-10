import React, { useState, useEffect, useCallback } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./news.css";
import { MdClear } from "react-icons/md";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import Image from "./../post-real-estate/image";
import { toast } from "react-toastify";

// Modal Editing
const ModalEditing = ({
  data,
  handleClose,
  handleUpdate,
  setForcePage,
  flagPage,
}) => {
  const [files, setFiles] = useState([]);
  const [urlImage, setUrlImage] = useState(data.image);
  const [flagURL, setFlagURL] = useState("");
  const [text1, setText1] = useState(data.title);
  const [text2, setText2] = useState(data.content);
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    if (rejectFiles.length > 0) {
      alert(
        "Vui lòng chọn ảnh có kích thước trong khoảng từ 10Kb đến 5Mb. Tối đa 8 file."
      );
      return;
    }
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => prevFiles.concat(newFiles).slice(0, 8));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["image/*"],
    maxSize: 5 * 1024 * 1024,
    minSize: 10 * 1024,
    multiple: true,
    maxFiles: 1,
  });
  const uploadImage = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/webbdsse347/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        setFlagURL(response.secure_url);
      }
    };
    fd.append("upload_preset", "imagerealestate");
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  };
  const handleRemoveUrlImage = () => {
    setUrlImage("");
  };
  const handleRemoveImage = async (url) => {
    setFiles((files) =>
      files.filter((file) => {
        if (file.preview !== url) {
          return true;
        } else {
          URL.revokeObjectURL(file.preview);
          return false;
        }
      })
    );
  };
  const editNews = async (e) => {
    if (urlImage === "") {
      uploadImage(files[0]);
    }
    const bodyData = {
      title: text1,
      content: text2,
      image: urlImage ? urlImage : flagURL,
      timepost: new Date().toISOString().split("T")[0],
      image_description: "Hihi",
    };
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/news/${data._id}`,
      bodyData
    );
    toast.success("Cập nhật tin tức thành công", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: true,
    });
    handleClose(false);
    window.location.reload();
  };
  const thumbs =
    urlImage !== "" ? (
      <div className="image__item">
        <>
          <img className="image__item-img" src={data.image} alt="images" />
          <div className="icon" onClick={() => handleRemoveUrlImage()}>
            <FaTimes />
          </div>
        </>
      </div>
    ) : (
      files.map((file, index) => {
        return (
          <div className="image__item">
            <>
              <img
                key={index}
                className="image__item-img"
                src={file.preview}
                alt="images"
              />
              <div
                className="icon"
                onClick={() => handleRemoveImage(file.preview)}
              >
                <FaTimes />
              </div>
            </>
          </div>
        );
      })
    );
  return (
    <div className="form__edit__news">
      <h1>Chỉnh sửa tin tức</h1>
      <p>Chỉnh sửa thông tin tin tức</p>
      <MdClear
        onClick={() => {
          handleClose(false);
        }}
      />
      <input
        placeholder="Tin tức ban đầu"
        value={text1}
        onChange={(e) => {
          setText1(e.target.value);
        }}
      />
      <textarea
        placeholder="Nội dung ban đầu"
        value={text2}
        onChange={(e) => {
          setText2(e.target.value);
        }}
      />
      <input
        placeholder="Ngày đăng ban đầu"
        value={data.timepost.split("T")[0]}
      />
      {files.length === 0 && urlImage == "" ? (
        <div {...getRootProps()} className="image__content__edit">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="item__content-text text-primary"> Thả ảnh ở đây</p>
          ) : (
            <p className="item__content-notice">
              Kéo thả ảnh vào đây hoặc nhấn
              <span> thêm ảnh</span>
            </p>
          )}
        </div>
      ) : (
        <div className="image__content-list-edit">{thumbs}</div>
      )}
      <div className="form__actions">
        <button
          onClick={() => {
            handleClose(false);
          }}
        >
          Hủy
        </button>
        <button
          onClick={() => {
            editNews();
          }}
        >
          Sửa tin tức
        </button>
      </div>
    </div>
  );
};

const News = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [flagPage, setFlagPage] = useState(0);
  const [files, setFiles] = useState([]);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [editItem, setEditItem] = useState({});
  const [isEditting, setIsEditting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [forcePage, setForcePage] = useState(0);
  useEffect(() => {
    async function getAllNews() {
      //call axios lấy tin tức về
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/news/allnews`
      );
      setData([...response.data]);
      setPageCount(Math.ceil(response.data.length / 10));
      const result = response.data.splice(0, 13);
      setRenderData([...result]);
      // return response.data
    }
    getAllNews();
    setForcePage(0);
  }, [isUpdated]);
  const uploadImage = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/webbdsse347/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        setUrlImage(response.secure_url);
        return response.secure_url;
      }
    };
    fd.append("upload_preset", "imagerealestate");
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  };
  const handlePostNews = async () => {
    // tạo tin tức ở đây
    const url = await uploadImage(files[0]);
    const bodyData = {
      title: text1,
      content: text2,
      image: url,
      timepost: new Date().toISOString().split("T")[0],
      image_description: "Đây là mô tả",
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/news/`,
      bodyData
    );
    console.log(response);
    toast.success("Đăng tin tức thành công", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: true,
    });
    setIsOpen(false);
    window.location.reload();
  };
  const handlePageClick = (e) => {
    const x = [...data];
    const flag = x.splice(13 * e.selected, (e.selected + 1) * 13);
    setRenderData([...flag]);
    setFlagPage(e.selected);
  };
  const handleEdit = (e) => {
    setEditItem(e);
    setIsEditting(true);
  };
  const handleDelete = (e) => {
    setDeleteItem(e);
    setIsDeleting(true);
  };
  const handleDeleteItem = async (e) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/news/${deleteItem._id}`
    );
    setIsDeleting(false);
    window.location.reload();
  };
  //Image uploader
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    if (rejectFiles.length > 0) {
      alert(
        "Vui lòng chọn ảnh có kích thước trong khoảng từ 10Kb đến 5Mb. Tối đa 8 file."
      );
      return;
    }
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => prevFiles.concat(newFiles).slice(0, 8));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["image/*"],
    maxSize: 5 * 1024 * 1024,
    minSize: 10 * 1024,
    multiple: true,
    maxFiles: 1,
  });

  const thumbs = files.map((file, index) => {
    return (
      <div className="image__item">
        <img
          key={index}
          className="image__item-img"
          src={file.preview}
          alt="images"
        />
        <div className="icon" onClick={() => handleRemoveImage(file.preview)}>
          <FaTimes />
        </div>
      </div>
    );
  });

  const handleRemoveImage = (url) => {
    setFiles((files) =>
      files.filter((file) => {
        if (file.preview !== url) {
          return true;
        } else {
          URL.revokeObjectURL(file.preview);
          return false;
        }
      })
    );
  };
  return (
    <Fragment>
      <div
        className={`container__management__news ${isEditting || isDeleting || isOpen ? "show" : null}`}
        style={
          isEditting || isDeleting || isOpen
            ? {
              opacity: 0.3,
            }
            : { opacity: 1 }
        }
      >
        <div className="content__management">
          <div className="table_box">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tin tức</th>
                  <th>Nội dung</th>
                  <th>Ngày đăng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {renderData.length !== 0 &&
                  renderData.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{flagPage * 13 + index}</td>
                        <td style={{ color: "#A18474" }}>{item.title}</td>
                        <td style={{ color: "#A18474" }}>{item.content}</td>
                        <td>{item.timepost.split("T", 1)}</td>
                        <td className="dropdown">
                          <i
                            className="fas fa-ellipsis-v"
                            data-toggle="dropdown"
                          ></i>
                          <div className="dropdown-menu">
                            <button
                              onClick={() => {
                                handleEdit(item);
                              }}
                              style={{
                                fontWeight: "500 !important",
                                fontSize: "14px !important",
                              }}
                            >
                              Sửa tin tức
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(item);
                              }}
                              style={{
                                fontWeight: "500 !important",
                                fontSize: "14px !important",
                              }}
                            >
                              Xóa tin tức
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<i className="fas fa-chevron-right"></i>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<i className="fas fa-chevron-left"></i>}
              renderOnZeroPageCount={null}
              activeClassName="active"
              forcePage={forcePage}
            />
          </div>
          <button
            className="btnAddNews"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Thêm tin tức mới
          </button>
          <div className="pagination"></div>
        </div>
      </div>
      {isOpen && (
        <div className="form__add__news">
          <h1>Thêm tin tức mới</h1>
          <p>Thêm tin tức mới</p>
          <MdClear
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <input
            placeholder="Nhập tin tức"
            onChange={(e) => {
              setText1(e.target.value);
            }}
          />
          <textarea
            placeholder="Nội dung"
            onChange={(e) => {
              setText2(e.target.value);
            }}
          />
          {files.length === 0 ? (
            <div {...getRootProps()} className="image__content">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="item__content-text text-primary">
                  {" "}
                  Thả ảnh ở đây
                </p>
              ) : (
                <p className="item__content-notice">
                  Kéo thả ảnh vào đây hoặc nhấn
                  <span> thêm ảnh</span>
                </p>
              )}
            </div>
          ) : (
            <div className="image__content-list">
              {thumbs}
              {files.length >= 1 ? null : (
                <div {...getRootProps()} className="image__drop-zone">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="image__drop-zone-text text-primary">
                      {" "}
                      Thả ảnh ở đây
                    </p>
                  ) : (
                    <p className="image__drop-zone-text text-primary">
                      Kéo thả ảnh vào đây <br /> hoặc nhấn thêm ảnh
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="form__actions">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Hủy
            </button>
            <button
              onClick={() => {
                handlePostNews();
              }}
            >
              Thêm tin tức
            </button>
          </div>
        </div>
      )}
      {isDeleting && (
        <div className="annouce__delete">
          <div className="annouce__delete__content">
            <h1>Xóa danh mục</h1>
            <p>
              Bạn có muốn xóa tin tức "{deleteItem.title}" ra khỏi danh sách tin
              tức không?
            </p>
          </div>
          <div className="annouce__delete__button">
            <button
              onClick={() => {
                setIsDeleting(false);
              }}
            >
              Hủy
            </button>
            <button
              onClick={() => {
                handleDeleteItem();
              }}
            >
              Xóa tin tức
            </button>
          </div>
          <button
            className="btn__x"
            onClick={() => {
              setIsDeleting(false);
            }}
          >
            X
          </button>
        </div>
      )}
      {isEditting && (
        <ModalEditing
          data={editItem}
          handleClose={setIsEditting}
          handleUpdate={setIsUpdated}
          setForcePage={setForcePage}
          flagPage={flagPage}
        />
      )}
    </Fragment>
  );
};

export default News;
