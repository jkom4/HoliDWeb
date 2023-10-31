import NavBar from "../organism/NavBar";
import {CustomForm, TypeForm} from "../organism/CustomForm";
import {CustomInput, TypeInput} from "../molecule/CustomInput";
import {CustomButton, TypeButton} from "../molecule/CustomButton";

export default function HomePage(){
    return(
        <div>
            <NavBar/>
            <CustomForm typeForm={new TypeForm("Contacter un administrateur",
                [
                    <CustomInput typeInput={new TypeInput("text", "lastname", "Votre nom", true, "family-name")} />,
                    <CustomInput typeInput={new TypeInput("text", "firstname", "Votre Prénom", true, "given-name")}/>,
                    <CustomInput typeInput={new TypeInput("email", "email", "Votre adresse email", true, "email")} />,
                    <CustomInput typeInput={new TypeInput("text", "message", "votre message", true, "off")}/>,
                    <CustomButton typeButton={new TypeButton("Envoyer")}/>
                ])}
                        formHandler= "google.com"
            />
        </div>

    )
}