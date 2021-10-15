import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Button, Table } from "antd";
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
import { fetchUser } from "../redux/User/user.actions";

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
                title: "Description",
                dataIndex: "description",
                key: "description",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                render: (_, record) => (
                    <>
                        <Button
                            className="general-btn"
                            onClick={() => this.onAccept(record.key)}
                        >
                            Accept
                        </Button>
                        <Button
                            className="general-btn"
                            onClick={() => this.onDecline(record.key)}
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
        this.props.dispatch(fetchUser(this.state.userId));
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
        this.setState({ order: initialOrder });
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
            updateProduct(
                this.getOrderId(this.state.product._id),
                this.state.product._id,
                newItem
            )
        );
    };

    deleteProductHandler = () => {
        this.endRenderExcept();
        this.setState({ product: initialProduct });
        this.props.dispatch(
            deleteProduct(
                this.getOrderId(this.state.product._id),
                this.state.product._id
            )
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
    onSelectChange = (selectedRowKeys) => {
        let x = this.props.orders.filter((order) => {
            return selectedRowKeys.includes(order._id);
        });
        this.setState({ selectedOrders: x });
    };

    // Row button actions
    onOrderDetails = (key) => {
        this.props.orders.forEach((order) => {
            if (key === order._id) {
                this.setState({ order });
                this.endRenderExcept("showDetails");
            }
        });
    };

    onAddItem = (key) => {
        this.props.orders.forEach((order) => {
            if (key === order._id) {
                this.setState({ order });
                this.endRenderExcept("addProduct");
            }
        });
    };

    onProductDetails = (key) => {
        this.props.orders.forEach((order) => {
            order.lineProducts.forEach((product) => {
                if (key === product._id) {
                    this.setState({ product });
                    this.endRenderExcept("showProductDetails");
                }
            });
        });
    };

    onAccept = (key) => {
        this.props.user.authData.receivedOrders.forEach((order) => {
            if (key === order.order) {
                this.props.dispatch(
                    acceptOrder(this.state.userId, order.order)
                );
            }
        });
        this.props.dispatch(fetchUser(this.state.userId));
    };

    onDecline = (key) => {
        this.props.user.authData.receivedOrders.forEach((order) => {
            if (key === order.order) {
                this.props.dispatch(
                    declineOrder(this.state.userId, order.order)
                );
            }
        });
        this.props.dispatch(fetchUser(this.state.userId));
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

    // Get order id from product id
    getOrderId = (productId) => {
        if (!productId) return null;
        let id;
        this.props.orders.forEach((order) => {
            order.lineProducts.forEach((product) => {
                if (product._id === productId) id = order._id;
            });
        });
        return id;
    };

    // Nested table for product
    productRender = (row) => {
        let order = this.props.orders.find((order) => {
            return order._id === row.key;
        });
        let productData = order.lineProducts.map((product) => {
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
                            {this.props.user.authData &&
                                this.props.user.authData.receivedOrders.length >
                                    0 && (
                                    <>
                                        <h3>Received Orders</h3>
                                        <Table
                                            columns={this.receivedOrderColumns}
                                            dataSource={this.props.user.authData.receivedOrders.map(
                                                (order) => {
                                                    return {
                                                        key: order.order,
                                                        orderNumber:
                                                            order.orderNumber,
                                                        user: `${order.nameFirst} ${order.nameLast}`,
                                                        description:
                                                            order.description,
                                                    };
                                                }
                                            )}
                                            pagination={false}
                                            rowSelection={{
                                                selectedRowKeys:
                                                    this.props.selectedRowKeys,
                                                onChange: this.onSelectChange,
                                            }}
                                        />
                                    </>
                                )}

                            <div style={{ height: 40 }}>
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
                                columns={this.orderColumns}
                                expandable={{
                                    expandedRowRender: this.productRender,
                                }}
                                dataSource={this.props.orders.map((order) => {
                                    return {
                                        key: order._id,
                                        orderNumber: order.orderNumber,
                                        client: this.getClientName(
                                            order.client
                                        ),
                                        status: order.status,
                                        timeDue: order.timeDue.slice(0, 10),
                                        totalFee: order.totalFee,
                                    };
                                })}
                                pagination={false}
                                rowSelection={{
                                    selectedRowKeys: this.props.selectedRowKeys,
                                    onChange: this.onSelectChange,
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
        user: state.user,
    };
};

export default connect(mapStateToProps)(Orders);
