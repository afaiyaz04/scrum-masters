import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";


function Dashboard() {
    return (
        <div>
            <Sidebar />
            <div className='dashboard'>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard
