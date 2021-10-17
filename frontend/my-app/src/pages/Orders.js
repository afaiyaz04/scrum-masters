import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Button, Table, Collapse } from "antd";
import OrderForm from "../components/OrderForm";
import { connect } from "react-redux";
import {
    createOrder,
    fetchOrders,
    updateOrder,
    deleteOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    transferOrder,
    acceptOrder,
    declineOrder,
} from "../redux/Order/order.actions";

import { fetchContacts } from "../redux/Contact/contact.actions";
import ProductForm from "../components/ProductForm";
import { fetchUsers } from "../redux/Users/users.actions";
import TransferForm from "../components/TransferForm";

const initialOrder = {
    _id: "",
    client: "",
    timeDue: "",
    totalFee: 0,
    status: "CREATED",
    description: "",
    lineProducts: [],
};

const initialProduct = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
};

const { Panel } = Collapse;

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: initialOrder,
            product: initialProduct,
            selectedOrders: [],

            showDetails: false,
            addOrder: false,

            showProductDetails: false,
            addProduct: false,

            transferOrder: false,

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };

        this.renderBool = [
            "showDetails",
            "addOrder",
            "showProductDetails",
            "addProduct",
            "transferOrder",
        ];

        this.orderColumns = [
            {
                title: "Order No.",
                dataIndex: "orderNumber",
                key: "orderNumber",
            },
            { title: "Status", dataIndex: "status", key: "status" },
            { title: "Client", dataIndex: "client", key: "client" },
            { title: "Deadline", dataIndex: "timeDue", key: "timeDue" },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                render: (_, record) => (
                    <>
                        <Button
                            className="general-btn"
                            onClick={() => this.onOrderDetails(record.key)}
                        >
                            Details
                        </Button>
                        <Button
                            className="general-btn"
                            onClick={() => this.onAddItem(record.key)}
                        >
                            Add Item
                        </Button>
                    </>
                ),
            },
        ];

        this.receivedOrderColumns = [
            {
                title: "Order No.",
                dataIndex: "orderNumber",
                key: "orderNumber",
            },
            { title: "From", dataIndex: "user", key: "user" },
            {
                title: "Client",
                dataIndex: "client",
                key: "client",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                render: (_, record) => (
                    <>
                        <Button
                            className="general-btn"
                            onClick={() => this.onAccept([record.key])}
                        >
                            Accept
                        </Button>
                        <Button
                            className="general-btn"
                            onClick={() => this.onDecline([record.key])}
                        >
                            Decline
                        </Button>
                    </>
                ),
            },
        ];

        this.productColumns = [
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Fee", dataIndex: "price", key: "price" },
            { title: "Quantity", dataIndex: "quantity", key: "quantity" },
            {
                title: "Item Actions",
                dataIndex: "productAction",
                key: "productAction",
                render: (_, record) => (
                    <>
                        <Button
                            className="general-btn"
                            onClick={() => this.onProductDetails(record.key)}
                        >
                            Item Details
                        </Button>
                    </>
                ),
            },
        ];
    }

    componentDidMount() {
        this.props.dispatch(fetchOrders(this.state.userId));
        this.props.dispatch(fetchContacts(this.state.userId));
        this.props.dispatch(fetchUsers());
    }

    createOrderHandler = (newItem) => {
        this.endRenderExcept();
        this.props.dispatch(createOrder(this.state.userId, newItem));
    };

    updateOrderHandler = (newItem) => {
        this.endRenderExcept();
        this.setState({ order: newItem });
        this.props.dispatch(updateOrder(this.state.order._id, newItem));
    };

    deleteOrderHandler = (orderId) => {
        this.endRenderExcept();
        this.setState({ order: initialOrder, product: initialProduct });
        this.props.dispatch(deleteOrder(this.state.userId, orderId));
    };

    createProductHandler = (newItem) => {
        this.endRenderExcept();
        this.props.dispatch(addProduct(this.state.order._id, newItem));
    };

    updateProductHandler = (newItem) => {
        this.endRenderExcept();
        this.setState({ product: newItem });
        this.props.dispatch(
            updateProduct(this.state.order._id, this.state.product._id, newItem)
        );
    };

    deleteProductHandler = () => {
        this.endRenderExcept();
        this.setState({ product: initialProduct });
        this.props.dispatch(
            deleteProduct(this.state.order._id, this.state.product._id)
        );
    };

    transferOrderHandler = (toUserId, orderIds) => {
        this.endRenderExcept();
        this.props.dispatch(
            transferOrder(this.state.userId, toUserId, orderIds)
        );
    };

    // Stops rendering for all components unless specified
    endRenderExcept = (selectedComponent) => {
        this.renderBool.forEach((key) => {
            !(selectedComponent === key) && this.setState({ [key]: false });
        });
        this.setState({ [selectedComponent]: true });
    };

    // Selected row action
    onOrderSelectChange = (selectedRowKeys) => {
        let x = this.props.orders.filter((order) => {
            return (
                selectedRowKeys.includes(order.order._id) && !order.isTransfer
            );
        });
        this.setState({ selectedOrders: x });
    };

    // Row button actions
    onOrderDetails = (key) => {
        this.props.orders.forEach((order) => {
            if (key === order.order._id) {
                this.setState({ order: order.order });
                this.endRenderExcept("showDetails");
            }
        });
    };

    onAddItem = (key) => {
        this.props.orders.forEach((order) => {
            if (key === order.order._id) {
                this.setState({ order: order.order, product: initialProduct });
                this.endRenderExcept("addProduct");
            }
        });
    };

    onProductDetails = (key) => {
        this.props.orders.forEach((order) => {
            order.order.lineProducts.forEach((product) => {
                if (key === product._id) {
                    this.setState({ product, order: order.order });
                    this.endRenderExcept("showProductDetails");
                }
            });
        });
    };

    onAccept = (keys) => {
        this.props.dispatch(acceptOrder(this.state.userId, keys));
    };

    onDecline = (keys) => {
        this.props.dispatch(declineOrder(this.state.userId, keys));
    };

    // Get client name from id
    getClientName = (clientId) => {
        if (!clientId) return "";
        let name;
        this.props.contacts.forEach((contact) => {
            if (contact._id === clientId) {
                name = `${contact.nameFirst} ${contact.nameLast}`;
            }
        });
        return name;
    };

    // Nested table for product
    productRender = (row) => {
        let order = this.props.orders.find((order) => {
            return order.order._id === row.key;
        });
        let productData = order.order.lineProducts.map((product) => {
            return {
                key: product._id,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
            };
        });
        return (
            <Table
                columns={this.productColumns}
                dataSource={productData}
                pagination={false}
                rowKey={(record) => record.key}
            />
        );
    };

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="orders">
                    <Header
                        page="Orders"
                        actions={() => {
                            this.setState({ order: initialOrder });
                            this.endRenderExcept("addOrder");
                        }}
                    />
                    <div className="contents">
                        <div className="contents-left">
                            <Collapse bordered={false}>
                                <Panel
                                    header={`Received Orders (${
                                        this.props.orders.filter(
                                            (order) => order.isTransfer
                                        ).length
                                    })`}
                                    key="1"
                                >
                                    <Table
                                        columns={this.receivedOrderColumns}
                                        expandable={{
                                            expandedRowRender: (record) => (
                                                <p style={{ margin: 0 }}>
                                                    {record.description}
                                                </p>
                                            ),
                                        }}
                                        dataSource={this.props.orders
                                            .filter((order) => order.isTransfer)
                                            .map((transfer) => {
                                                return {
                                                    key: transfer.order._id,
                                                    orderNumber:
                                                        transfer.order
                                                            .orderNumber,
                                                    user: transfer.fromUserName,
                                                    client: transfer.clientName,
                                                    description:
                                                        transfer.order
                                                            .description,
                                                };
                                            })}
                                        pagination={false}
                                    />
                                </Panel>
                            </Collapse>

                            <div
                                style={{
                                    height: 40,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                {this.state.selectedOrders.length > 0 && (
                                    // Buttons for selected orders
                                    <>
                                        <Button
                                            className="general-btn"
                                            onClick={() =>
                                                this.endRenderExcept(
                                                    "transferOrder"
                                                )
                                            }
                                        >
                                            Transfer
                                        </Button>
                                    </>
                                )}
                            </div>

                            {/* Order table component */}
                            <Table
                                style={{ paddingTop: 10 }}
                                columns={this.orderColumns}
                                expandable={{
                                    expandedRowRender: this.productRender,
                                }}
                                dataSource={this.props.orders
                                    .filter((order) => !order.isTransfer)
                                    .map((order) => {
                                        return {
                                            key: order.order._id,
                                            orderNumber:
                                                order.order.orderNumber,
                                            client: order.clientName,
                                            status: order.order.status,
                                            timeDue: order.order.timeDue.slice(
                                                0,
                                                10
                                            ),
                                            totalFee: order.order.totalFee,
                                        };
                                    })}
                                pagination={false}
                                rowSelection={{
                                    selectedRowKeys: this.props.selectedRowKeys,
                                    onChange: this.onOrderSelectChange,
                                }}
                            />
                        </div>

                        {/* Right-side conditional rendering */}
                        {(this.state.showDetails || this.state.addOrder) && (
                            <div className="contents-right">
                                <OrderForm
                                    contacts={this.props.contacts}
                                    order={this.state.order}
                                    addOrder={this.state.addOrder}
                                    showOrderDetails={this.state.showDetails}
                                    createOrderAction={this.createOrderHandler}
                                    updateOrderAction={this.updateOrderHandler}
                                    deleteOrderAction={this.deleteOrderHandler}
                                    closeAction={() => this.endRenderExcept()}
                                />
                            </div>
                        )}
                        {(this.state.addProduct ||
                            this.state.showProductDetails) && (
                            <div className="contents-right">
                                <ProductForm
                                    product={this.state.product}
                                    addProduct={this.state.addProduct}
                                    showProductDetails={
                                        this.state.showProductDetails
                                    }
                                    createProductAction={
                                        this.createProductHandler
                                    }
                                    updateProductAction={
                                        this.updateProductHandler
                                    }
                                    deleteProductAction={
                                        this.deleteProductHandler
                                    }
                                    closeAction={() => this.endRenderExcept()}
                                />
                            </div>
                        )}
                        {this.state.transferOrder && (
                            <TransferForm
                                transferOrder={this.state.transferOrder}
                                orders={this.state.selectedOrders}
                                users={this.props.users}
                                userId={this.state.userId}
                                transferAction={this.transferOrderHandler}
                                closeAction={() => this.endRenderExcept()}
                            />
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
        users: state.users,
    };
};

export default connect(mapStateToProps)(Orders);
