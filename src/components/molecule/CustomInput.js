export {CustomInput,TypeInput}
function CustomInput(props){
    return(
        <input
            type={props.typeInput.type}
            className="block border border-grey-800 w-full p-3 rounded mb-4"
            id={props.typeInput.name}
            name={props.typeInput.name}
            placeholder={props.typeInput.placeholder}
            required={props.typeInput.required}
            autoComplete={props.typeInput.autocomplete}
            onInput={(e) => {props.store.set(props.typeInput.name, e.target.value)}}
        />
    )
}
class TypeInput {
    constructor(type, name, placeholder, required, autocomplete) {
        this.type = type;
        this.name = name;
        this.placeholder = placeholder;
        this.required = required;
        this.autocomplete = autocomplete;
    }
}