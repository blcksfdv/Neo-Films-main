import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../Components/Navbar'
import Footer from "../../Components/Footer";

export const MainPage = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>

        </div>
    )
}
