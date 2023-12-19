import NavBar from "../organism/NavBar";

import Home from "../templates/Home";
import Header from "../molecule/HeaderForm";
import UserInscrit from "../organism/UserInscrit";
import React, {useState} from "react";
import CustomForm from "../organism/CustomForm";
import {contactFields} from "../constants/formFields";
import API from "../../services/API";
import AddVancanceForm from "../organism/AddVancanceForm";
import AddParticipantForm from "../organism/AddParticipantForm";
import MesVacances from "../organism/MesVacances";
import {useSelector} from "react-redux";
import Agenda from "../organism/Agenda";
import Alert from "../molecule/Alert";
import {useError} from "../../ErrorContext";
import {selectVacances} from "../../features/VacancesSlices";

const fields = contactFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
export default function HomePage() {
    const isAuthenticated = useSelector(state => state.rootReducer.auth.isAuthentificated);
    const vacances = useSelector(selectVacances);
    // État pour suivre quel composant doit être rendu dans la section "Vacances"
    const [isAlternateVacance, setIsAlternateVacance] = useState(false);
    const { errMsg, setErrorMsg, infoMsg, setInfoMsg} = useError();

    // Fonction pour basculer entre les composants dans la section "Vacances"
    const toggleVacanceComponent = () => {
        setIsAlternateVacance(!isAlternateVacance);
    };

    const handleSubmitContact = (formState) => {
        formState.to_email = "j.komwabo@student.helmo.be"
        console.log(formState)
        API.SendContact(formState).then((result) => {
            console.log(result.text);
            setInfoMsg("Message envoyé " + result.text)
        }, (error) => {
            setErrorMsg("Erreur " + error.text)
        });
    };
    return (

        <Home
            navbar={<NavBar/>}
            alertMessage ={
            <>
                {errMsg && <Alert message={errMsg} color="red"/>}
                {infoMsg && <Alert message={infoMsg} color="green"/>}
            </>
            }
            accueil =
            {

                <div className="bg-gray-200 ">
                    <Header heading="Rechercher"
                            paragraph="Nombre d' utilisateur inscrit et le nombre de personne en vacance pendant une date donnée"></Header>
                    <UserInscrit/>
                </div>

            }
            vacance =
            { isAuthenticated &&
                <>
                {isAlternateVacance ?
                    <button className="bg-blue-500  p-2.5 m-2 text-blue-100 rounded-md text-sm font-medium inline-flex" onClick={toggleVacanceComponent}>

                        <img height="25" width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlklEQVR4nO3ZsQ3CQBQE0d+ET9B/JUQIBAkElDPI4gJEA+w/zavgVuPAPldJigcM4A6cqvmIJx+X6gjYgMcc8QIO1Y0jUlgihSVSWCKFJVJYIgW+AIbAEiFYocQOuM0R+2fqqK5YaMj282gdqyscEwrLhMIyobBMKMukskwqy6SyTKrVyoyv39PX6myO2e8Azv8+i7SqN6spz99oA0EqAAAAAElFTkSuQmCC"/>
                            Retour
                    </button>
                    :
                    <button className="bg-blue-500  p-2.5 m-2 text-blue-100 rounded-md text-sm font-medium inline-flex" onClick={toggleVacanceComponent}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Nouvelle période
                    </button>
                }

                    <div className="bg-gray-100 p-10">
                        {isAlternateVacance ? <AddVancanceForm /> : <MesVacances/>}
                    </div>
                </>
            }
            agenda ={
            isAuthenticated ?
                <div className="mt-2"><Agenda vacances ={vacances}/></div>
                :
                <div className="mt-6"><Agenda vacances = {[]}/></div>
            }
            contact =
            {
                <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <Header
                            heading="Contacter un administrateur"
                            paragraph=" "
                            linkName=""
                            linkUrl=""
                        />
                        <CustomForm fieldsState={fieldsState}
                                    fields={fields}
                                    actionSubmit={handleSubmitContact}
                                    textSubmit="Envoyer"
                                    isSignUp={false}
                        />
                    </div>
                </div>

            }


            />


    )
}