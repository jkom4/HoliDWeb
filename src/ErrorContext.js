// ErrorContext.js

import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errMsg, setErrMsg] = useState('');
    const [infoMsg, setInfMsg] = useState('');

    const setErrorMsg = (message) => {
        setErrMsg(message);
    };

    const setInfoMsg = (message) => {
        setInfMsg(message);
    };

    return (
        <ErrorContext.Provider value={{ errMsg, setErrorMsg ,infoMsg, setInfoMsg}}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    return useContext(ErrorContext);
};
