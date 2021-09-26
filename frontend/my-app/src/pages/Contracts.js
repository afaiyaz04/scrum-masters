import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import ItemDetails from '../components/ItemDetails';

function Contracts() {
    return (
        <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <Header page='Contract'></Header>
                <div className='line'></div>
                <div className='contents'>
                    <div className='contents-left'>
                    </div>
                    <ItemDetails item='Contract' type='Contract' details='Contract Number- 07865' ></ItemDetails>
                </div>
            </div>
        </div>
    )
}

export default Contracts