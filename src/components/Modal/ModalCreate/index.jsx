import React, { useRef, useState } from "react"
import "../modal.css"
import authController from "../../../routes/authController";
import { useCrudContext } from "../../../contexts/crudContext";
import { toast } from "react-toastify";


export const ModalCreate = () => {

    const customIdErrorOne = "preventOnce";
    const customIdError = "preventTwice";
    const { addNewCrud } = useCrudContext();
    const [isOpen, setIsOpen] = useState(true)

    const OpenModalAdd = () => {
        setIsOpen(!isOpen)
    }

    const ref = useRef()
    const [formData, setFormData] = useState({
        titulo: "",
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
                addNewCrud(response.data);
                setIsOpen(false);
                toast('Nova transação realizada!', {
                    toastId: customIdErrorOne,
                    autoClose: 1000
                })
            }
        } catch (error) {
            console.error("Error creating data:", error);
            toast('Erro ao Contatar o banco de dados!', {
                toastId: customIdError,
                autoClose: 1000
            });
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
                                            value={formData.titulo}
                                            onChange={(e) =>
                                                setFormData({ ...formData, titulo: e.target.value || "Vazio" })
                                            }
                                        />
                                    </label>
                                    <label htmlFor='categoria'>
                                        <input
                                            name="categoria"
                                            type="text"
                                            placeholder="Categoria (ex: 'Viagem')"
                                            value={formData.categoria}
                                            onChange={(e) =>
                                                setFormData({ ...formData, categoria: e.target.value || "Geral" })
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