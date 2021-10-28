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
import UsersForm from "../components/UsersForm";
import { connect } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { getAllReports } from "../redux/Report/report.actions";
import { formatUserReport, createReport } from "../components/Report";
import { deleteSelf, switchUser } from "../redux/User/user.actions";

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
            userId: JSON.parse(localStorage.getItem("user"))._id,
            networkId: JSON.parse(localStorage.getItem("user")).networkId,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers(this.state.networkId));
        this.props.dispatch(getAllReports(this.state.networkId));
    }

    promoteHandler = (toUserId) => {
        this.props.dispatch(promoteUser(toUserId));
        this.setState({ showDetails: false });
    };

    controlHandler = (toUserId) => {
        this.props.dispatch(switchUser(toUserId, this.props.history));
    };

    deleteHandler = (userId) => {
        if (this.state.userId === userId && !localStorage.getItem("original")) {
            this.props.dispatch(deleteSelf(userId, this.props.history));
        } else if (
            this.state.userId === userId &&
            localStorage.getItem("original")
        ) {
            localStorage.setItem("user", localStorage.getItem("original"));
            localStorage.removeItem("original");
            this.props.dispatch(deleteUser(userId));
            this.props.history.push("/dashboard");
        } else {
            this.props.dispatch(deleteUser(userId));
        }
        this.setState({ showDetails: false });
    };

    registerHandler = (newUser) => {
        this.setState({ addUser: false });
        this.props.dispatch(
            registerUser({ ...newUser, networkId: this.state.networkId })
        );
        console.log({ ...newUser, networkId: this.state.networkId });
    };

    generateReports = () => {
        const pageBodies = this.props.reports.map((o) => {
            return formatUserReport(o);
        });
        createReport(pageBodies.flat(), "all-reports");
    };

    generateReport = (userId) => {
        const reportIndex = this.props.reports.findIndex((o) => {
            return o.id === userId;
        });

        createReport(
            formatUserReport(this.props.reports[reportIndex]),
            `${userId}-report`
        );
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
                                block
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
                                    reportAction={this.generateReport}
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
