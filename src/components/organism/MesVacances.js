import {useSelector} from "react-redux";
import {useState} from "react";
import DetailsVacances from "./DetailsVacances";
import {selectVacances} from "../../features/VacancesSlices";

const MesVacances = () => {
    const [selectedItem, setSelectedItem] = useState(null);


    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
    };
    const vacances = useSelector(selectVacances);
    return (
        <div className=" items-center py-1 bg-gray-100 ">

            <div className="m-2 max-w-5xl justify-center flex-1   px-2 py-1 mx-auto text-left">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <h2 className="text-stone-700 text-xl font-bold">Appliquer des filtres</h2>
                    <p className="mt-1 text-sm">Utilisez des filtres pour affiner votre recherche</p>
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-stone-600 text-sm font-medium">intitulé</label>
                            <input type="text" id="name" placeholder="raspberry juice" className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="manufacturer" className="text-stone-600 text-sm font-medium">Pays</label>
                            <input type="manufacturer" id="manufacturer" placeholder="cadbery" className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="date" className="text-stone-600 text-sm font-medium">Date de début</label>
                            <input type="date" id="date" className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-stone-600 text-sm font-medium">Status</label>

                            <select id="status" className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <option>Terminé</option>
                                <option>En cours</option>
                                <option>Prochainement</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">Reset</button>
                        <button className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">Search</button>
                    </div>
                </div>
            </div>


            {vacances.map(vacance => (
                <div className="justify-center flex-1   max-w-screen-md px-2 py-1 mx-auto text-left  ">
                    <div className="p-4  rounded-md bg-white  ">
                        <a onClick={() => handleItemClick(vacance)}>
                        <div className="flex items-center justify-between">
                            <p
                               className="inline-block mb-2 text-xs font-semibold text-blue-500 uppercase hover:text-blue-600 ">
                                {vacance.lieu.pays}
                            </p>
                            <span
                                className="mb-2 text-xs text-gray-500 ">{vacance.participants.length} participant.e(s)</span>
                        </div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-600 ">
                            {vacance.nom} </h2>
                        <div className="flex flex-wrap items-center mb-4 ">
                            <p
                               className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="w-4 h-4 mr-1 bi bi-calendar" viewBox="0 0 16 16">
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                {new Date(vacance.dateDebut).toLocaleDateString()} - {new Date(vacance.dateFin).toLocaleDateString()}
                            </p>
                            <p
                               className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="w-4 h-4 mr-1 bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                {`${vacance.lieu.rue} ${vacance.lieu.rueNumero},  ${vacance.lieu.codePostal}  ${vacance.lieu.ville}  ${vacance.lieu.pays}`}
                            </p>
                        </div>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            {vacance.description}
                        </p>
                        </a>
                        {selectedItem === vacance && <DetailsVacances item={vacance}/>}

                    </div>


                </div>

            ))}

        </div>
    )
}


export default MesVacances;