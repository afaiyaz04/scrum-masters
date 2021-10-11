import React from "react";
import { CgProfile } from "react-icons/cg";
import './ProfileButton.css'
import {withRouter} from "react-router-dom";

class ProfileButton extends React.Component{
	nextPath(path){
		this.props.history.push(path);
	}

	revertProfileAction = () => {
		localStorage.setItem('userData', localStorage.getItem('originalData'));
		localStorage.removeItem('originalData');
		this.nextPath('/dashboard');
	}

	render(){
		const profileButton = (
			<button className="btn" onClick={() => {this.nextPath('/profile')}}>
				<CgProfile></CgProfile> MyProfile
			</button>
		)
		const revertProfileButton = (
			<button className="btn" onClick={this.revertProfileAction}>
				Revert Profile
			</button>
		)
		if (localStorage.getItem('originalData')) {
			return (revertProfileButton)
		} else {
			return (profileButton)
		}
	}
}


// function ProfileButton() {
// 	nextPath(path){
// 		this.props.history.push(path);
// 	}
// 	return (
// 		<button className="btn" onClick={() => {this.nextPath('/profile')}}>
// 			MyProfile
// 		</button>
// 	);
// }

export default withRouter(ProfileButton);
