import React from "react";
import ProfileButton from "../components/buttons/ProfileButton";
import "./Header.css";

function Header(prop) {
  const pageHeader = prop.page;
  return (
    <div className="header">
      <div className="header-left">
        <h1>
          {pageHeader} <button onClick={prop.actions}>+</button>
        </h1>
      </div>
      <div className="profile-btn">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Header;
