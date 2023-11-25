import {createSlice} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";

export const vacancesSlice = createSlice({
    name: "vacances",
    initialState: {

        vacances : {}
    },
    reducers: {
        initVacances :(state, action) => {

            state.vacances = action.payload

        },

        addVacances: (state, action) => {
            const newVacance = action.payload;
            // Recherchez l'index de l'objet existant dans le tableau
            const indexExistante = state.vacances.findIndex(vacance => vacance.id === newVacance.id);

            // Si l'objet existe, mettez à jour ses données
            if (indexExistante !== -1) {
                state.vacances[indexExistante] = { ...state.vacances[indexExistante], ...newVacance };
            } else {
                // Si l'objet n'existe pas, ajoutez-le au tableau
                state.vacances.push(newVacance);
            }

        },
        resetVacances : (state) => {
            state.vacances ={}
        }
    }
});

export const {addVacances,initVacances, resetVacances} = vacancesSlice.actions;
export const selectVacances = (state) => state.rootReducer.vacances.vacances;
export default vacancesSlice.reducer;