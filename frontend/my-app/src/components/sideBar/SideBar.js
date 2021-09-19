import React from "react";

const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="side-bar__user">
                <h3 className="heading">Admin User</h3>
            </div>
            <ul>
                <li><a href="#"><i className="fas fa-home fa-lg"></i>Dashboard</a></li>
                <li><a href="#"><i className="fas fa-address-book fa-lg"></i>Contacts</a></li>
                <li><a href="#"><i className="fas fa-cash-register fa-lg"></i>Orders</a></li>
                <li><a href="#"><i className="fas fa-lock fa-lg"></i>Contracts</a></li>
                <li><a href="#"><i className="fas fa-users fa-lg"></i>Users</a></li>
            </ul>
        </div>
    );
};

export default SideBar;
