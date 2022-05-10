import React, { memo } from 'react'
import {  useFormContext } from "react-hook-form";
const Contact = ({ contact, setContact }) => {

    const { name, email, phone, address } = contact

    const handleChangeInput = (e) => {
        const value = e.target.value;
        if(value.length > 12) return

        const re = /^[0-9\b]+$/; //rules
        if (value === "" || re.test(value)) {
            handleChangeContact(e);
        }
    }

    const handleChangeContact = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        })
    }

    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='contact__container'>
            <h3 className='contact__title'>LIÊN HỆ</h3>
            <div className='contact__form-row'>
                <div className='contact__form-col'>
                    <div className='contact__form-group'>
                        <label htmlFor='name' className='contact__form-label'>Tên liên hệ</label>
                        <input
                            className='contact__form-input'
                            id='name'
                            name='name'
                            type='text'
                            defaultValue={name}
                            onChange={handleChangeContact}
                            placeholder='Nhập tên để người mua liên hệ' />
                    </div>

                    <div className='contact__form-group'>
                        <label htmlFor='phone' className='contact__form-label'>Di động <span className='text-red'>*</span></label>
                        <input
                            id='phone'
                            name='phone'
                            className='contact__form-input'
                            {...register("phone")}
                            type='number'
                            required
                            value={phone}
                            onChange={handleChangeInput}
                            maxLength='12'
                            placeholder='Nhập SĐT để người mua liên hệ' />
                        <p className={errors.phone?.message ? "active" : "non-active"}>{errors.phone?.message}</p>
                    </div>
                </div>
                <div className='contact__form-col'>
                    <div className='contact__form-group'>
                        <label htmlFor='address' className='contact__form-label'>Địa chỉ</label>
                        <input
                            className='contact__form-input'
                            id='address'
                            name='address'
                            type='text'
                            defaultValue={address}
                            onChange={handleChangeContact}
                            placeholder='Nhập địa chỉ để người mua liên hệ' />
                    </div>

                    <div className='contact__form-group'>
                        <label htmlFor='email' className='contact__form-label'>Email</label>
                        <input
                            className='contact__form-input'
                            id='email'
                            name='email'
                            type='email'
                            defaultValue={email}
                            onChange={handleChangeContact}
                            placeholder='Nhập email để người mua liên hệ' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Contact)
