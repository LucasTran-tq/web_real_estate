import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { commonReducer } from "./reducer/common.reducer"
/* eslint-disable no-underscore-dangle */
const rootReducer = combineReducers({
    commonReducer
})
/* eslint-enable */

export const store = createStore(rootReducer, applyMiddleware(thunk))

