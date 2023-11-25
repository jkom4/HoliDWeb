import Header from "../molecule/HeaderForm";
import NavBar from "../organism/NavBar";
import AuthTemplate from "../templates/AuthTemplate";
import CustomForm from "../organism/CustomForm";
import {loginFields} from "../constants/formFields";
import API from "../../services/API";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../features/AuthSlice";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
import { initVacances} from "../../features/VacancesSlices";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');



const LoginPage = () => {
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSignIn = async (formState) => {
        try {
            const userData = await API.SignIn(formState);
            dispatch(login({ ...userData }));
            console.log(userData);
            dispatch(initVacances(userData.vacances));
            console.log(userData);
            // Other logic after successful sign-in
             navigate('/')
        } catch (err) {
            console.error('Error during sign-in:', err);
             if (err.response === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed ' + err );
            }
        }

    };
    return (
        <AuthTemplate
            navbar={<NavBar/>}
            //footer={}
            >
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Connectez vous"
                        paragraph="Vous n'avez pas encore de compte ? "
                        linkName="Inscrivez-vous"
                        linkUrl="/signup"
                    />
                    <p  className={errMsg ? "errmsg text-red-500" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <CustomForm  fieldsState = {fieldsState}
                                 fields = {fields}
                                 actionSubmit={handleSignIn}
                                 textSubmit = "Login"
                                 isSignUp={false}
                    />


                    <GoogleOAuthProvider clientId="609718277310-j9bom4ap8el6669tto2oql0o3f8sfgu3.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={async credentialResponse => {
                                let decode = jwtDecode(credentialResponse.credential);
                                console.log(decode);
                                const userData = await API.SignInWithProvider(decode);
                                dispatch(login({...userData}));
                                // Mettez à jour les vacances dans le state global avec les informations du login
                                dispatch(initVacances(userData.vacances));
                                console.log(userData);
                                // Other logic after successful sign-in
                                navigate('/')
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </GoogleOAuthProvider>

                </div>
            </div>
        </AuthTemplate>

    )
}
export default LoginPage;