import { FAVORITE_ACTION, ESTATE_LIST, NEWS_LIST, LIKEDPAGE } from "../constants/common.constants"
const initState = {
    likedsList: [],
    dataLandForSale: [],
    dataLandForRent: [],
    realEstate: {},
    dataLandProvince: [],
    dataAreaRealEstate: [],
    dataHotRealEstate: [],
    dataNews: [],
    dataLikeds: []
}

export const commonReducer = (state = initState, action) => {
    switch (action.type) {
        case FAVORITE_ACTION.LIKE_POST: {
            state.likedsList = [...action.payload];
            state.dataLandForSale = (state.dataLandForSale.length > 0) && [...state.dataLandForSale].map(item => {
                if (item._id === action.id) {
                    item.tym = true
                }
                return item
            });

            state.dataLandForRent = (state.dataLandForRent.length > 0) && [...state.dataLandForRent].map(item => {
                if (item._id === action.id) {
                    item.tym = true
                }
                return item
            });

            if (state.realEstate._id === action.id) {
                state.realEstate.tym = true
            }

            state.dataLandProvince = (state.dataLandProvince.length > 0) && [...state.dataLandProvince].map(item => {
                if (item._id === action.id) {
                    item.tym = true
                }
                return item
            });

            state.dataAreaRealEstate = (state.dataAreaRealEstate.length > 0) && [...state.dataAreaRealEstate].map(item => {
                if (item._id === action.id) {
                    item.tym = true
                }
                return item
            });

            state.dataHotRealEstate = (state.dataHotRealEstate.length > 0) && [...state.dataHotRealEstate].map(item => {
                if (item._id === action.id) {
                    item.tym = true
                }
                return item
            });
            return { ...state }
        }
        case FAVORITE_ACTION.LOAD_WISHLIST: {
            state.likedsList = [...action.payload];
            return { ...state }
        }
        case FAVORITE_ACTION.DELETE_WISHLIST: {
            state.likedsList = [...state.likedsList].filter(item => item.realEstate !== action.payload);
            state.dataLandForSale = (state.dataLandForSale.length > 0) && [...state.dataLandForSale].map(item => {
                if (item._id === action.payload) {
                    item.tym = false
                }
                return item
            });

            state.dataLandForRent = (state.dataLandForRent.length > 0) && [...state.dataLandForRent].map(item => {
                if (item._id === action.payload) {
                    item.tym = false
                }
                return item
            });

            if (state.realEstate._id === action.payload) {
                state.realEstate.tym = false
            }

            state.dataLandProvince = (state.dataLandProvince.length > 0) && [...state.dataLandProvince].map(item => {
                if (item._id === action.payload) {
                    item.tym = false
                }
                return item
            });

            state.dataAreaRealEstate = (state.dataAreaRealEstate.length > 0) && [...state.dataAreaRealEstate].map(item => {
                if (item._id === action.payload) {
                    item.tym = false
                }
                return item
            });

            state.dataHotRealEstate = (state.dataHotRealEstate.length > 0) && [...state.dataHotRealEstate].map(item => {
                if (item._id === action.payload) {
                    item.tym = false
                }
                return item
            });
            return { ...state }
        }

        case ESTATE_LIST.LOAD_LANDFORSALE: {
            state.dataLandForSale = [...action.payload];
            return { ...state }
        }
        case ESTATE_LIST.LOAD_LANDFORRENT: {
            state.dataLandForRent = [...action.payload];
            return { ...state }
        }
        case ESTATE_LIST.LOAD_REALESTATE: {
            state.realEstate = { ...action.payload };
            return { ...state }
        }
        case ESTATE_LIST.LOAD_LANDPROVINCE: {
            state.dataLandProvince = [...action.payload];
            return { ...state }
        }
        case ESTATE_LIST.LOAD_AREAREALESTATE: {
            state.dataAreaRealEstate = [...action.payload];
            return { ...state }
        }
        case ESTATE_LIST.LOAD_HOTREALESTATE: {
            state.dataHotRealEstate = [...action.payload];
            return { ...state }
        }
        case NEWS_LIST.LOAD_NEWS: {
            state.dataNews = [...action.payload];
            return {...state}
        }
        case LIKEDPAGE.LOAD_LIKEDPAGE: {
            state.dataLikeds = [...action.payload];
            return {...state}
        }
        default:
            return { ...state }
    }
}