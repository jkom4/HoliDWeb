import Header from "../molecule/HeaderForm";
import NavBar from "../organism/NavBar";
import AuthTemplate from "../templates/AuthTemplate";
import CustomForm from "../organism/CustomForm";
import { signupFields} from "../constants/formFields";
import API from "../../services/API";
import {useDispatch} from "react-redux";
import {login} from "../../features/AuthSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {initVacances} from "../../features/VacancesSlices";
import Alert from "../molecule/Alert";

const fields=signupFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

const SignUpPage = () => {
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async (formState) => {

        try {
            const userData = await API.SignUp(formState);
            dispatch(login({ ...userData }));
            console.log(userData);
            dispatch(initVacances(userData.vacances));
            console.log(userData);
            // Other logic after successful sign-up
            const contactUser = {
                from_name: "HolidWeb",
                from_email: "j.komwabo@student.helmo.be",
                to_name: userData.nom,
                message: "Nous vous souhaitons la bienvenue ",
                to_email : userData.email
            }
            API.SendContact(contactUser).then((result) => {
                console.log(result.text);
                setErrMsg("Message envoyé " + result.text)
            }, (error) => {
                setErrMsg("Erreur " + error.text)
            });
            navigate('/')
        } catch (err) {
            console.error('Error during sign-Up:', err);
            if (err.response === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('SignUp Failed ' + err );
            }

        }
    };
    return (
        <AuthTemplate
            navbar={<NavBar/>}
            //footer={}
        >
            {errMsg && <Alert message={errMsg} color="red"/>}
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header
                        title="HOLIDWEB"
                        heading="Inscrivez vous creer un compte"
                        paragraph="Vous avez déjà un compte? "
                        linkName="Connectez-vous"
                        linkUrl="/login"
                    />
                    <p  className={errMsg ? "errmsg text-red-500" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <CustomForm  fieldsState = {fieldsState}
                                 fields = {fields}
                                 actionSubmit={handleSignUp}
                                 textSubmit = "S'inscrire"
                                 isSignUp={true} // on indique que c'est un formulaire d'inscription pour verifier le password
                    />
                </div>
            </div>
        </AuthTemplate>

    )
}
export default SignUpPage;