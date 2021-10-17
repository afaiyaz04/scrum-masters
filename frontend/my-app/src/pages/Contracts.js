import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Component } from "react";
import { connect } from "react-redux";
import { List, Button } from "antd";
import ContractDetails from "../components/ContractDetails";
import {
    createOrder,
    fetchOrders,
    updateOrder,
    deleteOrder,
} from "../redux/Order/order.actions";
import ContractForm from "../components/ContractForm";

const initialOrder = {
    id: null,
    timeDue: Date,
    totalFee: 0,
    description: "",
    client: "",
    status: "CREATED",
    lineProducts: [],
    orderNumber: "",
    timePlaced: Date,
    lastModified: Date,
};

class Contracts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: initialOrder,
            products: [],

            showDetails: false,
            addContract: false,
            contract_added: "",

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchOrders(this.state.userId));
    }

    contractFilter = (order) => {
        if (order.status === "SIGNED" || order.status === "AGREED") {
            return order;
        }
    };

    ordersNotContracts = (order) => {
        if (order.status !== "SIGNED" && order.status !== "AGREED") {
            return order;
        }
    };
    descriptionLimit = (description) => {
        if (description.length > 50) {
            return `${description.slice(0, 50)}...`;
        } else {
            return description;
        }
    };

    updateOrderHandler = (newItem) => {
        this.setState({ showDetails: false });
        console.log("THE CONTRACR IS HGEREE");
        newItem.status = "SIGNED";
        console.log(newItem.status);
        this.props.dispatch(updateOrder(this.state.contract.id, newItem));
    };

    render() {
        console.log(this.state.contract);
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="orders">
                    <Header
                        page="Contracts"
                        actions={() => {
                            this.setState({
                                addContract: true,
                                showDetails: false,
                            });
                        }}
                    />
                    <div className="contents">
                        <div className="contents-left">
                            <span>Name</span>
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
                                                type="dashed"
                                                style={{
                                                    paddingLeft: 2,
                                                    textAlign: "center",
                                                }}
                                                block
                                                onClick={() => {
                                                    // this.props.dispatch(fetchProducts(item._id));
                                                    this.setState({
                                                        showDetails: true,
                                                        addContract: false,
                                                        contract: {
                                                            id: item._id,
                                                            client: item.client,
                                                            timeDue:
                                                                item.timeDue,
                                                            totalFee:
                                                                item.totalFee,
                                                            description:
                                                                item.description,
                                                            status: item.status,
                                                            lineProducts:
                                                                item.lineProducts,
                                                            orderNumber:
                                                                item.orderNumber,
                                                            timePlaced:
                                                                item.timePlaced,
                                                            lastModified:
                                                                item.lastModified,
                                                        },
                                                    });
                                                }}
                                            >
                                                Details
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={`Contract No. ${item.orderNumber}`}
                                            description={this.descriptionLimit(
                                                item.description
                                            )}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                        {this.state.showDetails && (
                            <div className="contents-right">
                                <ContractDetails
                                    contract={this.state.contract}
                                    closeAction={() =>
                                        this.setState({ showDetails: false })
                                    }
                                    updateAction={this.updateOrderHandler}
                                ></ContractDetails>
                            </div>
                        )}
                        {this.state.addContract && (
                            <div className="contents-right">
                                <ContractForm
                                    orders={this.props.orders.filter(
                                        this.ordersNotContracts
                                    )}
                                    addFunction={(contract) =>
                                        this.setState({
                                            contract_added: contract,
                                        })
                                    }
                                ></ContractForm>
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
