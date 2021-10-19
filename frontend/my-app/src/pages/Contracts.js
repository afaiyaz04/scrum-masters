import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Component } from "react";
import { connect } from "react-redux";
import { List, Button } from "antd";
import ContractDetails from "../components/ContractDetails";
import { fetchOrders, updateOrder } from "../redux/Order/order.actions";

const initialOrder = {
    _id: null,
    timeDue: Date,
    totalFee: 0,
    description: null,
    client: null,
    status: null,
    lineProducts: [],
    orderNumber: null,
};

class Contracts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: initialOrder,
            products: [],

            showDetails: false,

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchOrders(this.state.userId));
    }

    contractFilter = (order) => {
        if (
            order.order.status === "SIGNED" ||
            order.order.status === "AGREED"
        ) {
            return order;
        }
    };

    updateOrderHandler = (newItem) => {
        this.setState({ contract: newItem });
        this.props.dispatch(updateOrder(this.state.contract._id, newItem));
    };

    render() {
        console.log(this.state.contract);
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="orders">
                    <Header page="Contracts" />
                    <div className="contents">
                        <div className="contents-left">
                            <span></span>
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.orders.filter(
                                    this.contractFilter
                                )}
                                renderItem={(item) => (
                                    <List.Item
                                        className="order-item"
                                        key={item.id}
                                        actions={[
                                            <Button
                                                className="general-btn"
                                                onClick={() => {
                                                    this.setState({
                                                        showDetails: true,
                                                        contract: {
                                                            _id: item.order._id,
                                                            client: item.client,
                                                            timeDue:
                                                                item.order
                                                                    .timeDue,
                                                            totalFee:
                                                                item.order
                                                                    .totalFee,
                                                            description:
                                                                item.order
                                                                    .description,
                                                            status: item.order
                                                                .status,
                                                            lineProducts:
                                                                item.order
                                                                    .lineProducts,
                                                            orderNumber:
                                                                item.order
                                                                    .orderNumber,
                                                        },
                                                    });
                                                }}
                                            >
                                                Details
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={`Contract No. ${item.order.orderNumber}`}
                                            description={item.order.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                        {this.state.showDetails && (
                            <div className="contents-right">
                                <ContractDetails
                                    contract={this.state.contract}
                                    contacts={this.props.contacts}
                                    closeAction={() =>
                                        this.setState({ showDetails: false })
                                    }
                                    updateAction={this.updateOrderHandler}
                                ></ContractDetails>
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
        orders: state.orders,
        contacts: state.contacts,
    };
};

export default connect(mapStateToProps)(Contracts);
