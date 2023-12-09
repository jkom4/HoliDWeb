
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import storageSession from 'redux-persist/lib/storage/session'
import authReducer from "../features/AuthSlice"
import userReducer from "../features/UserSlice"
import vacanceReducer from "../features/VacancesSlices"
import {persistReducer} from "redux-persist";

const persistConfig ={
    key:"root",
    version: 1,
    storage
};
const authPersistConfig = { key: 'auth', storage:storageSession }; // This is to session storage
const rootReducer = combineReducers({
    auth : persistReducer(authPersistConfig,authReducer),
    user : userReducer,
    vacances : vacanceReducer,
})
const  persistedReducer  = persistReducer(persistConfig,rootReducer)

export default configureStore({
    reducer: {
        rootReducer: persistedReducer,
    },
})