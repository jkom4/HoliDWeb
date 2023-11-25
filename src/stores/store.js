
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import authReducer from "../features/AuthSlice"
import userReducer from "../features/UserSlice"
import vacanceReducer from "../features/VacancesSlices"
import {persistReducer} from "redux-persist";

const persistConfig ={
    key:"root",
    version: 1,
    storage
};
const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    vacances : vacanceReducer,
})
const  persistedReducer  = persistReducer(persistConfig,rootReducer)

export default configureStore({
    reducer: {
        rootReducer: persistedReducer,
    },
})