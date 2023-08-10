import React, { useState } from "react"
import { Table } from "../components/Table"
import { Navbar } from "../components/Navbar"
import { Filter } from "../components/Filter"
import { Header } from "../components/Header"
import { DashboardBlock } from "../components/DashboardBlock"

export default function Home() {
    const [openFilter, setOpenFilter] = useState(false);
    const [filterData, setFilterData] = useState({
        selectedCategory: "",
        selectedType: "",
        startDate: "",
        endDate: ""
    });
    const [filteredData, setFilteredData] = useState([]);

    const showFilter = () => {
        setOpenFilter(!openFilter);
    };

    const updateFilterData = (newFilterData, newFilteredData) => {
        setFilterData(newFilterData);
        setFilteredData(newFilteredData);
    };

    return (
        <>
            <DashboardBlock ownClass={'shadow'}>
                <Header clickFilter={showFilter} />
                {openFilter ? <Filter onFilter={updateFilterData} /> : null}
                <Navbar filteredData={filteredData} />
                <Table filterData={filterData} />
            </DashboardBlock>
        </>
    );
}
