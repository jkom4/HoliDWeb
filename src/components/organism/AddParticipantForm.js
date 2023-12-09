import {useState} from "react";
import API from "../../services/API";
import {addVacances} from "../../features/VacancesSlices";
import {useDispatch} from "react-redux";


const AddParticipantForm = ({id}) => {

    const [errMsg, setErrMsg] = useState("")
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const vacanceData = await API.addParticipant(email,id);
            dispatch(addVacances({ ...vacanceData }));
            console.log(vacanceData);
            // Other logic after successful sign-in
            // navigate('/')
        } catch (err) {
            if (err.response === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Add Failed ' + err );
            }
        }
    };
    return(
        <div>
            <p  className={errMsg ? "errmsg text-red-500" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="inline-flex mx-2 content-center">
                <div className=" mr-2">
                    <input onChange={handleEmailChange} type="email" placeholder="Email" required="true" name="email"
                           className="block w-full px-4 py-3 mb-3 h-2/3  leading-tight text-gray-700 bg-gray-100 "/>
                </div>

                <div className="">
                    <button onClick={handleSubmit}
                        className="px-4 inline-flex py-2 font-medium rounded-lg text-sm  h-2/3 text-gray-100 bg-blue-700 hover:bg-blue-800 ">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Ajouter
                    </button>
                </div>
            </div>
        </div>



    )

}

export default AddParticipantForm;