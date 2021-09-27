import React from 'react'
import ProfileButton from '../components/buttons/ProfileButton';


function Header(prop) {

    const pageHeader = prop.page;

    return (
        <div className='header'>
            <h1>{pageHeader} <button>+</button></h1>
            <ProfileButton></ProfileButton>
        </div>

    );
}

export default Header