import { FAVORITE_ACTION, ESTATE_LIST, NEWS_LIST, LIKEDPAGE } from "../constants/common.constants"
import axios from "axios"
import Cookies from 'js-cookie';
export const LoadWishlist = (list) => {
    return {
        type: FAVORITE_ACTION.LOAD_WISHLIST,
        payload: list
    }
}

export const LikePost = (id) => {
    const Token = Cookies.get("token");
    return async (dispatch) => {
        try {
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/api/v1/users/liked`,
                data: {
                    realEstate: id,
                },
                headers: {
                    Authorization: "Bearer " + Token,
                }
            }).then(res => {
                dispatch({
                    type: FAVORITE_ACTION.LIKE_POST,
                    payload: res.data.list,
                    id: res.data.id
                })
            })
                .catch(err => {
                    console.log(err)
                    // setimg(Heart);
                    // setIsShowSignIn(true);
                })

        }
        catch (err) {
            console.log(err)
        }
    }
}
export const DeleteLikePost = (itemID) => {
    const Token = Cookies.get("token");
    return async (dispatch) => {
        try {
            dispatch({
                type: FAVORITE_ACTION.DELETE_WISHLIST,
                payload: itemID,
            })
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/api/v1/users/liked`,
                data: {
                    realEstate: itemID,
                },
                headers: {
                    Authorization: "Bearer " + Token,
                }
            })
                .catch(err => {
                    console.log(err)
                })

        }
        catch (err) {
            console.log(err)
        }
    }
}

export const LoadLandForSale = (list) => {
    return {
        type: ESTATE_LIST.LOAD_LANDFORSALE,
        payload: list
    }
}
export const LoadLandForRent = (list) => {
    return {
        type: ESTATE_LIST.LOAD_LANDFORRENT,
        payload: list
    }
}
export const LoadRealEstate = (object) => {
    return {
        type: ESTATE_LIST.LOAD_REALESTATE,
        payload: object
    }
}
export const LoadLandProvince = (list) => {
    return {
        type: ESTATE_LIST.LOAD_LANDPROVINCE,
        payload: list
    }
}

export const LoadAreaRealEstate = (list) => {
    return {
        type: ESTATE_LIST.LOAD_AREAREALESTATE,
        payload: list
    }
}

export const LoadHotRealEstate = (list) => {
    return {
        type: ESTATE_LIST.LOAD_HOTREALESTATE,
        payload: list
    }
}

export const LoadNews = (list) => {
    return {
        type: NEWS_LIST.LOAD_NEWS,
        payload: list
    }
}
export const LoadLikedPage = (list) => {
    return {
        type: LIKEDPAGE.LOAD_LIKEDPAGE,
        payload: list
    }
}