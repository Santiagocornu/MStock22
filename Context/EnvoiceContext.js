import react, { createContext, useState,useContext } from "react";

const EnvoiceContext = createContext();

export const EnvoiceProvider = ({ children }) => {

    const [envoice,setEnvoice]=useState([])

    const addEnvoice = (envoice) => {
        setEnvoice((prevEnvoice) => [...prevEnvoice, envoice]);
    };

    const removeEnvoice = (envoiceId) => {
        setEnvoice((prevEnvoice) => prevEnvoice.filter(envoice => envoice.id !== envoiceId));
    };

    const updateEnvoice = (updatedEnvoice) => {
        setEnvoice((prevEnvoice) =>
            prevEnvoice.map((envoice) =>
                envoice.id === updatedEnvoice.id ? updatedEnvoice : envoice
            )
        );
    };
    return (
        <EnvoiceContext.Provider value={{ envoice, addEnvoice, removeEnvoice, updateEnvoice }}>
            {children}
        </EnvoiceContext.Provider>
    );
};

export const useEnvoice = () => {
    return useContext(EnvoiceContext);
};