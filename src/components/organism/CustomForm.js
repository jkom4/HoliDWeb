import { useState } from 'react';
import {CustomInput} from "../molecule/CustomInput";
import {CustomButton} from "../molecule/CustomButton";



export default function CustomForm(props){
    const [formState,setFormState]=useState(props.fieldsState);
    const [passwordsMatch, setPasswordsMatch] = useState(true); // Ajout de l'état pour vérifier si les mots de passe correspondent
    const [errMsg, setErrMsg] = useState('');
    //const [isEmailValid, setisEmailValid] = useState(false);
    const handleChange=(e)=>{
        const { id, value } = e.target;
        // Validation du format de l'adresse e-mail
        if (id === 'email') {
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            // Mettre à jour l'état du formulaire et le statut de validation de l'e-mail
            setFormState((prevState) => ({
                ...prevState,
                [id]: value,
                isEmailValid,
            }));
        } else {
            // Mettre à jour l'état du formulaire pour les autres champs
            setFormState((prevState) => ({
                ...prevState,
                [id]: value,
            }));
        }
        //setFormState({ ...formState, [id]: value });
        // Vérification en temps réel si les champs password et confirm password correspondent
        if (props.isSignUp ) {
            // Vérification en temps réel si les champs password et confirm password correspondent
            if (id === 'password') {
                const confirmPassword = formState.confirmPassword;
                setPasswordsMatch(value === confirmPassword);
            } else if (id === 'confirmPassword') {
                const password = formState.password;
                setPasswordsMatch(value === password);
            }
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (props.isSignUp && !passwordsMatch) {
            // Afficher un message d'erreur ou prendre une autre action si les mots de passe ne correspondent pas
            console.log("Les mots de passe ne correspondent pas");
            return;
        }
        // Erreur de validation des champs requis
        const requiredFields = props.fields.filter((field) => field.isRequired && !formState[field.id]);
        if (requiredFields.length > 0) {
            setErrMsg('Veuillez remplir tous les champs requis.');
            return;
        }

        if (formState.email && !formState.isEmailValid){
            setErrMsg('L\'adresse e-mail n\'est pas valide !');
            return;
        }



        // Soumission car les données correspondent
        props.actionSubmit(formState);
    }
    return(
        <form className="">

            {
                props.fields.map(field=>
                    <CustomInput
                        key={field.id}
                        handleChange={handleChange}
                        value={formState[field.id]}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autocomplete}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )
            }

            {/* Affichage d'un message si les mots de passe ne correspondent pas en temps réel */}
            { props.isSignUp && !passwordsMatch && (
                <p style={{ color: 'red' }}>Les mots de passe ne correspondent pas ! </p>
            )}
            {/* Affichage d'un message si l'email ne correspond pas en temps réel */}
            {formState.email && !formState.isEmailValid && (
                <p style={{ color: 'red' }}>L'adresse e-mail n'est pas valide !</p>
            )}
            <p style={{ color: 'red' }}>{errMsg}</p>

            <CustomButton handleSubmit={handleSubmit} text={props.textSubmit}/>


        </form>
    )
}