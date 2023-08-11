import React, { useEffect, useRef, useState } from "react"
import "../modal.css"
import authController from "../../../routes/authController";
import { toast } from "react-toastify";
import { useCrudContext } from "../../../contexts/crudContext";

export const ModalUpdate = ({ selectedData, closeModal }) => {

    const ref = useRef();
    const { setCrudData } = useCrudContext();
    const [isOpen, setIsOpen] = useState(true)
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [formData, setFormData] = useState({
        titulo: selectedData ? selectedData.titulo : '',
        categoria: selectedData ? selectedData.categoria : '',
        tipo: selectedData ? selectedData.tipo : '',
        valor: selectedData ? selectedData.valor : ''
    });


    useEffect(() => {
        if (shouldRefresh) {
            window.location.reload();
        }
    }, [shouldRefresh]);

    const handleUpdate = async (data) => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split("T")[0];

            const updatedData = {
                ...data,
                data: formattedDate,
            };

            const response = await authController.updateData(selectedData._id, updatedData);
            setIsOpen(false); // Close the modal

            setCrudData(prevCrudData =>
                prevCrudData.map(item =>
                    item._id === selectedData._id ? { ...item, ...updatedData } : item
                )
            );

            toast.success('Transação atualizada', { autoClose: 1000 });
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'valor' ? parseFloat(value) : value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: parsedValue
        }));
    };



    const OpenModalAdd = () => {
        setIsOpen(!isOpen)
    }




    return (
        <>
            {isOpen && (

                <div className="modal">
                    <div className="modal__container">
                        <div className="modal__block">
                            <div className="modal__header">
                                <h3>Atualizar movimentação</h3>
                                <div className="modal__close" onClick={OpenModalAdd}></div>
                            </div>
                            <div className="modal__form">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUpdate(formData);
                                }} ref={ref}>
                                    <label htmlFor='titulo'>
                                        <input
                                            name="titulo"
                                            type="text"
                                            placeholder="Nome da movimentação"
                                            value={formData.titulo}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label htmlFor='categoria'>
                                        <input
                                            name="categoria"
                                            type="text"
                                            placeholder="Categoria (ex: 'Viagem') "
                                            value={formData.categoria}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label htmlFor='tipo'>
                                        <select
                                            name="tipo"
                                            value={formData.tipo}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Tipo</option>
                                            <option value="Entrada">Entrada</option>
                                            <option value="Saída">Saída</option>
                                        </select>
                                    </label>
                                    <label htmlFor="valor">
                                        <input
                                            name="valor"
                                            type="number"
                                            step="any"
                                            value={formData.valor}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <button type="submit">Atualizar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}