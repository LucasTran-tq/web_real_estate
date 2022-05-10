import React, { useEffect, useCallback } from "react";
import image from "../../assests/image/image.svg";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";

const Image = ({ files, setFiles, fileLength }) => {
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
    maxFiles: 8,
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

        <FaTimes
          onClick={() => handleRemoveImage(file.preview)}
          className="image__item-remove"
        />
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
    <div className="image__container">
      <h3 className="image__title">HÌNH ẢNH</h3>
      <div className="image__tab-container">
        <div className="image__tab-item image__tab-selected">
          <img className="image__tab-icon" src={image} alt="video" />
          <span className="image__tab-title">Ảnh</span>
        </div>
      </div>

      {fileLength === 0 ? (
        <div {...getRootProps()} className="image__content">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="item__content-text text-primary"> Thả ảnh ở đây</p>
          ) : (
            <p className="item__content-text">
              Kéo thả ảnh vào đây hoặc nhấn
              <span className="text-primary item__content-btn"> thêm ảnh</span>
            </p>
          )}
        </div>
      ) : (
        <div className="image__content-list">
          {thumbs}
          {fileLength >= 8 ? null : (
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
    </div>
  );
};

export default Image;
