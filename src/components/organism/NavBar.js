import {logout, selectCurrentToken, selectCurrentUser} from "../../features/AuthSlice";
import {useDispatch, useSelector} from "react-redux"
import {resetVacances} from "../../features/VacancesSlices";
import {Link} from "react-router-dom";


export default function NavBar() {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch();

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                          <h1 className="text-white font-medium">HOLIDWEB</h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Accueil</Link>
                                <Link to="#vacances" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Vacances</Link>
                                <Link to="#agenda" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Agenda</Link>
                                <Link to="#contact" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact</Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {!(user && token)?

                         <div className="relative ml-3">
                            <div>
                                <Link  to="/login" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Se Connecter</Link>
                            </div>
                        </div>
                            :
                            <div className="relative ml-3">
                                <div className="inline-flex ">
                                    <p id="usermsg" className="pr-2 text-white pt-1">Bienvenue {user.nom}</p>
                                    <a id="logoutbtn" onClick={() => {
                                        dispatch(logout())
                                        dispatch(resetVacances())
                                    }} className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Deconnexion</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>


        </nav>

);
}
