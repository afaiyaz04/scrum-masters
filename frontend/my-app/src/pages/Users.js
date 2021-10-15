import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button, Avatar } from "antd";
import {
    fetchUsers,
    promoteUser,
    deleteUser,
    registerUser,
} from "../redux/Users/users.actions";
import { fetchUser } from "../redux/api";
import UsersForm from "../components/UsersForm";
import { connect } from "react-redux";
import { SIGN_OUT } from "../redux/User/user.types";

const initialUser = {
    id: "",
    nameFirst: "",
    nameLast: "",
    email: "",
    profilePic: "",
    type: "",
};

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: initialUser,
            showDetails: false,
            addUser: false,
            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    promoteHandler = (toUserId) => {
        this.props.dispatch(promoteUser(toUserId));
        this.setState({ showDetails: false });
    };

    controlHandler = (toUserId) => {
        if (!localStorage.getItem("originalData")) {
            localStorage.setItem(
                "originalData",
                localStorage.getItem("userData")
            );
        }
        fetchUser(toUserId).then((res) => {
            localStorage.setItem("userData", JSON.stringify(res.data));
            this.props.history.push("/dashboard");
        });
    };

    deleteHandler = (userId) => {
        if (
            this.state.userId === userId &&
            !localStorage.getItem("originalData")
        ) {
            this.props.dispatch(deleteUser(userId));
            this.props.dispatch({ type: SIGN_OUT });
            this.props.history.push("/");
        } else if (
            this.state.userId === userId &&
            localStorage.getItem("originalData")
        ) {
            localStorage.setItem(
                "userData",
                localStorage.getItem("originalData")
            );
            localStorage.removeItem("originalData");
            this.props.dispatch(deleteUser(userId));
            this.props.history.push("/dashboard");
        } else {
            this.props.dispatch(deleteUser(userId));
        }
        this.setState({ showDetails: false });
    };

    registerHandler = (newUser) => {
        this.setState({ addUser: false });
        this.props.dispatch(registerUser(newUser));
    };

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="users">
                    <Header
                        page="Users"
                        actions={() => {
                            this.setState({
                                addUser: true,
                                showDetails: false,
                                user: initialUser,
                            });
                        }}
                    />
                    <div className="contents">
                        <div className="contents-left">
                            <span>Name</span>
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.users}
                                renderItem={(item) => (
                                    <List.Item
                                        className="user-item"
                                        key={item.id}
                                        actions={[
                                            <Button
                                                type="dashed"
                                                className="general-btn"
                                                onClick={() => {
                                                    this.setState({
                                                        showDetails: true,
                                                        addUser: false,
                                                        user: {
                                                            id: item._id,
                                                            nameFirst:
                                                                item.nameFirst,
                                                            nameLast:
                                                                item.nameLast,
                                                            email: item.email,
                                                            profilePic:
                                                                item.profilePic,
                                                            type: item.type,
                                                        },
                                                    });
                                                }}
                                            >
                                                Details
                                            </Button>,
                                        ]}
                                    >
                                        {!item.nameFirst && !item.nameFirst && (
                                            <List.Item.Meta
                                                title={"UNREGISTERED USER"}
                                                description={item.email}
                                                avatar={<CgProfile />}
                                            />
                                        )}
                                        {(item.nameFirst || item.nameFirst) && (
                                            <List.Item.Meta
                                                title={`${item.nameFirst} ${item.nameLast}`}
                                                description={item.email}
                                                avatar={
                                                    <Avatar
                                                        src={item.profilePic}
                                                    />
                                                }
                                            />
                                        )}
                                    </List.Item>
                                )}
                            />
                        </div>
                        {(this.state.showDetails || this.state.addUser) && (
                            <div className="contents-right">
                                <UsersForm
                                    user={this.state.user}
                                    showDetails={this.state.showDetails}
                                    addUser={this.state.addUser}
                                    closeAction={() =>
                                        this.setState({
                                            showDetails: false,
                                            addUser: false,
                                        })
                                    }
                                    promoteAction={this.promoteHandler}
                                    controlAction={this.controlHandler}
                                    deleteAction={this.deleteHandler}
                                    registerAction={this.registerHandler}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users,
    };
};

export default connect(mapStateToProps)(Users);
