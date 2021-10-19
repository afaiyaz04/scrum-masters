import React from "react";
import ProfileButton from "../components/buttons/ProfileButton";
import "./Header.css";

function Header(prop) {
    const pageHeader = prop.page;
    return (
        <div className="header">
            <div className="header-left">
                <h1>{pageHeader} </h1>
            </div>
            <div className="profile-btn">
                <ProfileButton />
            </div>
        </div>
    );
}

Header.defaultProps = {
    addButton: true,
};

export default Header;
