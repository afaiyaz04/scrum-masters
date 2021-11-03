import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import ProfileButton from "../components/buttons/ProfileButton";
import { connect } from "react-redux";
import {
    Timeline,
    Card,
    Progress,
    Table,
    Empty,
    Avatar,
    Alert,
    Tag,
    Statistic,
} from "antd";
import { fetchOrders } from "../redux/Order/order.actions";
import "./Dashboard.css";
import { fetchContacts } from "../redux/Contact/contact.actions";

const columns = [
    {
        title: "Order No.",
        dataIndex: "orderNumber",
        key: "_id",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
            switch (status) {
                case "CREATED":
                    return (
                        <Tag color={"red"} key={status}>
                            {status}
                        </Tag>
                    );
                case "DISCUSSED":
                    return (
                        <Tag color={"orange"} key={status}>
                            {status}
                        </Tag>
                    );
                case "AGREED":
                    return (
                        <Tag color={"blue"} key={status}>
                            {status}
                        </Tag>
                    );
                case "SIGNED":
                    return (
                        <Tag color={"green"} key={status}>
                            {status}
                        </Tag>
                    );
                default:
                    return;
            }
        },
    },
    {
        title: "Created",
        dataIndex: "timePlaced",
        key: "timePlaced",
    },
    {
        title: "Deadline",
        dataIndex: "timeDue",
        key: "timeDue",
    },
    {
        title: "Fee",
        dataIndex: "totalFee",
        key: "totalFee",
    },
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomingAlertClosed: false,
            dueAlertClosed: false,

            userId: JSON.parse(localStorage.getItem("user"))._id,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchOrders(this.state.userId));
        this.props.dispatch(fetchContacts(this.state.userId));
    }

    timelineOrders = (order) => {
        switch (order.order.status) {
            case "CREATED":
                return (
                    <Timeline.Item key={order.order._id} color="red">
                        {this.timelineOrderText(order)}
                    </Timeline.Item>
                );
            case "DISCUSSED":
                return (
                    <Timeline.Item key={order.order._id} color="orange">
                        {this.timelineOrderText(order)}
                    </Timeline.Item>
                );
            case "AGREED":
                return (
                    <Timeline.Item key={order.order._id} color="blue">
                        {this.timelineOrderText(order)}
                    </Timeline.Item>
                );
            case "SIGNED":
                return (
                    <Timeline.Item key={order.order._id} color="green">
                        {this.timelineOrderText(order)}
                    </Timeline.Item>
                );
            case "CONTRACT":
                return (
                    <Timeline.Item key={order.order._id} color="black">
                        {this.timelineContractText(order)}
                    </Timeline.Item>
                );
            default:
                return;
        }
    };

    timelineOrderText = (order) => {
        if (new Date(order.order.timeDue) - Date.now() < 604800000) {
            return (
                <div style={{ color: "red" }}>
                    Order {order.order.orderNumber}, due:{" "}
                    {order.order.timeDue.slice(0, 10)}
                </div>
            );
        } else {
            return (
                <div>
                    Order {order.order.orderNumber}, due:{" "}
                    {order.order.timeDue.slice(0, 10)}
                </div>
            );
        }
    };

    timelineContractText = (order) => {
        if (new Date(order.order.timeDue) - Date.now() < 604800000) {
            return (
                <div style={{ color: "red" }}>
                    Contract {order.order.orderNumber}, due:{" "}
                    {order.order.timeDue.slice(0, 10)}
                </div>
            );
        } else {
            return (
                <div>
                    Contract {order.order.orderNumber}, due:{" "}
                    {order.order.timeDue.slice(0, 10)}
                </div>
            );
        }
    };

    filterOrders = () => {
        return this.props.orders.filter((order) => {
            return !order.isTransfer && order.order.status !== "ARCHIVED" && order.order.status !== "CONTRACT";
        });
    };

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="dashboard">
                    <div className="header-dashboard">
                        <h1>Dashboard</h1>
                        <ProfileButton></ProfileButton>
                    </div>
                    <div className="progress">
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => {
                                    return (
                                        order.order.status === "CREATED" &&
                                        !order.isTransfer
                                    );
                                }).length *
                                    100) /
                                this.filterOrders().length
                            }
                            format={() =>
                                `${
                                    this.props.orders.filter((order) => {
                                        return (
                                            order.order.status === "CREATED" &&
                                            !order.isTransfer
                                        );
                                    }).length
                                } Orders Created`
                            }
                            strokeColor="#ff4d4f"
                        />
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => {
                                    return (
                                        order.order.status === "DISCUSSED" &&
                                        !order.isTransfer
                                    );
                                }).length *
                                    100) /
                                this.filterOrders().length
                            }
                            format={() =>
                                `${
                                    this.props.orders.filter((order) => {
                                        return (
                                            order.order.status ===
                                                "DISCUSSED" && !order.isTransfer
                                        );
                                    }).length
                                } Orders Discussed`
                            }
                            strokeColor="orange"
                        />
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => {
                                    return order.order.status === "AGREED";
                                }).length *
                                    100) /
                                this.filterOrders().length
                            }
                            format={() =>
                                `${
                                    this.props.orders.filter((order) => {
                                        return order.order.status === "AGREED";
                                    }).length
                                } Orders Agreed`
                            }
                            strokeColor="#1890ff"
                        />
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => {
                                    return order.order.status === "SIGNED";
                                }).length *
                                    100) /
                                this.filterOrders().length
                            }
                            format={() =>
                                `${
                                    this.props.orders.filter((order) => {
                                        return order.order.status === "SIGNED";
                                    }).length
                                } Orders Signed`
                            }
                            strokeColor="#52c418"
                        />
                    </div>
                    <div className="contents">
                        <div className="dashboard-left">
                            <Statistic
                                title="Current Contracts"
                                value={
                                    this.props.orders.filter((order) => {
                                        return (
                                            order.order.status === "CONTRACT"
                                        );
                                    }).length
                                }
                            />
                            <br />
                            <h3>Upcoming Deadlines</h3>
                            <Timeline>
                                <Timeline.Item color="white" />
                                {this.props.orders
                                    .sort((a, b) => {
                                        return (
                                            new Date(a.order.timeDue) -
                                            new Date(b.order.timeDue)
                                        );
                                    })
                                    .filter((order) => {
                                        return (
                                            Date.now() <
                                                new Date(order.order.timeDue) &&
                                            !order.isTransfer
                                        );
                                    })
                                    .map((order) => {
                                        return this.timelineOrders(order);
                                    })}
                            </Timeline>
                        </div>
                        <div className="dashboard-right">
                            {((this.props.orders.filter((order) => {
                                return order.isTransfer;
                            }).length > 0 &&
                                !this.state.incomingAlertClosed) ||
                                (this.props.orders.filter((order) => {
                                    return (
                                        new Date(order.order.timeDue) -
                                            Date.now() <
                                        604800000
                                    );
                                }).length > 0 &&
                                    !this.state.dueAlertClosed)) && (
                                <div
                                    style={{
                                        width: "100%",
                                        paddingBottom: "5%",
                                    }}
                                >
                                    {this.props.orders.filter((order) => {
                                        return order.isTransfer;
                                    }).length > 0 && (
                                        <Alert
                                            message="Incoming Orders"
                                            description={`You have ${
                                                this.props.orders.filter(
                                                    (order) => {
                                                        return order.isTransfer;
                                                    }
                                                ).length
                                            } order(s) ready to be accepted.`}
                                            type="info"
                                            showIcon
                                            banner={true}
                                            style={{ width: "100%" }}
                                            closable
                                            onClose={() => {
                                                this.setState({
                                                    incomingAlertClosed: true,
                                                });
                                            }}
                                        />
                                    )}
                                    {this.filterOrders().filter((order) => {
                                        return (
                                            new Date(order.order.timeDue) -
                                                Date.now() <
                                                604800000 &&
                                            new Date(order.order.timeDue) -
                                                Date.now() >=
                                                0
                                        );
                                    }).length > 0 && (
                                        <Alert
                                            message="Due Soon"
                                            description={`You have ${
                                                this.filterOrders().filter(
                                                    (order) => {
                                                        return (
                                                            new Date(
                                                                order.order.timeDue
                                                            ) -
                                                                Date.now() <
                                                                604800000 &&
                                                            new Date(
                                                                order.order.timeDue
                                                            ) -
                                                                Date.now() >=
                                                                0
                                                        );
                                                    }
                                                ).length
                                            } order(s) due soon.`}
                                            type="warning"
                                            showIcon
                                            banner={true}
                                            style={{ width: "100%" }}
                                            closable
                                            onClose={() => {
                                                this.setState({
                                                    dueAlertClosed: true,
                                                });
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            <div className="favourite-contacts">
                                <h3>Favourite Contacts</h3>
                                {this.props.contacts.filter((c) => {
                                    return c.fav;
                                }).length === 0 && (
                                    <div className="favourite-contact-list">
                                        <Empty
                                            className="empty-contact-list"
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                    </div>
                                )}
                                {this.props.contacts.filter((c) => {
                                    return c.fav;
                                }).length > 0 && (
                                    <div className="favourite-contact-list">
                                        {this.props.contacts
                                            .filter((c) => {
                                                return c.fav;
                                            })
                                            .map((contact) => {
                                                return (
                                                    <Card
                                                        key={contact._id}
                                                        hoverable
                                                        cover={
                                                            <Avatar
                                                                src={
                                                                    contact.profilePic
                                                                }
                                                                referrerPolicy="no-referrer"
                                                                style={{
                                                                    height: 120,
                                                                    width: 120,
                                                                    marginBottom: 10,
                                                                    marginLeft: 60,
                                                                    marginTop: 10,
                                                                }}
                                                            />
                                                        }
                                                        style={{
                                                            width: 240,
                                                            height: 300,
                                                        }}
                                                        bodyStyle={{
                                                            height: 200,
                                                            width: 230,
                                                        }}
                                                    >
                                                        <h3
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                overflowWrap: "break-word",
                                                                whiteSpace: "normal",
                                                            }}
                                                        >
                                                            {`${contact.nameFirst} ${contact.nameLast}`}
                                                        </h3>
                                                        <h4>
                                                            {contact.email}
                                                        </h4>
                                                        <h4>
                                                            {contact.phoneNumber}
                                                        </h4>
                                                    </Card>
                                                );
                                            })}
                                    </div>
                                )}
                                <div className="recent-orders">
                                    <h3>Recent Orders</h3>
                                    <Table
                                        columns={columns}
                                        dataSource={this.filterOrders()
                                            .sort((a, b) => {
                                                return (
                                                    new Date(
                                                        b.order.lastModified
                                                    ) -
                                                    new Date(
                                                        a.order.lastModified
                                                    )
                                                );
                                            })
                                            .map((order) => {
                                                return {
                                                    key: order.order._id,
                                                    orderNumber:
                                                        order.order.orderNumber,
                                                    status: order.order.status,
                                                    timePlaced:
                                                        order.order.timePlaced.slice(
                                                            0,
                                                            10
                                                        ),
                                                    timeDue:
                                                        order.order.timeDue.slice(
                                                            0,
                                                            10
                                                        ),
                                                    totalFee:
                                                        order.order.totalFee,
                                                };
                                            })
                                            .slice(0, 5)}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        orders: state.orders,
    };
};

export default connect(mapStateToProps)(Dashboard);
