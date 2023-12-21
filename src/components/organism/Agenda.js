import React, {useCallback, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'


import moment from 'moment'
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/AuthSlice";
const localizer = momentLocalizer(moment)


const Agenda = ({vacances}) =>  {
    const [showModal, setShowModal] = useState(false);
    const [currentActivite, setCurrentActivite] = useState({});
    const user = useSelector(selectCurrentUser);
    const convertirVacancesEnItems = (vacances) => {
        const items = [];
        // vacances = []

        vacances.forEach((vacance) => {
            vacance.activites.forEach((activite) => {
                // Vérifier si l'utilisateur participe à l'activité
                const userParticipates = activite.participants.some(
                    (participant) => participant.id === user.id
                );
                if (userParticipates) {
                    const item = {
                        title: activite.nom,
                        start: new Date(activite.dateDebut),
                        end: new Date(activite.dateFin),
                        current: activite
                    };
                    items.push(item);
                }
            });

        });

        return items;
    };
    const handleSelectEvent = useCallback(
        (event) => {
            setShowModal(true);
            setCurrentActivite(event.current)

        } ,
        []
    )
    const itemsVacances = convertirVacancesEnItems(vacances);
    return (
        <>
            <Calendar
                localizer={localizer}
                events={itemsVacances}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
            />
            {showModal && currentActivite &&
                <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative  w-auto my-6 mx-auto max-w-xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                            <div className="flex items-center  justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 ">
                                    Details Activité
                                </h3>

                                <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <p><span className="font-semibold">Titre : </span>{currentActivite.nom}</p>
                                <p><span className="font-semibold">Description : </span>{currentActivite.description}</p>
                                <p><span className="font-semibold">Date de debut : </span>{new Date(currentActivite.dateDebut).toLocaleDateString() + " " + new Date(currentActivite.dateDebut).toLocaleTimeString() }</p>
                                <p><span className="font-semibold">Date de debut : </span>{new Date(currentActivite.dateFin).toLocaleDateString() + " " + new Date(currentActivite.dateFin).toLocaleTimeString() }</p>
                                <p><span className="font-semibold">Lieu : </span>{`${currentActivite.lieu.rue} ${currentActivite.lieu.rueNumero},  ${currentActivite.lieu.codePostal}  ${currentActivite.lieu.ville}  ${currentActivite.lieu.pays}`}</p>
                            </div>


                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )

}

export default Agenda;