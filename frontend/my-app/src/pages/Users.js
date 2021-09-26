import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import ItemDetails from '../components/ItemDetails';


function Users() {
    return (
        <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <Header page='Users'></Header>
                <div className='line'></div>
                <div className='contents'>
                    <div className='contents-left'>
                    </div>
                    <ItemDetails item='User' type='Users' details='User Number- 420' ></ItemDetails>
                </div>
            </div>
        </div>

    )
}

export default Users