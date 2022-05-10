import React,{ useEffect, useState }  from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import ArticleCard from './articleCard';
import { Link, useLocation, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import hcm from '../../assests/hcm.png';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { LoadNews } from '../../redux/action';

const newsLink = "/user/news";

function News() {
    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
    let query = useQuery();
    const history = useHistory();
    const Token = Cookies.get("token");
    let pageNumber = query.get("page");
    if(pageNumber === null) pageNumber = 0;

    const [currentPage, setCurrentPage] = useState(pageNumber);
    console.log(pageNumber);
    const [lstLength, setLstLength] = useState(1);
    const items = [...Array(lstLength)];
    const itemsPerPage = 12;
    ////////////////////////////////////////////////////////////////
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(pageNumber);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const {dataNews} = useSelector(state => state.commonReducer)
    const dispatch = useDispatch();

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
    window.scrollTo(0, 0);
    history.push( newsLink + `?page=` + event.selected);
    };
    ////////////////////////////////////////////////////////////////
    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/api/v1/news/allnews/list?page=${currentPage}`
        async function getdataNews() {
            fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " +  Token,
                }
            })
            .then(res => res.json())
            .then(data => {
                data.news.map(value =>{
                    if(value.image.length === 0) value.image = [hcm];

                    return value
                })
                setLstLength(data.newsCount);
                
                dispatch(LoadNews(data.news))
            })
            .catch(err => console.log(err));
        };
        getdataNews();
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(pageNumber)
    }, [pageNumber])
    return (
        <Fragment>
            <div className='news__block'>
                <div className='news__container-header'>
                    <p>Danh sách tin tức</p>
                    <span>Hiện có {lstLength} tin tức</span>
                </div>
                <div className='news__article-container'>
                         {
                            !!dataNews && dataNews.map((data, index) => (
                                <ArticleCard 
                                image={data.image} 
                                title={data.title} 
                                content={data.content} 
                                timepost = {data.timepost} 
                                id={data._id}
                                ></ArticleCard>                     
                        ))}
                 </div>
            </div>
            <div className="pagination-container">
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
                        forcePage={parseInt(currentPage)}
                    />
                </div>
            </div>
        </Fragment>
      );
}

export default News;