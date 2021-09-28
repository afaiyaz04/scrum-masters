import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import Header from '../components/Header';
import ItemDetails from '../components/ItemDetails';

function Orders() {
    return (
        <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <Header page='Orders'></Header>
                {/* <div className='line'></div> */}
                <div className='contents'>
                    <div className='contents-left'>
                    </div>
                    <ItemDetails item='Order' type='Orders' details='Order Number- 0000' ></ItemDetails>
                </div>
            </div>
        </div>

    )
}

export default Orders