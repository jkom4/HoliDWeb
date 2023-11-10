import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import {CustomInput} from "../molecule/CustomInput";
import {CustomButton} from "../molecule/CustomButton";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{

    }



    return(
        <form className="">

                {
                    fields.map(field=>
                        <CustomInput
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autocomplete}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }

            <CustomButton handleSubmit={handleSubmit} text="Login"/>


        </form>
    )
}