import {useRef, useState} from 'react';
import { contactFields } from "../constants/formFields";
import {CustomInput} from "../molecule/CustomInput";
import {CustomButton} from "../molecule/CustomButton";
import Header from "../molecule/HeaderForm";
import emailjs from '@emailjs/browser';


const fields= contactFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function ContactAdmin(){
    const [contactState,setContactState]=useState(fieldsState);

    const handleChange=(e)=>{
        setContactState({...contactState,[e.target.id]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        //Ajouter les parametres au templates
        const templateParams = {
            from_name : contactState.name,
            from_email : contactState.emailaddress,
            to_name : "HolidWeb",
            message : contactState.message
        }
        emailjs.send('service_j0c53oa', 'template_snvzy7p',templateParams, 'u6h54fqSWVWd4Tc1e')
            .then((result) => {
                console.log(result.text);
                alert("Message envoyé " + result.text)
            }, (error) => {
                console.log(error.text);
            });

    }

    return(
        <form  className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Contacter un administrateur"
                    paragraph=" "
                    linkName=""
                    linkUrl=""
                />
                {
                    fields.map(field=>
                        <CustomInput
                            key={field.id}
                            handleChange={handleChange}
                            value={contactState[field.id]}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
                <CustomButton handleSubmit={handleSubmit} text="Envoyer"/>
            </div>



        </form>
    )
}