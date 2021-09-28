import React from "react";
import './Signout.css'
import {withRouter} from "react-router-dom";

class Signout extends React.Component{
	nextPath(path){
		this.props.history.push(path);
	}

	render(){
		return (
			<button className="signout-btn" onClick={() => {this.nextPath('/profile')}}>
                Sign Out
			</button>
		);
	}
}

export default withRouter(Signout);