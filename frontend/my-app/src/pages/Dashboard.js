import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import ProfileButton from "../components/buttons/ProfileButton";
import { connect } from "react-redux";
import { Timeline, Card, Progress, Table, Empty, Avatar } from "antd";
import { fetchOrders } from "../redux/Order/order.actions";
import "./Dashboard.css";
import { CgProfile } from "react-icons/cg";
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
            orders: this.props.orders.sort((a, b) => {
                return a.timeDue - b.timeDue;
            }),
            ordersCreated: this.props.orders.filter((order) => {
                return order.status === "CREATED";
            }),
            ordersDiscussed: this.props.orders.filter((order) => {
                return order.status === "DISCUSSED";
            }),
            ordersAgreed: this.props.orders.filter((order) => {
                return order.status === "AGREED";
            }),
            ordersSigned: this.props.orders.filter((order) => {
                return order.status === "SIGNED";
            }),

            contacts: this.props.contacts,

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchOrders(this.state.userId));
        this.props.dispatch(fetchContacts(this.state.userId));
    }

    componentDidUpdate() {
        if (
            this.state.orders.length != this.props.orders.length ||
            this.state.contacts.length != this.props.contacts.length
        ) {
            this.setState({
                orders: this.props.orders.sort((a, b) => {
                    return a.timeDue - b.timeDue;
                }),
                ordersCreated: this.props.orders.filter((order) => {
                    return order.status === "CREATED";
                }),
                ordersDiscussed: this.props.orders.filter((order) => {
                    return order.status === "DISCUSSED";
                }),
                ordersAgreed: this.props.orders.filter((order) => {
                    return order.status === "AGREED";
                }),
                ordersSigned: this.props.orders.filter((order) => {
                    return order.status === "SIGNED";
                }),

                contacts: this.props.contacts,
            });
        }
    }

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
                                (this.state.ordersCreated.length * 100) /
                                this.state.orders.length
                            }
                            format={() =>
                                `${this.state.ordersCreated.length} Orders Created`
                            }
                            strokeColor="#ff4d4f"
                        />
                        <Progress
                            percent={
                                (this.state.ordersDiscussed.length * 100) /
                                this.state.orders.length
                            }
                            format={() =>
                                `${this.state.ordersDiscussed.length} Orders Discussed`
                            }
                            strokeColor="orange"
                        />
                        <Progress
                            percent={
                                (this.state.ordersAgreed.length * 100) /
                                this.state.orders.length
                            }
                            format={() =>
                                `${this.state.ordersAgreed.length} Orders Agreed`
                            }
                            strokeColor="#1890ff"
                        />
                        <Progress
                            percent={
                                (this.state.ordersSigned.length * 100) /
                                this.state.orders.length
                            }
                            format={() =>
                                `${this.state.ordersSigned.length} Orders Signed`
                            }
                            strokeColor="#52c418"
                        />
                    </div>
                    <div className="contents">
                        <div className="dashboard-left">
                            <h3>Timeline</h3>
                            <Timeline>
                                <Timeline.Item color="white" />
                                {this.state.orders.map((order) => {
                                    switch (order.status) {
                                        case "CREATED":
                                            return (
                                                <Timeline.Item
                                                    key={order._id}
                                                    color="red"
                                                >
                                                    Order {order.orderNumber},
                                                    due:{" "}
                                                    {order.timeDue.slice(0, 10)}
                                                </Timeline.Item>
                                            );
                                        case "DISCUSSED":
                                            return (
                                                <Timeline.Item
                                                    key={order._id}
                                                    color="orange"
                                                >
                                                    Order {order.orderNumber}{" "}
                                                    {order.timeDue.slice(0, 10)}
                                                </Timeline.Item>
                                            );
                                        case "AGREED":
                                            return (
                                                <Timeline.Item
                                                    key={order._id}
                                                    color="blue"
                                                >
                                                    Order {order.orderNumber}
                                                    {order.timeDue.slice(0, 10)}
                                                </Timeline.Item>
                                            );
                                        case "SIGNED":
                                            return (
                                                <Timeline.Item
                                                    key={order._id}
                                                    color="green"
                                                >
                                                    Order {order.orderNumber}{" "}
                                                    {order.timeDue.slice(0, 10)}
                                                </Timeline.Item>
                                            );
                                    }
                                })}
                            </Timeline>
                        </div>
                        <div className="dashboard-right">
                            <div className="favourite-contacts">
                                <h3>Favourite Contacts</h3>
                                {this.props.contacts.filter((c) => {
                                    if (c.fav) return c;
                                }).length === 0 && (
                                    <Empty
                                        className="empty-contact-list"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                )}
                                {this.props.contacts.filter((c) => {
                                    if (c.fav) return c;
                                }).length > 0 && (
                                    <div className="favourite-contact-list">
                                        {this.state.contacts
                                            .filter((c) => {
                                                if (c.fav) return c;
                                            })
                                            .map((contact) => {
                                                return (
                                                    <Card
                                                        key={contact._id}
                                                        hoverable
                                                        cover={
                                                            <Avatar
                                                            
                                                                src={contact.profilePic}
                                                                referrerPolicy="no-referrer"
                                                                style = {{height:120, width:120, marginBottom:10, marginLeft:60, marginTop:10}}
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
                                                            }}
                                                        >{`${contact.nameFirst} ${contact.nameLast}`}</h3>
                                                        <h4>{contact.email}</h4>
                                                        <h4>
                                                            {
                                                                contact.phoneNumber
                                                            }
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
                                        dataSource={this.state.orders
                                            .sort((a, b) => {
                                                if (
                                                    a.lastModified >
                                                    b.lastModified
                                                ) {
                                                    return -1;
                                                } else {
                                                    return 1;
                                                }
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
