import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import ProfileButton from "../components/buttons/ProfileButton";
import { connect } from "react-redux";
import { Timeline, Card, Progress, Table, Empty, Avatar } from "antd";
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
            userId: JSON.parse(localStorage.getItem("userData"))._id,
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
                    <Timeline.Item
                        key={order.order._id}
                        color="red"
                    >
                        Order {order.order.orderNumber},
                        due:{" "}
                        {order.order.timeDue.slice(0, 10)}
                    </Timeline.Item>
                );
            case "DISCUSSED":
                return (
                    <Timeline.Item
                        key={order.order._id}
                        color="orange"
                    >
                        Order {order.order.orderNumber},
                        due:{" "}
                        {order.order.timeDue.slice(0, 10)}
                    </Timeline.Item>
                );
            case "AGREED":
                return (
                    <Timeline.Item
                        key={order.order._id}
                        color="blue"
                    >
                        Order {order.order.orderNumber},
                        due:{" "}
                        {order.order.timeDue.slice(0, 10)}
                    </Timeline.Item>
                );
            case "SIGNED":
                return (
                    <Timeline.Item
                        key={order.order._id}
                        color="green"
                    >
                        Order {order.order.orderNumber},
                        due:{" "}
                        {order.order.timeDue.slice(0, 10)}
                    </Timeline.Item>
                );
            default:
                return
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
                                (this.props.orders.filter((order) => { return order.order.status === "CREATED" }).length * 100) / this.props.orders.length
                            }
                            format={() =>
                                `${this.props.orders.filter((order) => { return order.order.status === "CREATED" }).length} Orders Created`
                            }
                            strokeColor="#ff4d4f"
                        />
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => { return order.order.status === "DISCUSSED" }).length * 100) / this.props.orders.length
                            }
                            format={() =>
                                `${this.props.orders.filter((order) => { return order.order.status === "DISCUSSED" }).length} Orders Discussed`
                            }
                            strokeColor="orange"
                        />
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => { return order.order.status === "AGREED" }).length * 100) / this.props.orders.length
                            }
                            format={() =>
                                `${this.props.orders.filter((order) => { return order.order.status === "AGREED" }).length} Orders Agreed`
                            }
                            strokeColor="#1890ff"
                        />
                        <Progress
                            percent={
                                (this.props.orders.filter((order) => { return order.order.status === "SIGNED" }).length * 100) / this.props.orders.length
                            }
                            format={() =>
                                `${this.props.orders.filter((order) => { return order.order.status === "SIGNED" }).length} Orders Signed`
                            }
                            strokeColor="#52c418"
                        />
                    </div>
                    <div className="contents">
                        <div className="dashboard-left">
                            <h3>Timeline</h3>
                            <Timeline>
                                <Timeline.Item color="white" />
                                {this.props.orders.sort((a,b) => {return new Date(a.order.timeDue) - new Date(b.order.timeDue)}).map((order) => { return this.timelineOrders(order) })}
                            </Timeline>
                        </div>
                        <div className="dashboard-right">
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
                                {console.log(this.props.contacts)}
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
                                        dataSource={this.props.orders.sort((a,b) => {return new Date(a.order.lastModified) - new Date(b.order.lastModified)}).map(order => {return { key: order.order._id, orderNumber: order.order.orderNumber, status: order.order.status, timePlaced: order.order.timePlaced.slice(0,10), timeDue: order.order.timeDue.slice(0,10), totalFee: order.order.totalFee }}).slice(0, 5)}
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
