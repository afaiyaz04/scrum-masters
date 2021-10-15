import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import { Avatar } from "antd";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { nameFirst, nameLast, profilePic, type } = user;

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <nav className="sidebar">
                    <div className="userDetails">
                        <img src={profilePic} className="img-sidebar" />
                        <h2 className="userDetails">
                            {nameFirst} {nameLast}
                        </h2>
                        <h2 className="userDetails">{type}</h2>
                    </div>
                    <ul className="nav-menu-items">
                        {type === "ADMIN"
                            ? SidebarData.ADMIN.map((item, index) => {
                                  return (
                                      <li key={index} className={item.cName}>
                                          <Link to={item.path}>
                                              {item.icon}
                                              <span
                                                  style={{ marginLeft: "16px" }}
                                              >
                                                  {item.title}
                                              </span>
                                          </Link>
                                      </li>
                                  );
                              })
                            : SidebarData.GENERAL.map((item, index) => {
                                  return (
                                      <li key={index} className={item.cName}>
                                          <Link to={item.path}>
                                              {item.icon}
                                              <span
                                                  style={{ marginLeft: "16px" }}
                                              >
                                                  {item.title}
                                              </span>
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
