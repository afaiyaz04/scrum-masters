import React from 'react'
import Sidebar from "../components/sideBar/Sidebar";
import ProfileButton from '../components/buttons/ProfileButton';

function Profile() {
    return (
        <div className='Master-div'>
        <Sidebar />
        <div className='contacts'>
            <div className='header-dashboard'>
                <h1>Profile</h1>
                <ProfileButton></ProfileButton>
            </div>
            <div className='line'></div>
            <div className='contents'></div>
        </div>
    </div>
    )
}

export default Profile
