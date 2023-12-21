import {useEffect, useState} from "react";
import AddActivite from "./AddActivite";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/AuthSlice";
import API from "../../services/API";
import {addActivites} from "../../features/VacancesSlices";

/**
 * Composant permettant  d'afficher les details d'une activité
 * @param item activité qui a ete selectionné
 * @returns {JSX.Element}
 * @constructor
 */
const DetailsActivite = ({item}) => {

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [selectedItem, setSelectedItem] = useState(null);
    const [errMsg, setErrMsg] = useState('')
    const [tri, setTri] = useState('A-Z');
    const [recherche, setRecherche] = useState('');

    //Lorsqu'on rempli le champ de trie. permet de recuperer la valeur
    const handleTriChange = (e) => {
        setTri(e.target.value);
    };

    //Lorsqu'on rempli le champ de rechereche. permet de recuperer la valeur
    const handleRechercheChange = (e) => {
        setRecherche(e.target.value);
    };

    /**
     * Cette fonction permet de trier le tableau d'activité
     * @param activites  tableau d'activité a trie
     * @param tri  Valeur qui a été selectionné par l'utilisateur (A-Z pour croissant ou Z-A pour decroissant)
     * @returns {*[]} retourne le tableau triés
     */
    const trierActivites = (activites, tri) => {
        // Dupliquez les activités pour ne pas modifier l'original
        const activitesTriees = [...activites];

        if (tri === 'A-Z') {
            activitesTriees.sort((a, b) => a.nom.localeCompare(b.nom));
        } else if (tri === 'Z-A') {
            activitesTriees.sort((a, b) => b.nom.localeCompare(a.nom));
        }
        return activitesTriees;
    };
    /**
     * Cette fonction permet de filtrer le tableau d'activité
     * @param activites  tableau d'activité a filtrer
     * @param recherche Valeur entré par l'utilisateur correspondant au titre de l'activité
     * @returns {*} retourne le tableau filtré ou un tableau vide
     */
    const filtrerActivites = (activites, recherche) => {
        return activites.filter((activite) =>
            activite.nom.toLowerCase().includes(recherche.toLowerCase())
        );
    };
    const activitesTriees = trierActivites(item.activites, tri);
    const activitesFiltrees = filtrerActivites(activitesTriees, recherche);
    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
    };
    const handleParticipe = async (activite) => {
        try {
            const idVac = item.id
            const newActivite = await API.addParticipantActivite(user.email, idVac, activite.id);
            dispatch(addActivites({newActivite, idVac}));
            // Other logic after successful sign-in
            // navigate('/')
        } catch (err) {
            if (err.response === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response === 401) {
                setErrMsg('Unauthorized');
            } else {
                console.log('Add Failed ' + err)
                setErrMsg('Add Failed ' + err);
            }
        }
    };


    // État pour suivre quel composant doit être rendu dans le modal "Activite"
    const [isAlternateActivite, setIsAlternateActivite] = useState(false);

    // Fonction pour basculer entre les composants dans le modal "Activite"
    const toggleActiviteComponent = () => {
        setIsAlternateActivite(!isAlternateActivite);
    };


    //State permettant de sauver l'etat de la date de début et heure d'une activité
    const [dateHeureActivite, setDateHeureActivite] = useState({
        dateDebut: '',
        heureDebut: '',
        dateFin: '',
        heureFin: '',
    });
    useEffect(() => {
        // Mettre à jour dateHeureActivite lorsque selectedItem change
        if(selectedItem){
            setDateHeureActivite(
                {
                    dateDebut: new Date(selectedItem.dateDebut).toLocaleDateString(),
                    heureDebut: new Date(selectedItem.dateDebut).toLocaleTimeString().slice(0, 5),
                    dateFin: new Date(selectedItem.dateFin).toLocaleDateString(),
                    heureFin: new Date(selectedItem.dateFin).toLocaleTimeString().slice(0, 5),
                }
            );
        }


            }, [selectedItem]);


    //permet de recuperer la valeur de la date et l'heure d'une activité
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDateHeureActivite((prevFilters) => ({ ...prevFilters, [id]: value }));
    };

    const handleModifActivite = async () => {
        // Vérification que dateFin et heureFin sont supérieurs à dateDebut et heureDebut
        const partsOfDateDebut = dateHeureActivite.dateDebut.split("/")
        const partsOfDateFin = dateHeureActivite.dateFin.split("/")

        const dateDebut = new Date(`${partsOfDateDebut[1]}/${partsOfDateDebut[0]}/${partsOfDateDebut[2]} ${dateHeureActivite.heureDebut}`);
        const dateFin = new Date(`${partsOfDateFin[1]}/${partsOfDateFin[0]}/${partsOfDateFin[2]} ${dateHeureActivite.heureFin}`);
        console.log(`${dateHeureActivite.dateDebut} ${dateHeureActivite.heureDebut}`)
        console.log(dateDebut.toISOString())
        if (dateFin <= dateDebut) {
            // Afficher un message d'erreur ou prendre d'autres mesures nécessaires
            setErrMsg("La date et l'heure de fin doivent être supérieures à la date et l'heure de début.");
            return;
        }
        try {
            const idVac = item.id
            const newActivite = await API.ModifActivite(dateDebut,dateFin, idVac, selectedItem.id);
            dispatch(addActivites({newActivite, idVac}));
            // Other logic after successful sign-in
            // navigate('/')
        } catch (err) {
            if (err.response === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response === 401) {
                setErrMsg('Unauthorized');
            } else {
                console.log('Add Failed ' + err)
                setErrMsg('Add Failed ' + err);
            }
        }
    };

    const handleImportAgenda = () => {
        let eventBase = (nom, description, dateDebut, dateFin, latitude, longitude) => {
            return `BEGIN:VEVENT\r\n`
                + `UID:${dateDebut.replace(/[:.-]/g, '')}777${user.email}\r\n`
                + `DTSTAMP:${new Date().toISOString().replace(/[:-]/g, '').replace(/\.\d+/, '')}\r\n`
                + `DTSTART:${dateDebut.replace(/[:.-]/g, '')}\r\n`
                + `DTEND:${dateFin.replace(/[:.-]/g, '')}\r\n`
                + `SUMMARY:${nom}\r\n`
                + `DESCRIPTION:${description}\r\n`
                + `GEO:${latitude};${longitude}\r\n`
                + `END:VEVENT\r\n`
        }
        let events = ``
        //item.activites
        activitesFiltrees.forEach((activite) => {if (activite.participants.some(participant => participant.id === user.id)) {events+=(eventBase(activite.nom, activite.description, activite.dateDebut, activite.dateFin, activite.lieu.latitude, activite.lieu.longitude))}})
        const icalData = `BEGIN:VCALENDAR\r\n`
            + `VERSION:2.0\r\n`
            + `PRODID://HolyD//FR\r\n`
            + `${events}`
            + `END:VCALENDAR`
        const blob = new Blob([icalData], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'HolyD_Activites.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (<div className="bg-white pb-4 px-4 rounded-md w-full">
            {isAlternateActivite ? <button type="button" onClick={toggleActiviteComponent} className="text-white inline-flex items-center m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-10 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                        dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-modal-toggle="crud-modal">
                <img height="25" width="25"
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlklEQVR4nO3ZsQ3CQBQE0d+ET9B/JUQIBAkElDPI4gJEA+w/zavgVuPAPldJigcM4A6cqvmIJx+X6gjYgMcc8QIO1Y0jUlgihSVSWCKFJVJYIgW+AIbAEiFYocQOuM0R+2fqqK5YaMj282gdqyscEwrLhMIyobBMKMukskwqy6SyTKrVyoyv39PX6myO2e8Azv8+i7SqN6spz99oA0EqAAAAAElFTkSuQmCC" alt=""/>
                Retour
            </button> :
                <div className="inline-flex">
                    <button type="button" onClick={toggleActiviteComponent} className="text-white mt-5 ml-5 mb-5 mr-1 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-10 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                            dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            data-modal-toggle="crud-modal">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Add
                    </button>
                    <button type="button" onClick={handleImportAgenda} className="text-white mt-5 mb-5 mr-5 ml-1 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-10 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                            dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="me-1 -ms-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                            <path  strokeWidth="2" d="M8 2v4M16 2v4M3 10h18"/>
                        </svg>
                        Importer
                    </button>
                </div>
            }
            {isAlternateActivite ? <AddActivite idVac={item.id}/> :
                <>
                    <div className="w-full flex justify-end px-2 mt-2 ">
                        <span className="mx-4 font-medium">Ordre</span>
                        <div className="w-full inline-flex sm:w-24  mr-10">
                        <select
                                className="leading-snug border border-gray-300 block w-full  bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
                                value={tri}
                                onChange={handleTriChange}>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-64 inline-block relative ">
                            <input type="" name=""
                                   className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
                                   placeholder="Search"
                                   value={recherche}
                                   onChange={handleRechercheChange}/>
                            <div
                                className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">

                                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 511.999 511.999">
                                    <path
                                        d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-6">
                        <table className="table-auto border-collapse w-full">
                            <thead>
                            <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                                <th className="px-4 py-2 bg-gray-200 " style={{backgroundColor: "#f8f8f8"}}>Titre</th>
                                <th className="px-4 py-2 " style={{backgroundColor: "#f8f8f8"}}>Date</th>
                                <th className="px-4 py-2 " style={{backgroundColor: "#f8f8f8"}}>Participant(s)</th>
                                <th className="px-4 py-2 " style={{backgroundColor: "#f8f8f8"}}>Participation</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm font-normal text-gray-700">
                            {activitesFiltrees.map(activite => (<>
                                <tr className="hover:bg-gray-100 border-b border-gray-200 py-10"
                                    onClick={() => handleItemClick(activite)}>
                                    <td className="px-4 py-4">{activite.nom}</td>
                                    <td className="px-4 py-4"> DU {new Date(activite.dateDebut).toLocaleDateString()} {new Date(activite.dateDebut).toLocaleTimeString()} AU {new Date(activite.dateFin).toLocaleDateString()} {new Date(activite.dateFin).toLocaleTimeString()}</td>
                                    <td className="px-4 py-4">{activite.participants.length}</td>
                                    <td className="px-4 py-4">{activite.participants.some(participant => participant.id === user.id) ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="me-1 -ms-1 w-5 h-5"
                                             viewBox="0 0 24 24">
                                            <path fill="green"
                                                  d="M21.86 6.32a1 1 0 0 0-1.41.13L9.57 18.75l-4.64-5.5a1 1 0 0 0-1.46 1.37l5 6a1 1 0 0 0 1.46 0L22 7.46a1 1 0 0 0-.14-1.41z"/>
                                        </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="me-1 -ms-1 w-5 h-5"
                                             viewBox="0 0 24 24">
                                            <path fill="red"
                                                  d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59L5 6.41l5.59 5.59-5.59 5.59L6.41 19l5.59-5.59 5.59 5.59L19 17.59l-5.59-5.59L19 6.41z"/>
                                        </svg>}
                                    </td>
                                </tr>
                                {selectedItem === activite && <div className="flex gap-x-2 my-1 ">
                                    <div className="block">
                                        <div className="pt-1">
                                            <p className="font-light">Titre</p>
                                            <p className="font-medium tracking-more-wider h-6">{activite.nom}</p>
                                        </div>
                                        <div className="pt-1">
                                            <p className="font-light">Description</p>
                                            <p className="font-medium tracking-more-wider h-6">{activite.description}</p>
                                        </div>
                                        <div className="pt-1">
                                            <p className="font-light">Lieu</p>
                                            <p className="font-medium tracking-more-wider h-6">{`${activite.lieu.rue} ${activite.lieu.rueNumero},  ${activite.lieu.codePostal}  ${activite.lieu.ville}  ${activite.lieu.pays}`}</p>
                                        </div>
                                        <div className="flex gap-x-2 my-1">
                                            <div className="block">
                                                <label className="font-light">Date debut:</label>
                                                <input type="text"
                                                       onChange={handleChange}  id="dateDebut"
                                                       className="flex h-8 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                                                       maxLength="10" placeholder="DD/MM/YY"
                                                       value={dateHeureActivite.dateDebut}/>
                                            </div>
                                            <div className="block">
                                                <label className="font-light">Heure</label>
                                                <input type="text"
                                                       onChange={handleChange}  id="heureDebut"
                                                       className="flex h-8 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                                                       maxLength="5" placeholder="12:20"
                                                       value={dateHeureActivite.heureDebut}/>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-2 my-1">
                                            <div className="block">
                                                <label className="font-light">Date fin:</label>
                                                <input type="text"
                                                       onChange={handleChange}  id="dateFin"
                                                       className="flex h-8 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                                                       maxLength="10" placeholder="DD/MM/YY"
                                                       value={dateHeureActivite.dateFin}/>
                                            </div>
                                            <div className="block">

                                                <label className="font-light">Heure</label>
                                                <input type="text"
                                                       onChange={handleChange}  id="heureFin"
                                                       className="flex h-8 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                                                       maxLength="5" placeholder="12:20"
                                                       value={dateHeureActivite.heureFin}/>
                                            </div>
                                        </div>
                                        <p  className={errMsg ? "errmsg text-red-500" : "offscreen"}  aria-live="assertive" >{errMsg}</p>
                                        <button type="button" onClick={handleModifActivite} className="text-white m-5 inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 mx-10 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:green-400
                                        dark:hover:bg-gray-500 " data-modal-toggle="crud-modal">Modifier
                                        </button>
                                    </div>
                                    <div className="block">
                                        {//Verifier si le user participe deja
                                            activite.participants.some(participant => participant.id === user.id) ?
                                                <button type="button"
                                                        className="text-white m-5 inline-flex items-center bg-gray-300 mx-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                                        data-modal-toggle="crud-modal">
                                                    Participe déjà
                                                </button> :
                                                <button type="button" onClick={() => handleParticipe(activite)}
                                                        className="text-white m-5 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 mx-10 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:green-600
                                        dark:hover:bg-green-800 dark:focus:ring-blue-800"
                                                        data-modal-toggle="crud-modal">
                                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor"
                                                         viewBox="0 0 20 20"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd"
                                                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                              clipRule="evenodd"></path>
                                                    </svg>
                                                    Participer
                                                </button>}

                                        <div>
                                            <h2>Liste de participants</h2>
                                            {activite.participants.map(participant => (
                                            <p className="m-2 font-medium tracking-more-wider h-6 "> {participant.prenom + " " + participant.nom}</p>))}
                                        </div>
                                    </div>
                                </div>}
                            </>))}
                            </tbody>
                        </table>
                    </div>
                </>}
        </div>
    )
}
export default DetailsActivite;