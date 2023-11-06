export {CustomButton}
const defaultClass =  "w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none my-1";
function CustomButton({
                          handleSubmit,
                          text,
                        style = defaultClass
                      }){
    return (
        <button
            type="button"

            className={style}
            onClick={handleSubmit}
        >{text}
        </button>);
}
