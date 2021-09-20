import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import ProfileButton from '../components/buttons/ProfileButton';

function Contacts() {
    return (
        <div className='Master-div'>
            <Sidebar />
            <div className='contacts'>
                <div className='header'>
                    <h1>Contacts</h1>
                    <ProfileButton></ProfileButton>
                </div>
                <div className='contents'>
                    <div className='contents-left'>
                        <h1>name</h1>
                        <h2>Alex</h2>
                        <h2>Saleh</h2>
                    </div>
                    <div className='contents-right'>
                        <h1>contact details</h1>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Contacts