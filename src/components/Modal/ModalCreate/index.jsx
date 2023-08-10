import React, { useRef, useState } from "react"
import "../modal.css"
import authController from "../../../routes/authController";
import { useCrudContext } from "../../../contexts/crudContext";


export const ModalCreate = () => {

    const { addNewCrud } = useCrudContext();
    const [isOpen, setIsOpen] = useState(true)

    const OpenModalAdd = () => {
        setIsOpen(!isOpen)
    }

    const ref = useRef()
    const [formData, setFormData] = useState({
        nome: "",
        categoria: "",
        tipo: "",
        valor: ""
    });

    const handleCreate = async (data) => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split("T")[0];

            const formDataWithDate = {
                ...data,
                data: formattedDate,
            };

            const response = await authController.createData(formDataWithDate);
            if (response.status === 200) {
                // Add the new entry using the addNewCrud function from the context
                addNewCrud(response.data);

                setFormData({
                    nome: "",
                    categoria: "",
                    tipo: "",
                    valor: ""
                });
                setIsOpen(false);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal__container">
                        <div className="modal__block">
                            <div className="modal__header">
                                <h3>Nova movimentação</h3>
                                <div className="modal__close" onClick={OpenModalAdd}></div>
                            </div>
                            <div className="modal__form">
                                <form action="" ref={ref} onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreate(formData);
                                }}>
                                    <label htmlFor='name'>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Nome da movimentação"
                                            value={formData.nome}
                                            onChange={(e) =>
                                                setFormData({ ...formData, nome: e.target.value })
                                            }
                                        />
                                    </label>
                                    <label htmlFor='categoria'>
                                        <input
                                            name="categoria"
                                            type="text"
                                            placeholder="Categoria da movimentação (ex: 'Viagem')"
                                            value={formData.categoria}
                                            onChange={(e) =>
                                                setFormData({ ...formData, categoria: e.target.value })
                                            }
                                        />
                                    </label>
                                    <label htmlFor='tipo'>
                                        <select
                                            name="tipo"
                                            placeholder="Tipo"
                                            value={formData.tipo}
                                            onChange={(e) =>
                                                setFormData({ ...formData, tipo: e.target.value })
                                            }
                                        >
                                            <option value="" disabled>Tipo</option>
                                            <option value="Entrada">Entrada</option>
                                            <option value="Saída">Saída</option>
                                        </select>
                                    </label>
                                    <label htmlFor="valor">
                                        <input
                                            type="number"
                                            step="any"
                                            placeholder="Valor"
                                            value={formData.valor}
                                            onChange={(e) =>
                                                setFormData({ ...formData, valor: e.target.value })
                                            }
                                        />
                                    </label>
                                    <button type="submit">Adicionar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}