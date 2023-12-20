import AddParticipantForm from "./AddParticipantForm";
import Weather from "./Weather";
import AddActivite from "./AddActivite";
import Modal from "./Modal";
import DetailsActivite from "./DetailsActivite";

const DetailsVacances = ({item}) => (
    <section className="flex items-center bg-gray-100 font-poppins  ">
        <div className="justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
            <div className="p-6 bg-gradient-to-br from-blue-200 via-purple-200 to-white-200">
                <Weather lat={item.lieu.latitude} lon={item.lieu.longitude}/>
                {console.log(item)}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-6 mb-6 bg-gray-50 ">
                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600">
                        Activites</h2>
                    <div className="flex justify-start ">
                        <div
                            className="flex items-center mb-2 space-x-2 text-3xl leading-none text-gray-600 ">
                            <div className="items-center font-bold ">{item.nom + " " + item.lieu.ville}</div>
                        </div>
                    </div>
                    <div className="mb-6 text-xs dark:text-gray-400">{item.activites.length} Activité(s)</div>
                    <div className="pb-1 mb-6">

                        {item.activites.map(activite => (
                            <div className="flex items-center mb-3">
                                <div className="flex mr-2 text-xs text-black ">
                                    <span className="mr-1">{new Date(activite.dateDebut).toLocaleDateString()}</span>

                                </div>
                                <div className="flex mr-2 text-xs text-black" >
                                   <span className="mr-1">{new Date(activite.dateFin).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-end text-xs font-medium ">{activite.description}</div>
                            </div>
                        ))}
                    </div>

                    <Modal buttonToggle="Activité(s)" title="Activité(s)"> <DetailsActivite item = {item}/></Modal>
                </div>
                <div className="p-6 mb-6 bg-white">
                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 ">
                        Participants</h2>
                    <AddParticipantForm id = {item.id}/>
                    {item.participants.map(participant => (
                        <div className="ml-5" > {participant.prenom + " " + participant.nom }</div>
                    ))}
                </div>
            </div>

        </div>
    </section>
);
export default DetailsVacances;