import React, { useEffect, useState, useRef } from "react";
import { Fragment } from "react/cjs/react.production.min";
import "./accounts.css";
import axios from "axios";
import Cookies from "js-cookie";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import $ from "jquery";
import Modal from 'react-modal';

const initialDateFilter = {
    sort: 0,
    role: "all",
    userID: 'all',
};
function Admin() {
    const [dataFilter, setdataFilter] = useState(initialDateFilter);
    if(dataFilter.userID === ""){
        dataFilter.userID = "all";
    }
    const [dataUser, setdataUser] = useState([{id: 123, name: "Huynh long phap", role: 'Admin'}]);
    const [changeRole, setchangeRole] = useState({id: "", role: "ADMIN"});

    const Token = Cookies.get("token");

    ////////////////////////////////////////////////////////////////
    const [currentPage, setCurrentPage] = useState(0);
    const [lstLength, setLstLength] = useState(1);  // have't use setLstLength
    const items = [...Array(lstLength)];
    const itemsPerPage = 10;
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, lstLength]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setCurrentPage(event.selected);
    setItemOffset(newOffset);
    };
    ////////////////////////////////////////////////////////////////

    const fetchData = () => {
        return axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/api/v1/users/?page=${currentPage}&sort=${dataFilter.sort}&role=${dataFilter.role}&userID=${dataFilter.userID}`,
            headers: {
                Authorization: "Bearer " + Token,
            },
        })
            .then((res) => {

                const data = res.data.users;
                const newdata = data.map((item, index) => {
                    return {
                        stt: index + 1, // stt start = 1
                        id: item._id,
                        name: item.fullName,
                        role: item.role === 'ADMIN' ? 'admin' : 'user',
                    };
                });
                setdataUser(newdata);
                setLstLength(res.data.lengthDocuments);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeRoleAPI = () => {
        return axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}/api/v1/users/authorization`,
            headers: {
                Authorization: "Bearer " + Token,
            },
            data:{
                userID: changeRole.id,
                role: changeRole.role,
            }
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const onClickSearched = () => {
        fetchData();
    };

    const removeUser = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}/api/v1/users/${changeRole.id}`,
            headers: {
                Authorization: "Bearer " + Token,
            },
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setdataFilter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

  

     let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);

        function openModal() {
            setIsOpen(true);
            $('accounts__btn-option').toggle();
        }

        function openModal2() {
            setIsOpen2(true);
            $('accounts__btn-option').toggle();
        }

        function closeModal() {
            setIsOpen(false);
        }
        function closeModal2() {
            setIsOpen2(false);
        }
    
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <Fragment>
            <div className="accounts__container">
                <div className="accounts__row">
                    <div className="accounts__filter">
                        <label className="accounts__lablel">Tên tài khoản</label>
                        <div className="select__container">
                            <select
                            className="accounts__input-dateFrom accounts__input"
                            placeholder="Tất cả"
                            name="sort"
                            onChange={handleChange}
                        >
                            <option value="0">Từ A đến Z</option>
                            <option value="1">Từ Z đến A</option>
                        </select>
                        </div>
                    </div>
                    <div className="accounts__filter">
                        <label className="accounts__lablel">Ngày tạo</label>
                        <div className="select__container">
                            <select
                            className="accounts__input-dateFrom accounts__input"
                            placeholder="Tất cả"
                            name="sort"
                            onChange={handleChange}
                        >
                            <option value="2">Mới nhất</option>
                            <option value="4">Cũ nhất</option>
                        </select>
                        </div>
                    </div>
                    <div className="accounts__filter">
                        <label className="accounts__lablel">Loại tài khoản</label>
                        <div className="select__container">
                            <select
                            className="accounts__input-dateFrom accounts__input"     
                            placeholder="Tất cả"
                            name="role"
                            onChange={handleChange}
                        >
                            <option value="all">Tất cả</option>
                            <option value="ADMIN">Admin</option>
                            <option value="all">Sub-admin</option>
                            <option value="USER">User</option>
                            <option value="all">Marketing</option>
                        </select>
                        </div>
                    </div>
                    <div className="accounts__filter">
                        <label className="accounts__lablel">Tìm kiếm</label>
                        <input
                            type="text"
                            className="accounts__input-dateFrom accounts__input"
                            placeholder="Nhập mã tin"
                            name="userID"
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="accounts__filter" style={{ width: "15%", marginRight: "16px" }}>
                        <button
                            className="accounts__button-search"
                            onClick={onClickSearched}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <div className="accounts__row" style={{height: "100%"}}>
                    <div className="accounts__content">
                        {/* <div className='accounts__content-null'>
                                <span>Hiện bạn chưa có tin đăng nào</span>
                                <button>Đăng tin mới</button>
                            </div> */}

                        <table className="accounts__table">
                            <tr style={{ height: "48px" }}>
                                <th style={{ width: "5%", textAlign: 'center' }}>STT</th>
                                <th style={{ width: "12%" }}>ID</th>
                                <th style={{ width: "2%" }}></th> {/* Lấy khoảng trống} */}
                                <th style={{ width: "30%", textAlign: "left", }}>Tên người dùng</th>
                                <th style={{ width: "2%" }}></th>
                                <th style={{ width: "10%" }}>Phân quyền</th>
                                <th style={{ width: "3%" }}></th>
                            </tr>
                            {dataUser.map((data,index) => (
                                <tr style={{ height: "40px", backgroundColor: index % 2 == 0 ? '#F9F9F9' : '#FFFFFF' }} >
                                    <td style={{ textAlign: 'center' }}>{currentPage * 10 +  index + 1}</td>
                                    
                                    <td style={{ color: "#A18474", fontWeight: 500, wordBreak: 'break-all'}}>
                                        <a href="#" style={{fontWeight: 500}}>
                                            {data.id}
                                        </a>
                                    </td>
                                    <td></td> {/* Lấy khoảng trống} */}
                                    <td style={{ color: "#A18474",  wordBreak: 'break-all'}}>
                                        {data.name}
                                    </td>
                                    <td></td> {/* Lấy khoảng trống} */}
                                    <td>{ data.role}</td>
                                    <td>
                                        <td>
                                            <div className={`accounts__btn-option btn-option${index}`} style={{display:"none"}} onMouseLeave={()=>{$('.btn-option' + index).toggle();}}>
                                                <div>
                                                    <button className="accounts__btn-option-content" onClick={(e) => {
                                                        e.stopPropagation();
                                                        $('.btn-option' + index).toggle();
                                                        openModal2();
                                                        setchangeRole({role: changeRole.role, id: data.id});
                                        }}>Phân quyền</button>
                                                </div>
                                                <div style={{borderTop: '1px solid #000000'}}>
                                                    <button className="accounts__btn-option-content" onClick={(e) => {
                                                        e.stopPropagation();
                                                        $('.btn-option' + index).toggle();
                                                        openModal();
                                                        setchangeRole({role: changeRole.role, id: data.id});
                                        }}>Xóa người dùng</button>
                                                </div>
                                            </div>
                                        </td>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            $('.btn-option' + index).toggle();
                                        }}>
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        
                        <div className="center">
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
                            />
                        </div>

                    </div>
                    </div>
                </div>
            </div>

            {/* Modal xóa người dùng */}
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="account__modal">
                 
                    <div className="modal__row-1">
                        <h1>Xóa người dùng</h1>
                        <button onClick={closeModal}><i class="fas fa-times" style={{color:'#C4C4C4'}}></i></button>
                    </div>

                    <div className="modal__row-2">
                        <span>Bạn có muốn xóa người dùng “ID”, ”Tên người 
dùng” ra khỏi danh sách người dùng không?</span>
                    </div>
                
                    <div className="modal__row-3">
                        <button onClick={closeModal} className="modal__btn-close">Hủy</button>
                        <button className="modal__btn-delete" onClick={removeUser}>Xóa người dùng</button>
                    </div>
                    
                </div>
            </Modal>

            
            {/* Modal phân quyền */}
            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="account__modal2">
                 
                    <div className="modal__row-1">
                        <h1>Phân quyền</h1>
                        <button onClick={closeModal2}><i class="fas fa-times" style={{color:'#C4C4C4'}}></i></button>
                    </div>

                    <div className="modal__row-2">
                        <span className="modal__row-2-content">Phân quyền cho người dùng “ID”, “Tên người dùng”</span>
                    </div>
                    
                     <div className="modal__row-4">
                        <select name="selectChangeRole" onChange={(e) => {setchangeRole({role: e.target.value, id: changeRole.id})}}>
                            <option value="ADMIN">Admin</option>
                            <option value="1">Sub-admin</option>
                             <option value="USER">User</option>
                             <option value="3">Marketing</option>
                        </select>
                    </div>

                    <div className="modal__row-3">
                        <button onClick={closeModal2} className="modal__btn-close">Hủy</button>
                        <button className="modal__btn-delete" onClick={()=> changeRoleAPI()}>Thêm tiêu đề</button>
                    </div>
                    
                </div>
            </Modal>
            
            
        </Fragment>
    );
}

export default Admin;
