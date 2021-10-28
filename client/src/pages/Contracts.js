import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Component } from "react";
import { connect } from "react-redux";
import { List, Button, Divider } from "antd";
import ContractForm from "../components/ContractForm";
import { fetchOrders, updateOrder } from "../redux/Order/order.actions";
import { formatUserReport, createReport } from "../components/Report";
import { getReport } from "../redux/Report/report.actions";

const initialOrder = {
    _id: null,
    timeDue: Date,
    totalFee: 0,
    description: null,
    client: null,
    clientName: null,
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
        this.props.dispatch(getReport(this.state.userId));
    }

    contractFilter = (order) => {
        if (
            order.order.status === "SIGNED" ||
            order.order.status === "AGREED"
        ) {
            return order;
        }
    };

    archivedFilter = (order) => {
        return order.order.status === "ARCHIVED";
    };

    updateOrderHandler = (newItem) => {
        this.setState({ contract: newItem });
        this.props.dispatch(updateOrder(this.state.contract._id, newItem));
        if (
            newItem.status !== "ARCHIVED" &&
            newItem.status !== "SIGNED" &&
            newItem.status !== "AGREED"
        ) {
            this.setState({ contract: initialOrder, showDetails: false });
        }
    };

    generateReport = (contract) => {
        createReport(
            formatUserReport({
                ...this.props.report,
                orders: [contract],
            }),
            `${this.state.userId}-report`
        );
    };

    render() {
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
                                                            client: item.order
                                                                .client,
                                                            clientName:
                                                                item.clientName,
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
                                            description={`Client: ${
                                                item.clientName
                                            }, Due: ${item.order.timeDue.slice(
                                                0,
                                                10
                                            )}`}
                                        />
                                    </List.Item>
                                )}
                            />
                            <br />
                            <span>
                                <Divider orientation="left" plain>
                                    Archived Contracts
                                </Divider>
                            </span>
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.orders.filter(
                                    this.archivedFilter
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
                                                            client: item.order
                                                                .client,
                                                            clientName:
                                                                item.clientName,
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
                                <ContractForm
                                    contract={this.state.contract}
                                    reportAction={this.generateReport}
                                    closeAction={() =>
                                        this.setState({ showDetails: false })
                                    }
                                    updateAction={this.updateOrderHandler}
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
        orders: state.orders,
        report: state.report,
    };
};

export default connect(mapStateToProps)(Contracts);
