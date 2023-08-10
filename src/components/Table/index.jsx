import React, { useEffect, useState } from "react";
import { DashboardBlock } from "../DashboardBlock";
import { useCrudContext } from "../../contexts/crudContext";
import './table.css';
import { toast } from "react-toastify";
import authController from "../../routes/authController";
import { ModalUpdate } from "../Modal/ModalUpdate";
import { AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai"


export const Table = ({ filterData }) => {
    const { crudData, setCrudData } = useCrudContext();
    const [filteredData, setFilteredData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const customId = "preventTwice";
    const customIdError = "preventTwiceError";

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const openUpdateModal = (data) => {
        setSelectedData(data);
        setIsUpdateModalOpen(!isUpdateModalOpen);
    };

    const handleDelete = async (id) => {
        try {
            const response = await authController.deleteData(id);
            if (response.status === 200) {
                const updatedCrudData = crudData.filter(item => item.id !== id);
                setCrudData(updatedCrudData);

                toast("Transação deletada!", {
                    toastId: customId,
                    autoClose: 700
                });
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item.", {
                toastId: customIdError
            });
        };
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await authController.getCrudData();
                setCrudData(data);
                toast("Movimentação atualizada!", {
                    toastId: customId,
                    autoClose: 700
                });
            } catch (error) {
                console.error('Error fetching CRUD data:', error);
                toast.error('Falha ao carregar valores', {
                    toastId: customIdError
                });
            }
        }

        fetchData();
    }, [setCrudData]);

    useEffect(() => {
        try {
            const formattedData = crudData.map(values => ({
                ...values,
                data: formatDate(values.data),
            }));

            const filtered = formattedData.filter(item =>
                (!filterData.selectedCategory || item.categoria === filterData.selectedCategory) &&
                (!filterData.selectedType || item.tipo === filterData.selectedType) &&
                (!filterData.startDate || new Date(item.data) >= new Date(filterData.startDate)) &&
                (!filterData.endDate || new Date(item.data) <= new Date(filterData.endDate))
            );

            setFilteredData(filtered);
        } catch (error) {
            console.error('Error fetching CRUD data:', error);
            toast.error('Falha ao carregar valores', {
                toastId: customIdError
            });
        }

    }, [crudData, filterData]);

    return (
        <>
            <DashboardBlock ownClass="table">
                <table className="value-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((values, index) => (
                                <tr key={index}>
                                    <td>{values.nome}</td>
                                    <td>{values.categoria}</td>
                                    <td>{values.data}</td>

                                    {values.tipo === 'Entrada'
                                        ?
                                        <td className="value-td-in">
                                            <p>R${values.valor}</p>
                                            <div className="btn-crud">
                                                <button className="update-value" onClick={() => openUpdateModal(values)}><AiTwotoneEdit /></button>
                                                <button className="delete-value" onClick={() => handleDelete(values.id)}><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                        :
                                        <td className="value-td-out">
                                            <p>R${values.valor}</p>
                                            <div className="btn-crud">
                                                <button className="update-value" onClick={() => openUpdateModal(values)}><AiTwotoneEdit /></button>
                                                <button className="delete-value" onClick={() => handleDelete(values.id)}><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </DashboardBlock>
            {isUpdateModalOpen && (
                <ModalUpdate selectedData={selectedData} closeModal={() => setIsUpdateModalOpen(false)} />
            )}
        </>
    );
};
