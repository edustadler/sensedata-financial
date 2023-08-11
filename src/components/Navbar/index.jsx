import React, { useEffect, useState } from "react"
import { DashboardBlock } from "../DashboardBlock"
import { useCrudContext } from "../../contexts/crudContext"
import './navbar.css'

export const Navbar = ({ filteredData }) => {

    const { crudData } = useCrudContext();
    const [totalEntry, setTotalEntry] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    const [total, setTotal] = useState(0);

    //Soma Quando monta a tela a primeira vez
    useEffect(() => {
        const entryTotal = crudData
            .filter(item => item.tipo === "Entrada")
            .reduce((sum, item) => sum + item.valor, 0);

        const outTotal = crudData
            .filter(item => item.tipo === "Saída")
            .reduce((sum, item) => sum + item.valor, 0);

        setTotalEntry(entryTotal);
        setTotalOut(outTotal);
        setTotal(entryTotal - outTotal);
        console.log(entryTotal, outTotal)
    }, [crudData]);

    //Soma quando filtra

    useEffect(() => {
        const entryTotal = filteredData
            .filter(item => item.tipo === "Entrada")
            .reduce((sum, item) => sum + item.valor, 0);

        const outTotal = filteredData
            .filter(item => item.tipo === "Saída")
            .reduce((sum, item) => sum + item.valor, 0);

        setTotalEntry(entryTotal);
        setTotalOut(outTotal);
        setTotal(entryTotal - outTotal);
    }, [filteredData]);

    return (
        <>
            <DashboardBlock ownClass={'navbar'}>
                <div className="navbar__block">
                    <div className="navbar__filter flex-align-center">
                        <h3>Total de entrada:</h3>
                        <span>R$ {totalEntry.toFixed(2)} </span>
                    </div>
                    <div className="navbar__filter flex-align-center">
                        <h3>Total de saída:</h3>
                        <span>R${totalOut.toFixed(2)}</span>
                    </div>
                    <div className="navbar__filter flex-align-center">
                        <h3>Total:</h3>
                        <span>R${total.toFixed(2)}</span>
                    </div>
                </div>
            </DashboardBlock>
        </>
    )
}
