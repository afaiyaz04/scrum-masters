import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';


function Dashboard() {
    return (
        <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <Header page='Dashboard'></Header>
                <div className='line'></div>
                <div className='contents'>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
