import React, { useState } from "react";
import "./des_info.css";
import { useForm, useFormContext } from "react-hook-form";
const DesInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [countContent, setCountContent] = useState(3000);
  return (
    <div>
      <div className="describe_info">
        <h1>THÔNG TIN MÔ TẢ</h1>
        <p>
          Giới thiệu bất động sản <span>*</span>
        </p>
        <textarea
          row="5"
          cols="5"
          {...register("content")}
          maxLength="3000"
          pattern="[A-Za-z0-9_-\s.]{30,99}"
          minLength="30"
          onChange={(e) => {
            setCountContent(3000 - e.target.value.length);
          }}
          placeholder="Giới thiệu chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi: gần công viên, gần trường học... Tổng diện tích 52m², đường đi ô tô vào tận cửa"
        ></textarea>
        <span className="count-content">{countContent}</span>
        <p className={errors.content?.message ? "active" : "non-active"}>
          {errors.content?.message}
        </p>
      </div>
    </div>
  );
};

export default DesInfo;
