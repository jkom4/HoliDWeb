import {createSlice} from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInscrit: 0,
        userInHolliday : 0
    },
    reducers: {
        searchUser: (state, action) => {
            state.userInscrit = action.payload.nbrUserTotal
            state.userInHolliday = action.payload.nbrUserInHolidayByCountry

        }
    }
});
export const {searchUser} = userSlice.actions;
export const getUserInscrit = (state) => state.rootReducer.user.userInscrit;
export const getUserInHolliday = (state) => state.rootReducer.user.userInHolliday;
export default userSlice.reducer;