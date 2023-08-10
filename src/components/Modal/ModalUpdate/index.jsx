import React, { useEffect, useRef, useState } from "react"
import "../modal.css"
import authController from "../../../routes/authController";
import { toast } from "react-toastify";

export const ModalUpdate = ({ selectedData }) => {

    const ref = useRef();
    const [isOpen, setIsOpen] = useState(true)
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [formData, setFormData] = useState({
        nome: selectedData.nome,
        categoria: selectedData.categoria,
        tipo: selectedData.tipo,
        valor: selectedData.valor
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

            const response = await authController.updateData(selectedData.id, updatedData);
            if (response.status === 200 || response.status === 204) {
                setIsOpen(false);
            }
            setShouldRefresh(true);
            toast.success('Transação atualizada', { autoClose: 700 });
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
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
                                    <label htmlFor='name'>
                                        <input
                                            name="nome"
                                            type="text"
                                            placeholder="Nome da movimentação"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label htmlFor='categoria'>
                                        <input
                                            name="categoria"
                                            type="text"
                                            placeholder="Categoria da movimentação (ex: 'Viagem') "
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