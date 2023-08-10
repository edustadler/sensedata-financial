
import React from "react"
import Container from "./Container"


export const DashboardBlock = ({ ownClass, children }) => {
    return (
        <>
            <div className={`dashboard-block ${(ownClass !== '') ? ownClass : null}`}>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};