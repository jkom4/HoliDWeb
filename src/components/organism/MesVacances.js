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
    console.log("ICI")
    console.log(vacances)
    return (
        <div className=" items-center py-1 bg-gray-200 lg:py-1  ">
            {vacances.map(vacance => (
                <div className="justify-center flex-1 max-w-5xl px-2 py-1 mx-auto text-left lg:py-10 ">
                    <div className="p-4  rounded-md bg-gray-50 ">
                        <div className="flex items-center justify-between">
                            <a href="#"
                               className="inline-block mb-2 text-xs font-semibold text-blue-500 uppercase hover:text-blue-600 ">
                                {vacance.lieu.pays}
                            </a>
                            <span
                                className="mb-2 text-xs text-gray-500 ">{vacance.participants.length} participant.e(s)</span>
                        </div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-600 ">
                            {vacance.nom} </h2>
                        <div className="flex flex-wrap items-center mb-4 ">
                            <a href="#"
                               className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="w-4 h-4 mr-1 bi bi-calendar" viewBox="0 0 16 16">
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                {new Date(vacance.dateDebut).toLocaleDateString()} - {new Date(vacance.dateDebut).toLocaleDateString()}
                            </a>
                            <a href="#"
                               className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="w-4 h-4 mr-1 bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                {`${vacance.lieu.rue} ${vacance.lieu.rueNumero},  ${vacance.lieu.codePostal}  ${vacance.lieu.ville}  ${vacance.lieu.pays}`}
                            </a>
                        </div>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            {vacance.description}
                        </p>
                        <div>
                            <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-blue-500"
                                    onClick={() => handleItemClick(vacance)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                        </div>
                        {selectedItem === vacance && <DetailsVacances item={vacance}/>}
                    </div>


                </div>

            ))}

        </div>
    )
}


export default MesVacances;