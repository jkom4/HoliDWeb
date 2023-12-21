import {createSlice} from "@reduxjs/toolkit";

export const vacancesSlice = createSlice({
    name: "vacances",
    initialState: {

        vacances: []
    },
    reducers: {
        initVacances: (state, action) => {

            state.vacances = action.payload

        },

        addVacances: (state, action) => {
            const newVacance = action.payload;
            console.log(newVacance)
            // Recherchez l'index de l'objet existant dans le tableau
            const indexExistante = state.vacances.findIndex(vacance => vacance.id === newVacance.id);

            // Si l'objet existe, mettez à jour ses données
            if (indexExistante !== -1) {
                state.vacances = state.vacances.map((vacance, index) => {
                    if (index === indexExistante) {
                        return newVacance;
                    }
                    return vacance;
                });
                console.log("maj")
                console.log(state.vacances[indexExistante])
            } else {
                // Si l'objet n'existe pas, ajoutez-le au tableau
                state.vacances.push(newVacance);
            }

            console.log( state.vacances[indexExistante])
        },
        addActivites: (state, action) => {
            const newActivite = action.payload.newActivite;
            const id = action.payload.idVac;
            // Recherchez l'index de l'objet existant dans le tableau
            const indexVac = state.vacances.findIndex(vacance => vacance.id === id);
            const currentVacance = state.vacances[indexVac];
            // Recherchez l'index de l'objet existant dans le tableau
            const indexExistante = currentVacance.activites.findIndex(activite => activite.id === newActivite.id);

            // Si l'objet existe, mettez à jour ses données
            if (indexExistante !== -1) {
                currentVacance.activites[indexExistante] = newActivite;
                //addVacances(currentVacance);
            } else {
                // Si l'objet n'existe pas, ajoutez-le au tableau
                currentVacance.activites.push(newActivite);
                //addVacances(currentVacance);
            }
            console.log(currentVacance)

        },
        resetVacances: (state) => {
            state.vacances = []
        }
    }
});

export const {addVacances,addActivites, initVacances, resetVacances} = vacancesSlice.actions;
export const selectVacances = (state) => state.rootReducer.vacances.vacances;
export default vacancesSlice.reducer;