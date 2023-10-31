export {CustomButton,TypeButton}
class TypeButton{
    constructor(label) {
        this.label = label;
    }
}
function CustomButton(props){
    return (
        <button
            type="submit"
            className="w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none my-1"
        >{props.typeButton.label}
        </button>);
}
