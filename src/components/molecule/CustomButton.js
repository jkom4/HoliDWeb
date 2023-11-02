export {CustomButton}
function CustomButton({
                          handleSubmit,
                          type='Button',
                          action='submit',
                          text
                      }){
    return (
        <button
            type={action}

            className="w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none my-1"
            onSubmit={handleSubmit}
        >{text}
        </button>);
}
