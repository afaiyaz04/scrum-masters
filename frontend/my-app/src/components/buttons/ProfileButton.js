import React from "react";
import { CgProfile } from "react-icons/cg";
import './ProfileButton.css'
import { withRouter } from "react-router-dom";
import { Modal, Menu, Dropdown, Button } from "antd";
import Profile from "../ProfileForm";
import { SIGN_OUT } from "../../redux/User/user.types";
import { compose } from "redux";
import { connect } from "react-redux";

class ProfileButton extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showProfile: false,
		}
	}

	nextPath(path) {
		this.props.history.push(path);
	}

	revertProfileAction = () => {
		localStorage.setItem('userData', localStorage.getItem('originalData'));
		localStorage.removeItem('originalData');
		this.nextPath('/dashboard');
	}

	signout = () => {
		this.props.dispatch({ type:  SIGN_OUT });
		this.props.history.push('/');
	}

	menu = (
		<Menu>
			<Menu.Item key='1' onClick={() => {this.setState({ showProfile: true })}}>
				Edit Profile
			</Menu.Item>
			<Menu.Item key='2' onClick={this.signout}>
				Sign Out
			</Menu.Item>
		</Menu>
	);

	render() {
		if (localStorage.getItem('originalData')) {
			return (
				<button className="btn" onClick={this.revertProfileAction}>
					Revert Profile
				</button>
			)
		} else {
			return (
				<>
					<Dropdown overlay={this.menu}>
						<Button><CgProfile /> Profile</Button>
					</Dropdown>
					<Modal
						title='Profile'
						visible={this.state.showProfile}
						onCancel={() => {this.setState({ showProfile: false })}}
						footer={null}
						destroyOnClose={true}>
						<Profile />
					</Modal>
				</>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default compose(withRouter, connect(mapStateToProps))(ProfileButton);
