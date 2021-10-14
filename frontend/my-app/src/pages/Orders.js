import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Button, Transfer, Form } from "antd";
import "antd/dist/antd.css";
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
} from "../redux/Order/order.actions";

import { fetchContacts } from "../redux/Contact/contact.actions";
import ProductForm from "../components/ProductForm";

import { Table, Select } from 'antd';
import { fetchUsers } from "../redux/Users/users.actions";

const initialOrder = {
  _id: '',
  client: '',
  timeDue: '',
  totalFee: 0,
  status: 'CREATED',
  description: '',
  lineProducts: [],
}

const initialProduct = {
  id: "",
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

      addProduct: false,

      transferOrder: false,
      destination: null,

      userId: JSON.parse(localStorage.getItem("userData"))._id,
    };

    this.renderBool = [
      'showDetails',
      'addOrder',
      'addProduct',
      'transferOrder',
    ]

    this.orderColumns = [
      { title: 'Order No.', dataIndex: 'orderNumber', key: 'orderNumber' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Client', dataIndex: 'client', key: 'client' },
      { title: 'Deadline', dataIndex: 'timeDue', key: 'timeDue' },
      { title: 'Actions', dataIndex: 'action', key: 'action', render: (_, record) => 
        <>
          <Button style={{ paddingLeft: 2, textAlign: "center", width: 100 }} onClick={() => this.onOrderDetails(record.key)}>Details</Button>
          <Button style={{ paddingLeft: 2, textAlign: "center", width: 100 }} onClick={() => this.onAddItem(record.key)}>Add Item</Button>
        </>
      },
    ]

    this.productColumns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Fee', dataIndex: 'price', key: 'price' },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    ]
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
  }

  deleteOrderHandler = (orderId) => {
    this.endRenderExcept();
    this.setState({ order: initialOrder });
    this.props.dispatch(deleteOrder(this.state.userId, orderId));
  }

  createProductHandler = (newItem) => {
    this.endRenderExcept();
    this.props.dispatch(addProduct(this.state.order._id, newItem));
    
  };

  updateProductHandler = (newItem) => {
    this.endRenderExcept();
    this.setState({ product: newItem });
    this.props.dispatch(updateOrder(this.state.order._id, newItem));

  }

  deleteProductHandler = (orderId) => {
    this.endRenderExcept();
    this.setState({ product: initialProduct });
    this.props.dispatch(deleteOrder(this.state.userId, orderId));

  }

  // Stops rendering for all components unless specified
  endRenderExcept = (selectedComponent) => {
    this.renderBool.forEach(key => { !(selectedComponent === key) && this.setState({ [key]: false }) });
    this.setState({ [selectedComponent]: true });
  }

  // Selected row action
  onSelectChange = (selectedRowKeys) => {
    let x = this.props.orders.filter(order => {
      return (selectedRowKeys.includes(order._id));
    });
    this.setState({ selectedOrders: x });
  }

  // Row button actions
  onOrderDetails = (key) => {
    this.props.orders.forEach(order => {
      if (key === order._id)  {
        this.setState({ order });
        this.endRenderExcept('showDetails');
      };
    });
  }

  onAddItem = (key) => {
    this.props.orders.forEach(order => {
      if (key === order._id) {
        this.setState({ order });
        this.endRenderExcept('addProduct');
      };
    });
  }

  // Get client name from id
  getClientName = (clientId) => {
    if (!clientId) return '';
    let name;
    Object.keys(this.props.contacts).forEach(contact => {
      if (this.props.contacts[contact]._id === clientId) {
        name = `${this.props.contacts[contact].nameFirst} ${this.props.contacts[contact].nameLast}`
      }
    });
    return name;
  }

  // Nested table for product
  productRender = (row) => {
    let order = this.props.orders.find((order) => {
      return order._id === row.key;
    });
    return <Table columns={this.productColumns} dataSource={order.lineProducts} pagination={false} />
  }

  render() {
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="orders">
          <Header
            page="Orders"
            actions={() => {this.setState({ order: initialOrder }); this.endRenderExcept('addOrder')}}
          />
          <div className="contents">
            <div className="contents-left">
              <div style={{ height: 40 }}>
                {
                  (this.state.selectedOrders.length > 0) &&
                  // Buttons for selected orders
                  <>
                    <Button
                      style={{ paddingLeft: 2, textAlign: "center", width: 100 }}
                      onClick={() => this.endRenderExcept('transferOrder')}
                    >
                      Transfer
                    </Button>
                  </>
                }
              </div>

              {/* Order table component */}
              <Table
                columns={this.orderColumns}
                expandable={{ 
                  expandedRowRender: this.productRender
                }}
                dataSource={
                  this.props.orders.map((order) => {
                    return {
                      key: order._id,
                      orderNumber: order.orderNumber,
                      client: this.getClientName(order.client),
                      status: order.status,
                      timeDue: order.timeDue.slice(0,10),
                      totalFee: order.totalFee,
                    }
                  })
                }
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
                  closeAction={() =>
                    this.setState({ addOrder: false, showDetails: false })
                  }
                />
              </div>
            )}
            {
              (this.state.addProduct) &&
              <div className="contents-right">
                <ProductForm
                  order={this.state.order}
                  product={this.state.product}

                  createProductAction={this.createProductHandler}
                  updateProductAction={this.updateProductHandler}
                  deleteProductAction={this.deleteProductHandler}
                  closeAction={() =>
                    this.setState({ addProduct: false })
                  }
                />
              </div>
            }
            {
              (this.state.transferOrder) &&
              <div className="contents-right">
                <Form>
                  <Button
                    style={{ paddingLeft: 2, textAlign: "center" }}
                    onClick={() => { this.setState({ transferOrder: false })}}
                  >
                    Close
                  </Button>
                  <Select
                    showArrow={false}
                    style={{ width: "100%" }}
                    onChange={(value) => {this.setState({ destination: value })}}
                  >
                    {
                      Object.keys(this.props.users).map((i) => {
                        if (this.props.users[i]._id !== this.state.userId) {
                          return <Select.Option value={this.props.users[i]._id}>{`${this.props.users[i].nameFirst} ${this.props.users[i].nameLast}`}</Select.Option>
                        }
                      })
                    }
                  </Select>
                  {
                    this.state.destination &&
                    <Transfer
                      dataSource={
                        this.props.orders.map((order) => {
                          return {
                            key: order._id,
                            orderNumber: order.orderNumber,
                            client: order.client,
                            status: order.status,
                            timeDue: order.timeDue,
                            totalFee: order.totalFee,
                          }
                        })
                      }
                      titles={['Source', 'Destination']}
                    />
                  }
                </Form>
              </div>
            }
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
