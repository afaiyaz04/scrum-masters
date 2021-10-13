import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import SignoutButton from "../components/buttons/Signout";
import "./Profile.css";
import * as FaIcons from "react-icons/fa";

function Profile() {
  return (
    <div className="Master-div">
      <Sidebar />
      <div className="profile">
        <div className="header-dashboard">
          <h1>Profile</h1>
          <SignoutButton></SignoutButton>
        </div>
        <div className="profile-contents">
          <div className="user-pic">
            <h1>
              <FaIcons.FaUserCircle />
            </h1>
          </div>
          <div className="first-name">
            First Name
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="last-name">
            Last Name
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="email">
            Email
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="phone">
            Phone Number
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="address">
            Address
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="emergency">Emergency Contact</div>
          <div className="first-name">
            Full Name
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="phone">
            Phone Number
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="email">
            Email
            <button className="edit-btn">
              <FaIcons.FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
