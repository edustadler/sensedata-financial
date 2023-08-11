import React, { useState } from "react";
import { useCrudContext } from "../../contexts/crudContext";
import { toast } from "react-toastify";
import { FilterButton, FilterCategory, FilterContainer, FilterDate, FilterType, FilterWrapper } from "./styled";

export const Filter = ({ onFilter }) => {

    const { crudData } = useCrudContext();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [startDate, setStartDate] = useState("");

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


    //Função do botão
    const handleFilterClick = () => {
        const filtered = crudData.filter(item =>
            (!selectedCategory || item.categoria === selectedCategory) &&
            (!selectedType || item.tipo === selectedType) &&
            (!startDate || new Date(item.data) >= new Date(startDate))
        );

        onFilter({
            selectedCategory,
            selectedType,
            startDate,

        }, filtered);

        toast('Filtro Aplicado com sucesso!', {
            autoClose: 1000
        })
    };

    return (
        <>
            <FilterContainer ownClass="filter-modal">
                <FilterWrapper className="filter">
                    <FilterCategory className="filter__category flex-align-center">
                        <h3>Filtrar por categoria</h3>
                        <select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Todas</option>
                            {uniqueCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </FilterCategory>
                    <FilterType className="filter__type flex-align-center">
                        <h3>Filtrar por tipo</h3>
                        <select value={selectedType} onChange={handleTypeChange}>
                            <option value="">Todos</option>
                            {uniqueTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </FilterType>
                    <FilterDate className="filter__date flex-align-center">
                        <h3>Filtrar à partir de: </h3>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </FilterDate>
                    <FilterButton className="filter__button">
                        <button onClick={handleFilterClick}>Filtrar</button>
                    </FilterButton>
                </FilterWrapper>
            </FilterContainer>
        </>
    );
};

export default Filter;
