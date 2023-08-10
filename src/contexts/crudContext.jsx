import React, { createContext, useContext, useState, useEffect } from 'react';
import authController from '../routes/authController';
import { toast } from 'react-toastify';

const CrudContext = createContext();

export function useCrudContext() {
    return useContext(CrudContext);
}


export function CrudProvider({ children }) {
    const [crudData, setCrudData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const customIdErrorContext = "preventTwiceErrorContext";

    const [newDataAdded, setNewDataAdded] = useState(false);

    const addNewCrud = newData => {
        setCrudData(prevCrudData => [...prevCrudData, newData]);
        setNewDataAdded(true);
    };




    useEffect(() => {
        async function fetchData() {
            try {
                const data = await authController.getCrudData();
                setCrudData(data);

            } catch (error) {
                console.error('Error fetching CRUD data:', error);
                toast.error('Falha ao carregar valores', {
                    toastId: customIdErrorContext,
                    autoClose: 700
                });
            }
        }
        fetchData();
    }, []);

    const contextValue = {
        crudData,
        setCrudData,
        selectedCategory,
        setSelectedCategory,
        selectedType,
        setSelectedType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        addNewCrud
    };


    return (
        <CrudContext.Provider value={contextValue}>
            {children}
        </CrudContext.Provider>
    );
}
