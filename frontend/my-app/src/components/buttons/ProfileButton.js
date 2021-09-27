import React from "react";
import { CgProfile } from "react-icons/cg";
import './ProfileButton.css'
import {withRouter} from "react-router-dom";

class ProfileButton extends React.Component{
	nextPath(path){
		this.props.history.push(path);
	}

	render(){
		return (
			<button className="btn" onClick={() => {this.nextPath('/profile')}}>
				MyProfile
			</button>
		);
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
