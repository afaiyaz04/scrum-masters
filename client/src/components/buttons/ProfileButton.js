import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import "./ProfileButton.css";
import { withRouter } from "react-router-dom";
import { Modal, Menu, Dropdown, Button } from "antd";
import Profile from "../ProfileForm";
import { SIGN_OUT } from "../../redux/User/user.types";
import { compose } from "redux";
import { connect } from "react-redux";
import { revertUser } from "../../redux/User/user.actions";

class ProfileButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false,
        };
    }

    revertProfileAction = () => {
        this.props.dispatch(revertUser(this.props.history));
        window.location.reload(true);
    };

    signout = () => {
        this.props.dispatch({ type: SIGN_OUT });
        this.props.history.push("/");
    };

    menu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    this.setState({ showProfile: true });
                }}
                icon={<AiOutlineSetting />}
            >
                Edit Profile
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={this.signout}
                icon={<AiOutlineLogout />}
            >
                Sign Out
            </Menu.Item>
        </Menu>
    );

    render() {
        if (localStorage.getItem("original")) {
            return (
                <Button
                    type="primary"
                    className="btn"
                    onClick={this.revertProfileAction}
                >
                    Revert Profile
                </Button>
            );
        } else {
            return (
                <>
                    <Dropdown overlay={this.menu}>
                        <Button
                            className="btn"
                            icon={<CgProfile style={{ verticalAlign: -2 }} />}
                        >
                            Profile
                        </Button>
                    </Dropdown>
                    <Modal
                        title="Profile"
                        visible={this.state.showProfile}
                        onCancel={() => {
                            this.setState({ showProfile: false });
                        }}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <Profile />
                    </Modal>
                </>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default compose(withRouter, connect(mapStateToProps))(ProfileButton);
