import React from 'react'
import './FormRegister.css'
import { Fragment } from 'react/cjs/react.production.min';
export default function FormRegister() {

    return (
        <Fragment>
            <p className="form-register-title">Cập nhật thông tin mới nhất:</p>
            <form className="info-form-register">
                <input type="text" placeholder="Nhập địa chỉ email của bạn" className="info-form-input"></input>
                <button className="info-form-btn">
                    <a className='info-form-btn' href="/upcoming">
                        Đăng ký ngay
                    </a>
                </button>
            </form>
        </Fragment>
    )
}
