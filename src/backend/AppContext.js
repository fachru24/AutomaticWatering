import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [tanahData, setTanahData] = useState({
        Nama: '',
        moistBtm: '',
        moistUP: '',
        phBtm: '',
        phUp: '',
    });

    const updateTanahData = (updatedData) => {
        setTanahData((prevData) => ({
            ...prevData,
            ...updatedData,
        }));
    };

    return (
        <AppContext.Provider value={{ tanahData, updateTanahData }}>
            {children}
        </AppContext.Provider>
    );
};
