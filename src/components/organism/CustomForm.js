import { useState } from 'react';
import {CustomInput} from "../molecule/CustomInput";
import {CustomButton} from "../molecule/CustomButton";



export default function CustomForm(props){
    const [formState,setFormState]=useState(props.fieldsState);
    const [passwordsMatch, setPasswordsMatch] = useState(true); // Ajout de l'état pour vérifier si les mots de passe correspondent
    const handleChange=(e)=>{
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
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

        // Vous pouvez maintenant soumettre le formulaire car les mots de passe correspondent (ou que vous êtes dans le contexte de connexion)
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
                <p style={{ color: 'red' }}>Les mots de passe ne correspondent pas</p>
            )}

            <CustomButton handleSubmit={handleSubmit} text={props.textSubmit}/>


        </form>
    )
}