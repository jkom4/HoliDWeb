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

const fields = contactFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
export default function HomePage() {
    const isAuthenticated = useSelector(state => state.rootReducer.auth.isAuthentificated);
    // État pour suivre quel composant doit être rendu dans la section "Vacances"
    const [isAlternateVacance, setIsAlternateVacance] = useState(false);

    // Fonction pour basculer entre les composants dans la section "Vacances"
    const toggleVacanceComponent = () => {
        setIsAlternateVacance(!isAlternateVacance);
    };

    const handleSubmitContact = (formState) => {
        console.log(formState)
        API.SendContact(formState);
    };
    return (

        <Home
            navbar={<NavBar/>}

            accueil =
            {
                <div className="bg-gray-200 mt-6 p-10">
                    <Header heading="Rechercher"
                            paragraph="Nombre d' utilisateur inscrit et le nombre de personne en vacance pendant une date donnée"></Header>
                    <UserInscrit/>
                </div>
            }
            vacance =
            { isAuthenticated &&
                <>
                {isAlternateVacance ?
                    <button className="bg-purple-500  p-2.5 m-2 text-purple-100 text-Xl inline-flex" onClick={toggleVacanceComponent}>

                        <img height="25" width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlklEQVR4nO3ZsQ3CQBQE0d+ET9B/JUQIBAkElDPI4gJEA+w/zavgVuPAPldJigcM4A6cqvmIJx+X6gjYgMcc8QIO1Y0jUlgihSVSWCKFJVJYIgW+AIbAEiFYocQOuM0R+2fqqK5YaMj282gdqyscEwrLhMIyobBMKMukskwqy6SyTKrVyoyv39PX6myO2e8Azv8+i7SqN6spz99oA0EqAAAAAElFTkSuQmCC"/>
                            Retour
                    </button>
                    :
                    <button className="bg-blue-500  p-2.5 m-2 text-blue-100 rounded-md text-Xl inline-flex" onClick={toggleVacanceComponent}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 72 72"
                             style={{fill: '#FFFFFF'}} className="pb-1">
                            <path
                                d="M 36 12 C 22.745 12 12 22.745 12 36 C 12 49.255 22.745 60 36 60 C 49.255 60 60 49.255 60 36 C 60 22.745 49.255 12 36 12 z M 36 20 C 44.837 20 52 27.163 52 36 C 52 44.837 44.837 52 36 52 C 27.163 52 20 44.837 20 36 C 20 27.163 27.163 20 36 20 z M 36 25 C 34.343 25 33 26.343 33 28 L 33 33 L 28 33 C 26.343 33 25 34.343 25 36 C 25 37.657 26.343 39 28 39 L 33 39 L 33 44 C 33 45.657 34.343 47 36 47 C 37.657 47 39 45.657 39 44 L 39 39 L 44 39 C 45.657 39 47 37.657 47 36 C 47 34.343 45.657 33 44 33 L 39 33 L 39 28 C 39 26.343 37.657 25 36 25 z"></path>
                        </svg>
                        Nouvelle période
                    </button>
                }

                    <div className="bg-gray-100 p-10">
                        {isAlternateVacance ? <AddVancanceForm /> : <MesVacances/>}
                    </div>
                </>
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