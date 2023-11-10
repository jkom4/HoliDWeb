export {CustomInput}
const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-grey-800 focus:border-grey-800 focus:z-10 sm:text-sm"

function CustomInput({
                          handleChange,
                          value,
                          id,
                          type,
                          name,
                          placeholder,
                          isRequired = false,
                          customClass
                     }){
    return(
        <div className="my-5">
            <input
                onChange={handleChange}
                value={value}
                id={id}
                name={name}
                type={type}
                required={isRequired}
                className={fixedInputClass+customClass}
                placeholder={placeholder}
            />
        </div>
    )
}
