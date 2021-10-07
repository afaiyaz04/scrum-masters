import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";


function Navbar() {
  const user = useSelector((state) => state.user);
  const { nameFirst, nameLast, type } = user;

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="sidebar">
          <div className="userDetails">
            <h1>
              <FaIcons.FaUserCircle />
            </h1>
            <h2>
              {nameFirst} {nameLast}
            </h2>
            <h2>{type}</h2>
          </div>
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
