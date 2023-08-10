import React, { useState } from "react";
import { DashboardBlock } from "../DashboardBlock";
import { useCrudContext } from "../../contexts/crudContext";
import "./filter.css";
import { toast } from "react-toastify";

export const Filter = ({ onFilter }) => {

    const { crudData } = useCrudContext();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const uniqueCategories = [...new Set(crudData.map(item => item.categoria))];
    const uniqueTypes = [...new Set(crudData.map(item => item.tipo))];

    //Categorias
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    //Tipo
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };
    //Data (from)
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    //Data (to)
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    //Função do botão
    const handleFilterClick = () => {
        const filtered = crudData.filter(item =>
            (!selectedCategory || item.categoria === selectedCategory) &&
            (!selectedType || item.tipo === selectedType) &&
            (!startDate || new Date(item.data) >= new Date(startDate)) &&
            (!endDate || new Date(item.data) <= new Date(endDate))
        );

        onFilter({
            selectedCategory,
            selectedType,
            startDate,
            endDate
        }, filtered);

        toast('Filtro Aplicado com sucesso!', {
            autoClose: 700
        })
    };

    return (
        <>
            <DashboardBlock ownClass={'filter-modal'}>
                <div className="filter">
                    <div className="filter__category flex-align-center">
                        <h3>Filtrar por categoria</h3>
                        <select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Todas</option>
                            {uniqueCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter__type flex-align-center">
                        <h3>Filtrar por tipo</h3>
                        <select value={selectedType} onChange={handleTypeChange}>
                            <option value="">Todos</option>
                            {uniqueTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter__date flex-align-center">
                        <h3>Filtrar por data</h3>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                        <span> - </span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
                    <div className="filter__button">
                        <button onClick={handleFilterClick}>Filtrar</button>
                    </div>
                </div>
            </DashboardBlock>
        </>
    );
};

export default Filter;
