import {CustomInput} from "../molecule/CustomInput";
import {useState} from "react";
import {getUserinscritFields} from "../constants/formFields";
import {CustomButton} from "../molecule/CustomButton";

const fields=getUserinscritFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');
export default function UserInscrit(){
    const [userIncritState,setUserInscritState]=useState(fieldsState);

    const handleChange=(e)=>{
        setUserInscritState({...userIncritState,[e.target.id]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
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
            <div className=" grid grid-cols-2 gap-2 col-start-2 col-end-6 ">
                <text className=" text-l font-extrabold text-gray-700">Nombre d'utilisateur inscrit : 0 </text>
                <text className=" text-l font-extrabold text-gray-700">Nombre d'utilisateur en vacance : 0 </text>

            </div>
        </div>
    )
}