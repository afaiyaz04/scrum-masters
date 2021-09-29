import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'
import './Sidebar.css';
import { IconContext } from 'react-icons'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/User/user.actions';
import * as FaIcons from "react-icons/fa";

function Navbar() {
    const user = useSelector((state) => state.user);
    const { nameFirst, nameLast, type } = user;
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const response = await axios
            .get("http://localhost:5000/user/614180facb6259ce3427029f")
            .catch((err) => {
                console.log("ERR", err);
            });
        dispatch(setUser(response.data));
    };

    useEffect(() => {
        fetchUser();
    });

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='sidebar'>
                    <div className='userDetails'>
                        <h1><FaIcons.FaUserCircle /></h1>
                        <h2>{nameFirst} {nameLast}</h2>
                        <h2>{type}</h2>

                    </div>
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
