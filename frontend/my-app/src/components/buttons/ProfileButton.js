import React from "react";
import { CgProfile } from "react-icons/cg";
import './ProfileButton.css'


function ProfileButton() {

	return (
		<button className="btn" >
			<CgProfile></CgProfile> MyProfile
		</button>
	);
}

export default ProfileButton;
