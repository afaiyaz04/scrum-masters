import React from 'react';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData'
import './Sidebar.css';
import {IconContext} from 'react-icons'

function Navbar() {

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <nav className='sidebar'>
                <ul className='nav-menu-items'>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                     })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar
