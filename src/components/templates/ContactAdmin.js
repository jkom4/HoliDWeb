import { useState } from 'react';
import { contactFields } from "../constants/formFields";
import {CustomInput} from "../molecule/CustomInput";
import {CustomButton} from "../molecule/CustomButton";

const fields=contactFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function ContactAdmin(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return(
        <form className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {
                    fields.map(field=>
                        <CustomInput
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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