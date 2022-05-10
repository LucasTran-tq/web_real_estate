import React, { useEffect, useState, useRef } from "react";
import { Fragment } from "react/cjs/react.production.min";
import "./posts.css";
import axios from "axios";
import Cookies from "js-cookie";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import $ from "jquery";
import Modal from 'react-modal';

const initialDateFilter = {
    dateStart: "",
    dateEnd: "",
    realEstateID: "",
    categoryID: "",
    typeID: "",
    provinceID: "",
    page: 0,
};
function Admin() {
    const [dataFilter, setdataFilter] = useState(initialDateFilter);
    const [dataRealState, setdataRealState] = useState([]);
    const [province, setProvince] = useState([]);
    const [category, setCategory] = useState([]);
    const [type, setType] = useState([]);
    const [postClick, setpostClick] = useState({id: ''})
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
            url: `${process.env.REACT_APP_API_URL}/api/v1/users/real-estate?dateStart=${dataFilter.dateStart}&dateEnd=${dataFilter.dateEnd}&realEstateID=${dataFilter.realEstateID}&categoryID=${dataFilter.categoryID}&typeID=${dataFilter.typeID}&provinceID=${dataFilter.provinceID}&page=${currentPage}`,
            headers: {
                Authorization: "Bearer " + Token,
            },
        })
            .then((res) => {

                const data = res.data.realEstates;
                const newdata = data.map((item, index) => {
                    const dateStart = new Date(item.dateUpload);
                    const dateEnd = new Date(item.dateEnd);
                    return {
                        stt: index + 1, // stt start = 1
                        id: item._id,
                        title: item.title,
                        dateStart:
                            dateStart.getDate() +
                            "/" +
                            (dateStart.getMonth() + 1) +
                            "/" +
                            dateStart.getFullYear(),
                        dateEnd:
                            dateEnd.getDate() +
                            "/" +
                            (dateEnd.getMonth() + 1) +
                            "/" +
                            dateEnd.getFullYear(),
                        author: item.author.fullName, 
                    };
                });
                console.log(newdata);
                setdataRealState(newdata);
                setLstLength(res.data.lengthDocuments);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchProvince = () => {
        return axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/api/v1/address/provinces`,
        })
            .then((res) => {
                const data = res.data;
                const newdata = data.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                    };
                });
                setProvince(newdata);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchCategory = () => {
        return axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/api/v1/categories`,
        })
            .then((res) => {
                const data = res.data;
                const newdata = data.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                    };
                });
                setCategory(newdata);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchType = (id) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/api/v1/categories/${id}/types`,
        })
            .then((res) => {
                const data = res.data;
                const newdata = data.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                    };
                });
                setType(newdata);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        fetchData();
        fetchProvince();
        fetchCategory();
    }, [currentPage]);

    const onClickSearched = () => {
        if(dataFilter.dateStart !== "" && dataFilter.dateEnd !== "" && dataFilter.dateStart > dataFilter.dateEnd){
            alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
            setdataFilter({...dataFilter, dateEnd: ""});
            return;
        }
        fetchData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setdataFilter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const removePost = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}/api/v1/users/real-estate/${postClick.id}`,
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

     let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);


        function openModal() {
            setIsOpen(true);
            $('posts__btn-option').toggle();
        }

        // function afterOpenModal() {
        //     // references are now sync'd and can be accessed.
        //     subtitle.style.color = '#f00';
        // }

        function closeModal() {
            setIsOpen(false);
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
            <div className="posts__container">
                <div className="posts__row">
                    <div className="posts__filter">
                        <label className="posts__lablel">Ngày đăng</label>
                        <input
                            type="date"
                            className="posts__input-dateFrom posts__input"
                            placeholder="Từ ngày"
                            name="dateStart"
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="posts__filter">
                        <label className="posts__lablel" style={{height: "14px"}}></label>
                        <input
                            type="date"
                            className="posts__input-dateFrom posts__input"
                            placeholder="Đến ngày"
                            name="dateEnd"
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    {/* <div className="posts__filter">
                        <label className="posts__lablel">Trạng thái</label>
                        <div className="select__container">
                            <select
                            className="posts__input-dateFrom posts__input"
                            placeholder="Tất cả"
                            name="realEstateID"
                            onChange={handleChange}
                        ></select>
                        </div>
                    </div> */}
                    <div className="posts__filter">
                        <label className="posts__lablel">Tìm kiếm</label>
                        <input
                            type="text"
                            className="posts__input-dateFrom posts__input"
                            placeholder="Nhập mã tin"
                            name="realEstateID"
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="posts__filter" style={{ width: "15%", marginRight: "16px" }}>
                        <button
                            className="posts__button-search"
                            onClick={onClickSearched}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className="posts__row">
                    {/* <div className="posts__filter filter-2">
                        <label className="posts__lablel">Loại tin</label>
                        <div className="select__container">
                        <select
                            className="posts__input-dateFrom posts__input"
                            placeholder="Tất cả"
                            name="typeID"
                            onChange={handleChange}
                        >
                            <option value="">Tất cả</option>
                            <option value="Tin VIP">Tin VIP</option>
                            <option value="Tin ưu đãi">Tin ưu đãi</option>
                            <option value="Tin thường">Tin thường</option>
                        </select>
                        </div>
                    </div> */}
                    <div className="posts__filter filter-2">
                        <label className="posts__lablel">Hình thức</label>
                        <div className="select__container">
                        <select
                            className="posts__input-dateFrom posts__input"
                            placeholder="Tất cả"
                            name="categoryID"
                            onChange={(e) => {handleChange(e);setType([]); setdataFilter({...dataFilter, typeID: ""}); fetchType(e.target.value)}}
                        >
                            <option value="">Tất cả</option>
                            {category.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                        </div>
                    </div>
                    <div className="posts__filter filter-2">
                        <label className="posts__lablel">Loại nhà đất</label>
                        <div className="select__container">
                        <select
                            className="posts__input-dateFrom posts__input"
                            placeholder="Tất cả"
                            name="typeID"
                            onChange={handleChange}
                        >
                            <option value="">Tất cả</option>
                            {type.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                        </div>
                    </div>
                    <div className="posts__filter filter-2">
                        <label className="posts__lablel">Khu vực</label>
                        <div className="select__container">
                        <select
                            className="posts__input-dateFrom posts__input"
                            placeholder="Tất cả"
                            name="provinceID"
                            onChange={handleChange}
                        >
                            <option value="">Tất cả</option>
                            {province.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                        </div>
                    </div>
                     <div className="posts__filter filter-2" style={{ width: "15%", marginRight: "16px" }}>
                    </div>
                </div>

                <div className="posts__row" style={{height: "100%"}}>
                    <div className="posts__content">
                        {/* <div className='posts__content-null'>
                                <span>Hiện bạn chưa có tin đăng nào</span>
                                <button>Đăng tin mới</button>
                            </div> */}

                        <table className="posts__table">
                            <tr style={{ height: "48px" }}>
                                <th style={{ width: "5%", textAlign: 'center' }}>STT</th>
                                <th style={{ width: "12%" }}>Mã tin</th>
                                <th style={{ width: "2%" }}></th> {/* Lấy khoảng trống} */}
                                <th style={{ width: "30%", textAlign: "left", }}>Tiêu đề</th>
                                <th style={{ width: "2%" }}></th>
                                <th style={{ width: "10%" }}>Ngày bắt đầu</th>
                                <th style={{ width: "10%" }}>Ngày hết hạn</th>
                                <th style={{ width: "10%" }}>Tên người đăng</th>
                                <th style={{ width: "3%" }}></th>
                            </tr>
                            {dataRealState.map((data,index) => (
                                <tr style={{ height: "40px", backgroundColor: index % 2 == 0 ? '#F9F9F9' : '#FFFFFF' }} >
                                    <td style={{ textAlign: 'center' }}>{currentPage * 10 +  index + 1}</td>
                                    
                                    <td style={{ color: "#A18474", fontWeight: 500, wordBreak: 'break-all'}}>
                                        <Link to= {`/user/real-estate-info/${data.id}`} style={{fontWeight: 500}}>
                                            {data.id}
                                        </Link>
                                    </td>
                                    <td></td> {/* Lấy khoảng trống} */}
                                    <td style={{ color: "#A18474",  wordBreak: 'break-all'}}>
                                        {data.title}
                                    </td>
                                    <td></td> {/* Lấy khoảng trống} */}
                                    <td>{data.dateStart}</td>
                                    <td>{data.dateEnd}</td>
                                    <td>{ data.author}</td>
                                    <td>
                                        <td>
                                            <div className={`posts__btn-option btn-option${index}`} style={{display:"none"}} onMouseLeave={()=>{$('.btn-option' + index).toggle();}}>
                                                <div>
                                                    <a href="/upcoming" style={{fontWeight: 500}}>Sửa bài đăng</a>
                                                </div>
                                                <div style={{borderTop: '1px solid #000000'}}>
                                                    <button style={{fontWeight: 500}} onClick={(e) => {
                                                        e.stopPropagation();
                                                        $('.btn-option' + index).toggle();
                                                        openModal();
                                                        setpostClick({id: data.id});
                                        }}>Xóa bài đăng</button>
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
                        <a href="/user/real-estate/create" className="posts__btn-news" style={{ margin: "16px", float: "right", fontWeight: 500 }}>Đăng tin mới</a>

                    </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="posts__modal">
                 
                    <div className="modal__row-1">
                        <h1>Xóa bài đăng</h1>
                        <button onClick={closeModal}><i class="fas fa-times" style={{color:'#C4C4C4'}}></i></button>
                    </div>

                    <div className="modal__row-2">
                        <span>Bạn có muốn xóa bài đăng ra khỏi danh sách bài đăng không?</span>
                    </div>
                
                    <div className="modal__row-3">
                        <button onClick={closeModal} className="modal__btn-close" style={{fontWeight: 500}} >Hủy</button>
                        <button className="modal__btn-delete" style={{fontWeight: 500}} onClick={removePost}>Xóa bài đăng</button>
                    </div>
                    
                </div>
            </Modal>

        </Fragment>
    );
}

export default Admin;
