import {createSlice} from "@reduxjs/toolkit";



export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token : null,
        isAuthentificated : false,
        vacances : {}
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.token = action.payload.tokenConnectionAPI
            state.isAuthentificated = true
            localStorage.setItem('token', state.token);


        },
        logout : (state,action) => {
            state.user = null
            state.token = null
            state.vacances = {}
            state.isAuthentificated = false;
            // Supprimez toutes les données du localStorage
            localStorage.clear();


        }
    }
});

export const {login,logout} = authSlice.actions;
export const selectCurrentUser = (state) => state.rootReducer.auth.user;
export const selectCurrentToken = (state) => state.rootReducer.auth.token;
export default authSlice.reducer;