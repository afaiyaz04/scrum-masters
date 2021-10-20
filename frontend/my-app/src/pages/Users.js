import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
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
import { AiOutlinePlus } from "react-icons/ai";
import { getAllReports } from "../redux/Report/report.actions";
import { formatUserReport, createReport } from "../components/Report";

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
        this.props.dispatch(getAllReports());
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

    generateReports = () => {
        const pageBodies = this.props.reports.map((o) => {
            return formatUserReport(o);
        });
        createReport(pageBodies.flat(), "All Reports");
    };

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="users">
                    <Header page="Users" />
                    <div className="contents">
                        <div className="contents-left">
                            <Button
                                type="primary"
                                bloack
                                style={{ marginBottom: 25 }}
                                onClick={() => this.generateReports()}
                            >
                                Generate All Reports
                            </Button>
                            <List
                                header={
                                    <h3>
                                        <span className="content-header">
                                            Name
                                        </span>
                                        <Button
                                            className="header-btn"
                                            style={{ marginRight: "50px" }}
                                            size="large"
                                            icon={<AiOutlinePlus />}
                                            onClick={() => {
                                                this.setState({
                                                    addUser: true,
                                                    showDetails: false,
                                                    user: initialUser,
                                                });
                                            }}
                                        />
                                    </h3>
                                }
                                itemLayout="horizontal"
                                dataSource={this.props.users}
                                renderItem={(item) => (
                                    <List.Item
                                        className="user-item"
                                        key={item.id}
                                        actions={[
                                            <Button
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
                                            />
                                        )}
                                        {(item.nameFirst || item.nameFirst) && (
                                            <List.Item.Meta
                                                title={`${item.nameFirst} ${item.nameLast}`}
                                                description={item.email}
                                                avatar={
                                                    <Avatar
                                                        src={item.profilePic}
                                                        referrerPolicy="no-referrer"
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
        reports: state.report,
    };
};

export default connect(mapStateToProps)(Users);
