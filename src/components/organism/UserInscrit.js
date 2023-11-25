import {CustomInput} from "../molecule/CustomInput";
import {useState} from "react";
import {getUserinscritFields} from "../constants/formFields";
import {CustomButton} from "../molecule/CustomButton";
import API from "../../services/API";
import {useDispatch, useSelector} from "react-redux";
import {login, selectCurrentToken, selectCurrentUser} from "../../features/AuthSlice";
import {getUserInHolliday, getUserInscrit, searchUser} from "../../features/UserSlice";

const fields=getUserinscritFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');
export default function UserInscrit(){
    const [userIncritState,setUserInscritState]=useState(fieldsState);
    const [errMsg, setErrMsg] = useState('')
    const dispatch = useDispatch();
    const userInscrit = useSelector(getUserInscrit);
    const userInHoliday = useSelector(getUserInHolliday)

    const handleChange=(e)=>{
        setUserInscritState({...userIncritState,[e.target.id]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const userData = await API.nbrUser(userIncritState);
            dispatch( searchUser({ ...userData }));
        } catch (err) {
            setErrMsg('Error during fetch nbr User:'+ err);
        }

    }
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className=" grid grid-cols-3 gap-4 col-start-2 col-end-5 ">
                {
                    fields.map(field=>
                        <CustomInput
                            key={field.id}
                            handleChange={handleChange}
                            value={userIncritState[field.id]}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autocomplete}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }

                <CustomButton style=" mt-4 h-12 text-center py-3 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none my-1"
                              handleSubmit={handleSubmit} text="Rechercher"/>
            </div>
            <p  className={errMsg ? "errmsg text-red-500" : "offscreen"}  aria-live="assertive" >{errMsg}</p>
            <div className=" grid grid-cols-2 gap-2 col-start-2 col-end-6 ">
                <p className=" text-l font-extrabold text-gray-700">Nombre d'utilisateur inscrit : {userInscrit} </p>
                <p className=" text-l font-extrabold text-gray-700">Nombre d'utilisateur en vacance : {userInHoliday} </p>

            </div>
        </div>
    )
}