import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../pages/Home";



const RoutesPages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Home} path="/" />
            </Routes>
        </BrowserRouter>

    )
}


export default RoutesPages;

