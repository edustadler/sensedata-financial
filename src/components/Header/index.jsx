import React, { useState } from "react"
import { DashboardBlock } from "../DashboardBlock"
import "./header.css"
import { ModalCreate } from "../Modal/ModalCreate"
import { AiTwotoneFilter } from "react-icons/ai"

export const Header = ({ clickFilter }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
        console.log('work')
    };

    return (
        <>
            <header>
                <DashboardBlock ownClass={'header'}>
                    <div className="header__block">
                        <h3>Dashboard</h3>
                        <div className="header__buttons">
                            <button onClick={clickFilter} className="filter_btn"><AiTwotoneFilter /></button>
                            <button onClick={openModal} className="add_btn">Novo +</button>
                        </div>
                    </div>
                </DashboardBlock>
            </header>

            {isModalOpen && <ModalCreate />}
        </>
    )
}