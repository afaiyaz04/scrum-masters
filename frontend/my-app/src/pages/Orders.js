import { Button, Collapse, Modal, Table, Tag } from "antd";
import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import LogForm from "../components/LogForm";
import OrderForm from "../components/OrderForm";
import ProductForm from "../components/ProductForm";
import Sidebar from "../components/sideBar/Sidebar";
import TransferForm from "../components/TransferForm";
import { fetchContacts } from "../redux/Contact/contact.actions";
import {
    acceptOrder,
    addLog,
    addProduct,
    addTransferClient,
    createOrder,
    declineOrder,
    deleteOrder,
    deleteProduct,
    fetchOrders,
    transferOrder,
    updateOrder,
    updateProduct,
} from "../redux/Order/order.actions";
import { fetchUsers } from "../redux/Users/users.actions";
import { Document, Packer, Paragraph, TextRun, Header as H, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { generateReport } from "../redux/Report/report.actions";


const initialOrder = {
    _id: null,
    client: null,
    timeDue: null,
    totalFee: 0,
    status: "CREATED",
    description: null,
    lineProducts: [],
    log: [],
};

const initialProduct = {
    _id: null,
    name: null,
    description: null,
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

            showLog: false,

            transferOrder: false,
            addTransferClient: false,
            transferOrderId: null,
            transferClientName: null,
            transferClientId: null,

            userId: JSON.parse(localStorage.getItem("userData"))._id,
        };

        this.renderBool = [
            "showDetails",
            "addOrder",
            "showProductDetails",
            "addProduct",
            "showLog",
            "transferOrder",
            "addTransferClient",
        ];

        this.orderColumns = [
            {
                title: "Order No.",
                dataIndex: "orderNumber",
                key: "orderNumber",
                width: "10%",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                width: "10%",
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
            { title: "Client", dataIndex: "client", key: "client" },
            {
                title: "Deadline",
                dataIndex: "timeDue",
                key: "timeDue",
                width: "15%",
            },
            {
                title: () => {
                    return (
                        <Button
                            className="general-btn"
                            onClick={() => {
                                this.setState({ order: initialOrder });
                                this.endRenderExcept("addOrder");
                            }}
                        >
                            New Order
                        </Button>
                    );
                },
                dataIndex: "action",
                key: "action",
                width: "20%",
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
                            onClick={() => this.onLog(record.key)}
                        >
                            Log
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
                width: "10%",
            },
            { title: "From", dataIndex: "user", key: "user", width: "40%" },
            {
                title: "Client",
                dataIndex: "client",
                key: "client",
                width: "40%",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "20%",
                render: (_, record) => (
                    <>
                        <Button
                            className="general-btn"
                            onClick={() =>
                                this.onAccept(
                                    record.key,
                                    record.client,
                                    record.clientId
                                )
                            }
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
            { title: "Price", dataIndex: "price", key: "price", width: "20%" },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                width: "20%",
            },
            {
                title: "Item Actions",
                dataIndex: "productAction",
                key: "productAction",
                width: "20%",
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
        this.props.dispatch(generateReport(this.state.userId));
    }

    createOrderHandler = (newItem) => {
        this.endRenderExcept();
        this.props.dispatch(createOrder(this.state.userId, newItem));
    };

    updateOrderHandler = (newItem) => {
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
        this.setState({ selectedOrders: [] });
        this.props.dispatch(
            transferOrder(this.state.userId, toUserId, orderIds)
        );
    };

    addLogHandler = (text) => {
        this.props.dispatch(
            addLog(this.state.userId, this.state.order._id, text)
        );
    };

    addTransferClientHandler = () => {
        this.endRenderExcept();
        this.props.dispatch(
            addTransferClient(
                this.state.userId,
                this.state.transferClientId,
                this.state.transferOrderId
            )
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

    onAccept = (key, clientName, clientId) => {
        this.props.dispatch(acceptOrder(this.state.userId, key));
        this.setState({
            addTransferClient: true,
            transferOrderId: key,
            transferClientName: clientName,
            transferClientId: clientId,
        });
    };

    onDecline = (key) => {
        this.props.dispatch(declineOrder(this.state.userId, key));
    };

    onLog = (key) => {
        this.props.orders.forEach((order) => {
            if (key === order.order._id) {
                this.setState({ order: order.order });
                this.endRenderExcept("showLog");
            }
        });
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

    filterContract = (order) => {
        return (
            order.order.status !== "ARCHIVED" &&
            order.order.status !== "SIGNED" &&
            order.order.status !== "AGREED"
        );
    };



    generateReport = () => {
        // Get information
        const {
            name, 
            orderStatus, 
            totalClients, 
            totalOrders, 
            totalRevenue 
        } = this.props.report;
        const date = new Date();

        const zeroPad = (num) => String(num).padStart(2, '0')
        // Format
        const dateTime = new TextRun({
            text: `Generated: ${zeroPad(date.getDate())}/${zeroPad(date.getMonth()+1)}/${date.getFullYear()} @ ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`,
            font: "Calibri",
            allCaps: true,
        });
        const nameFormat = new TextRun({
            text: `${name} - Report`,
            bold: true,
            font: "Calibri",
            size: 40,
        });
        const orderStatusFormat = Object.entries(orderStatus).map(([k, v]) => {
            return (
                new Paragraph({
                    bullet: { level: 0 },
                    children: [
                        new TextRun({
                            text: `${v} - ${k.toLowerCase()}`,
                            font: "Calibri"
                        })
                    ]
                })
            )
        });
        const totalOrdersFormat = new TextRun({
            text: `Total Orders = ${totalOrders}`,
            font: "Calibri",
        });

        const totalClientsFormat = new TextRun({
            text: `Number of clients = ${totalClients}`,
            font: "Calibri",
        });

        const totalRevenueFormat = new TextRun({
            text: `Total revenue = $${totalRevenue}`,
            font: "Calibri",
            underline: true
        });


        // Make into doc
        const doc = new Document({
            sections: [{
                headers: {
                    default: new H({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [dateTime]
                            })
                        ]
                    })
                },
                properties: {},
                children: [
                    // Title
                    new Paragraph({
                        children: [nameFormat]
                    }),

                    // Orders
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Orders",
                                font: "Calibri",
                                size: 24,
                                bold: true
                            })
                        ],
                        spacing: { before: 200 }
                    }),
                    ...orderStatusFormat,
                    new Paragraph({
                        children: [totalOrdersFormat]
                    }),

                    // Clients and Revenue
                    new Paragraph ({
                        children: [
                            new TextRun({
                                text: "Clients and Revenue",
                                font: "Calibri",
                                size: 24,
                                bold: true
                            })
                        ],
                        spacing: { before: 200 }
                    }),
                    new Paragraph ({
                        children: [totalClientsFormat]
                    }),
                    new Paragraph ({
                        children: [totalRevenueFormat]
                    })
                ],
            }],
        });
        // Save the document
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `Report for ${name}`);
        });
      }

    render() {
        return (
            <div className="Master-div">
                <Sidebar />
                <div className="orders">
                    <Header page="Orders" />
                    <div className="contents">
                        <div className="contents-left">
                            <Button
                                type="primary"
                                style={{marginBottom: 25, width: 500}}
                                onClick= {() => this.generateReport("Report for user")}
                                >
                                    Generate Report
                            </Button>
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
                                                <>
                                                    <p style={{ margin: 0 }}>
                                                        {`Status: ${
                                                            record.status
                                                        }, Deadline: ${record.timeDue.slice(
                                                            0,
                                                            10
                                                        )}, Total Fee: ${
                                                            record.totalFee
                                                        }`}
                                                    </p>
                                                    <p style={{ margin: 0 }}>
                                                        {record.description}
                                                    </p>
                                                    <br />
                                                    <p style={{ margin: 0 }}>
                                                        Products:
                                                    </p>
                                                    <br />
                                                    {record.lineProducts.map(
                                                        (product) => {
                                                            return (
                                                                <>
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                        }}
                                                                    >
                                                                        {`Item: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                        }}
                                                                    >
                                                                        {
                                                                            product.description
                                                                        }
                                                                    </p>
                                                                    <br />
                                                                </>
                                                            );
                                                        }
                                                    )}
                                                </>
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
                                                    clientId: transfer.clientId,
                                                    description:
                                                        transfer.order
                                                            .description,
                                                    totalFee:
                                                        transfer.order.totalFee,
                                                    timeDue:
                                                        transfer.order.timeDue,
                                                    status: transfer.order
                                                        .status,
                                                    lineProducts:
                                                        transfer.order
                                                            .lineProducts,
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
                                    .filter((order) => {
                                        return (
                                            !order.isTransfer &&
                                            this.filterContract(order)
                                        );
                                    })
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
                                transferClientAction={
                                    this.addTransferClientHandler
                                }
                                closeAction={() => this.endRenderExcept()}
                            />
                        )}
                        {this.state.showLog && (
                            <div className="contents-right">
                                <LogForm
                                    order={this.state.order}
                                    orders={this.props.orders}
                                    addLogAction={this.addLogHandler}
                                    closeAction={() => this.endRenderExcept()}
                                />
                            </div>
                        )}
                    </div>
                    <Modal
                        visible={this.state.addTransferClient}
                        onCancel={() => this.endRenderExcept()}
                        footer={null}
                        destroyOnClose={true}
                        style={{ width: "100%" }}
                    >
                        <h3 style={{ textAlign: "center" }}>
                            {`Do you want to add ${this.state.transferClientName} to your contacts?`}
                        </h3>
                        <br />
                        <Button
                            type="primary"
                            block
                            onClick={() => this.addTransferClientHandler()}
                            style={{ textAlign: "center" }}
                        >
                            Confirm
                        </Button>
                        <Button
                            block
                            onClick={() => this.endRenderExcept()}
                            style={{ textAlign: "center" }}
                        >
                            Cancel
                        </Button>
                    </Modal>
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
        report: state.report,
    };
};

export default connect(mapStateToProps)(Orders);
