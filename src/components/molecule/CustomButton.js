export {CustomButton}
function CustomButton({
                          handleSubmit,
                          text
                      }){
    return (
        <button
            type="button"

            className="w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none my-1"
            onClick={handleSubmit}
        >{text}
        </button>);
}
