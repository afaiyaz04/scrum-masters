import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button, Descriptions, Transfer, Form } from "antd";
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

//** FUNCTIONS *//
//
// ORDER:
// this.props.dispatch(createOrder(userId, formData))
// this.props.dispatch(fetchOrders(userId))
// this.props.dispatch(updateOrder(orderId, formData))
// this.props.dispatch(deleteOrder(userId, orderId))
//
// PRODUCT:
// this.props.dispatch(createProduct(orderId, formData, quantity))
// this.props.dispatch(fetchProducts(orderId))
// this.props.dispatch(updateProduct(orderId, productId, formData, quantity))
// this.props.dispatch(deleteProduct(orderId, productId))
//
// CONTACT:
// this.props.dispatch(fetchContacts(userId))
//
// call
//  this.props.dispatch(fetchOrders(userId))
//  this.props.dispatch(fetchProducts(orderId))
//  this.props.dispatch(fetchContacts(userId))
// when an update is needed.
//
// to access data, call:
//  this.props.contacts
//  this.props.orders
//  this.props.products

const productColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Fee', dataIndex: 'price', key: 'price' },
  { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
]

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

    this.orderColumns = [
      { title: 'Order No.', dataIndex: 'orderNumber', key: 'orderNumber' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Client', dataIndex: 'client', key: 'client' },
      { title: 'Deadline', dataIndex: 'timeDue', key: 'timeDue' },
      { title: 'Total Fee', dataIndex: 'totalFee', key: 'totalFee' },
      { title: '', dataIndex: 'x', key: 'x', render: (_, record) => <Button onClick={() => this.onOrderDetails(record.key)}>Details</Button>},
      { title: '', dataIndex: 'y', key: 'y', render: (_, record) => <Button onClick={() => this.onAddItem(record.key)}>Add Item</Button>},
    ]
  }

  componentDidMount() {
    this.props.dispatch(fetchOrders(this.state.userId));
    this.props.dispatch(fetchContacts(this.state.userId));
    this.props.dispatch(fetchUsers());
  }

  createOrderHandler = (newItem) => {
    this.setState({ addOrder: false });
    this.props.dispatch(createOrder(this.state.userId, newItem));
  };

  updateOrderHandler = (newItem) => {
    this.setState({ showDetails: false, order: newItem });
    this.props.dispatch(updateOrder(this.state.order._id, newItem));
  }

  deleteOrderHandler = (orderId) => {
    this.setState({ showDetails: false });
    this.props.dispatch(deleteOrder(this.state.userId, orderId));
  }

  createProductHandler = (newItem) => {
    this.setState({ addProduct: false });
    this.props.dispatch(addProduct(this.state.order._id, newItem));
    
  };

  updateProductHandler = (newItem) => {
    this.setState({ showDetails: false });
    this.props.dispatch(updateOrder(this.state.order._id, newItem));

  }

  deleteProductHandler = (orderId) => {
    this.setState({ showDetails: false });
    this.props.dispatch(deleteOrder(this.state.userId, orderId));

  }

  expandedRow = (row) => {
    let nestedTable = this.props.orders.map((order) => {
      let x = order.lineProducts.map((product) => {
        return {
          key: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        }
      });
      return x;
    })[row.key];
    return <Table columns={productColumns} dataSource={nestedTable} pagination={false} />
  }

  onSelectChange = (selectedRowKeys) => {
    let x = this.props.orders.filter(order => {
      if (selectedRowKeys.includes(order._id)) return order;
    });
    this.setState({ selectedOrders: x });
  }

  onOrderDetails = (key) => {
    this.props.orders.filter(order => {
      if (key === order._id) return this.setState({ order, showDetails: true });
    });
  }

  onAddItem = (key) => {
    this.props.orders.filter(order => {
      if (key === order._id) return this.setState({ order, addProduct: true });
    });
  }

  render() {
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="orders">
          <Header
            page="Orders"
            actions={() => {this.setState({ addOrder: true, order: initialOrder })}}
          />
          <div className="contents">
            <div className="contents-left" style={{ width: "60%" }}>
              <Button
                style={{ paddingLeft: 2, textAlign: "center" }}
                onClick={() => { this.setState({ transferOrder: true })}}
              >
                Transfer
              </Button>
              <Table
                columns={this.orderColumns}
                expandable={{ 
                  expandedRowRender: row => {
                    let result = this.props.orders.map((order) => {
                      if (order._id === row.key) {
                        return order.lineProducts.map((product) => {
                          return {
                            key: product._id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                          }
                        });
                      }
                    });
                    let nestedTable = result.filter((arr) => { if (arr) return arr})[0];
                    return <Table columns={productColumns} dataSource={nestedTable} pagination={false} />
                  }
                }}
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
                pagination={false}
                rowSelection={{
                  selectedRowKeys: this.props.selectedRowKeys,
                  onChange: this.onSelectChange,
                }}
              />
            </div>
            {(this.state.showDetails || this.state.addOrder) && (
              <div className="contents-right">
                <OrderForm
                  contacts={this.props.contacts}
                  order={this.state.order}
                  // Boolean values to check if component should have features on/off
                  addOrder={this.state.addOrder}
                  showOrderDetails={this.state.showDetails}
                  // Button handlers
                  createOrderAction={this.createOrderHandler}
                  updateOrderAction={this.updateOrderHandler}
                  deleteOrderAction={this.deleteOrderHandler}
                  // Closes form
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

// import React from "react";
// import Sidebar from "../components/sideBar/Sidebar";
// import Header from "../components/Header";
// import axios from "axios";
// import { API, USER, ORDERS } from "./urlConfig";
// import { List, Card, Button } from "antd";
// import "antd/dist/antd.css";
// import { connect } from "react-redux";
// import { mapStateToProps } from "../redux/reduxConfig";
// import ClientCard from "../components/ClientCard";
// import AddOrderForm from "../components/AddOrderForm";

// class Orders extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       orders: [],
//       client: "",

//       showDetails: false,
//       editDetails: false,
//       addOrder: false,

//       id: "",
//       client: "",
//       lineProducts: "",
//       timePlaced: "",
//       timeDue: "",
//       totalFee: "",
//       status: "",
//       description: "",
//       log: "",

//       userId: JSON.parse(localStorage.getItem('userData'))._id
//     };
//   }

//   componentDidMount() {
//     const endpoint = API + USER + this.state.userId + ORDERS;
//     axios.get(endpoint).then((res) => {
//       console.log(res);
//       this.setState({ orders: res.data });
//     });
//   }

//   activateAdd = () => {
//     this.setState({ addOrder: true });
//   };

//   deactivateAdd = () => {
//     this.setState({ addOrder: false });
//   };

//   createHandler = (newItem) => {
//     const path = API + '/order';
//     const path2 = API + USER + this.state.userId + ORDERS;
//     axios.post(path, newItem).then((res) => {
//       console.log(res);
//       this.setState({
//         id: res.data._id,
//         editDetails: false,
//         addOrder: false,
//       });
//       axios
//         .post(path2, {
//           orderId: this.state.id,
//         })
//         .then((res) => {
//           axios.get(path2).then((res) => {
//             console.log(res);
//             this.setState({ orders: res.data });
//           });
//         });
//     });
//   };

//   render() {
//     let details;
//     if (this.state.showDetails) {
//       details = (
//         <div className="contents-right">
//           <Card
//             className="contact-details"
//             style={{ width: 300, height: 320 }}
//             actions={[
//               <Button onClick={() => this.setState({ editDetails: true })}>
//                 Edit
//               </Button>,
//               <Button onClick={this.deleteHandler}>Delete</Button>,
//             ]}
//           >
//             <h2>Order Details</h2>
//             <h3>Client</h3>
//             <div className="list-item-details">
//               <h3>Status: {this.state.status}</h3>
//               <h3>Time Placed: {this.state.timePlaced}</h3>
//               <h3>Time Due: {this.state.timeDue}</h3>
//               <h3>Total Fee: {this.state.totalFee}</h3>
//               <h3>Description: {this.state.description}</h3>
//               <h3>Log: {this.state.log}</h3>
//             </div>
//           </Card>
//         </div>
//       );
//     }
//     return (
//       <div className="Master-div">
//         <Sidebar />
//         <div className="contacts">
//           <Header page="Orders" actions={this.activateAdd}></Header>
//           <div className="contents">
//             <div className="contents-left">
//               <span>Name</span>
//               <List
//                 itemLayout="horizontal"
//                 dataSource={this.state.orders}
//                 renderItem={(order) => (
//                   <List.Item
//                     className="contact-item"
//                     key={order.id}
//                     actions={[
//                       <Button
//                         type="dashed"
//                         block
//                         onClick={() =>
//                           this.setState({
//                             client: order.client,
//                             lineProducts: order.lineProducts,
//                             timePlaced: order.timePlaced,
//                             timeDue: order.timeDue,
//                             totalFee: order.totalFee,
//                             status: order.status,
//                             description: order.description,
//                             log: order.log,
//                             showDetails: true,
//                           })
//                         }
//                       >
//                         Details
//                       </Button>,
//                     ]}
//                   >
//                     <List.Item.Meta
//                       title={`${order.client} ${order.timePlaced}`}
//                       description={order.description}
//                     />
//                   </List.Item>
//                 )}
//               />
//             </div>
//             {details}
//           </div>
//           <AddOrderForm
//             trigger={this.state.addOrder}
//             actions={this.deactivateAdd}
//             createAction={this.createHandler}
//           ></AddOrderForm>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(Orders);
