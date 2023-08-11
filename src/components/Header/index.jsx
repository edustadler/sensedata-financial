import React from "react"
import { DashboardBlock } from "../DashboardBlock"
import { AiTwotoneFilter } from "react-icons/ai"
import { AddButton, FilterButton, HeaderApp, HeaderButtons } from "./style"

export const Header = ({ clickFilter, openModal }) => {

    return (
        <>
            <HeaderApp>
                <DashboardBlock ownClass="header">
                    <div className="flex-space-between">
                        <h3>Dashboard</h3>
                        <HeaderButtons>
                            <FilterButton onClick={clickFilter}><AiTwotoneFilter /></FilterButton>
                            <AddButton onClick={openModal}>Novo +</AddButton>
                        </HeaderButtons>
                    </div>
                </DashboardBlock>
            </HeaderApp>
        </>
    )
}