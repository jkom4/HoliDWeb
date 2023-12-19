import {addVacancesFields} from "../constants/formFields";
import {useEffect, useState} from "react";
import API from "../../services/API";
import CustomForm from "./CustomForm";
import GooglePlacesAutocomplete, {geocodeByAddress} from 'react-google-places-autocomplete';
import {addActivites} from "../../features/VacancesSlices";
import {useDispatch} from "react-redux";

const fields=addVacancesFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');
const AddActivite = ({idVac}) => {
    const [errMsg, setErrMsg] = useState('')
    const [valueAutoComplete,setValueAutoComplete] = useState(null)
    const [geocodeResults, setGeocodeResults] = useState(null);
    const dispatch = useDispatch();

    const handleSignIn = async (formState) => {
        // Vérification que dateFin et heureFin sont supérieurs à dateDebut et heureDebut
        const dateDebut = new Date(`${formState.dateDebut} `);
        const dateFin = new Date(`${formState.dateFin} `);

        if (dateFin <= dateDebut) {
            // Afficher un message d'erreur ou prendre d'autres mesures nécessaires
            setErrMsg("La date de fin doit être supérieure à la date de début.");
            return;
        }
        try {

            const newActivite = await API.AddActivite(formState,geocodeResults,idVac);
            dispatch(addActivites({ newActivite,idVac }));
            console.log(newActivite);

        } catch (err) {
            if (err.response === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed ' + err );
            }
        }
    };
    useEffect(() => {
        if (valueAutoComplete) {
            handleGeocode();

        } else {
            console.log(valueAutoComplete);
        }
    }, [valueAutoComplete]);

    const handleGeocode = async () => {
        try {
            const results = await geocodeByAddress(valueAutoComplete.label);

            let firstResult = results[0]
            let lieu = {
                codePostal: firstResult.address_components.find(component =>  component.types.includes('postal_code'))?.long_name || 0,
                latitude: firstResult.geometry.location.lat(),
                longitude: firstResult.geometry.location.lng(),
                pays: firstResult.address_components.find(component => component.types.includes('country'))?.long_name || 'Unknown',
                rue: firstResult.address_components.find(component => component.types.includes('route'))?.long_name || 'Unknown',
                rueNumero: firstResult.address_components.find(component => component.types.includes('street_number'))?.long_name || 0,
                ville: firstResult.address_components.find(component => component.types.includes('locality'))?.long_name || 'Unknown',

            }
            console.log(lieu)
            setGeocodeResults(lieu)
            //console.log(results);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>

            <GooglePlacesAutocomplete
                apiKey="AIzaSyDmu468LzlqBsJKbbZFhKNXdn6a-f0peMM"
                selectProps={{
                    valueAutoComplete,
                    onChange: setValueAutoComplete,
                    placeholder: 'Entrez le lieu',
                }}
                apiOptions={{ language: 'fr', region: 'fr' }}
            />



            <CustomForm  fieldsState = {fieldsState}
                         fields = {fields}
                         actionSubmit={handleSignIn}
                         textSubmit = "Ajouter"
                         isSignUp={false}
            />
            <p  className={errMsg ? "errmsg text-red-500" : "offscreen"}  aria-live="assertive" >{errMsg}</p>
        </div>



    )

}

export default AddActivite;