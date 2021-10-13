import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { List, Button } from "antd";
import "antd/dist/antd.css";
import OrderForm from "../components/OrderForm";
import { connect } from "react-redux";
import {
  createOrder,
  fetchOrders,
  updateOrder,
  deleteOrder,
} from "../redux/Order/order.actions";
import {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../redux/Product/product.actions";

import { fetchContacts } from "../redux/Contact/contact.actions";
import ProductForm from "../components/ProductForm";

const initialOrder = {
  id: null,
  timeDue: Date,
  totalFee: 0,
  description: "",
  client: "",
  status: "CREATED",
};

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

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: initialOrder,

      showDetails: false,
      addOrder: false,

      showProducts: false,

      userId: JSON.parse(localStorage.getItem("userData"))._id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrders(this.state.userId));
    this.props.dispatch(fetchContacts(this.state.userId));
  }

  createOrderHandler = (newItem) => {
    this.setState({ addOrder: false });
    this.props.dispatch(createOrder(this.state.userId, newItem));
  };

  updateOrderHandler = (newItem) => {
    this.setState({ showDetails: false });
    this.props.dispatch(updateOrder(this.state.order.id, newItem));
  }

  deleteOrderHandler = (orderId) => {
    this.setState({ showDetails: false });
    this.props.dispatch(deleteOrder(this.state.userId, orderId));
  }

  createProductHandler = (newItem, quantity) => {
    this.props.dispatch(createProduct(this.state.order.id, newItem, quantity));
  };

  updateProductHandler = (productId, newItem, quantity) => {
    this.props.dispatch(updateProduct(this.state.order.id, productId, newItem, quantity));
  }

  deleteProductHandler = (productId) => {
    this.props.dispatch(deleteProduct(this.state.order.id, productId));
  }

  descriptionLimit = (description) => {
    if (description.length > 50) {
      return `${description.slice(0,50)}...`;
    } else {
      return description;
    }
  }

  render() {
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="orders">
          <Header
            page="Orders"
            actions={() => {
              this.setState({
                addOrder: true,
                showDetails: false,
                showProducts: false,
                order: initialOrder,
              });
            }}
          />
          <div className="contents">
            <div className="contents-left">
              <span>Name</span>
              <List
                itemLayout="horizontal"
                dataSource={this.props.orders}
                renderItem={(item) => (
                  <List.Item
                    className="order-item"
                    key={item.id}
                    actions={[
                      <Button
                        style={{ paddingLeft: 2, textAlign: 'center' }}
                        block
                        onClick={() => {
                          this.props.dispatch(fetchProducts(item._id));
                          this.setState({
                            showDetails: false,
                            addOrder: false,
                            showProducts: true,
                            order: {
                              id: item._id,
                              client: item.client,
                              timeDue: item.timeDue,
                              totalFee: item.totalFee,
                              description: item.description,
                              status: item.status,
                            },
                          })
                        }}
                      >
                        Items
                      </Button>,
                      <Button
                        type="dashed"
                        style={{ paddingLeft: 2, textAlign: 'center' }}
                        block
                        onClick={() =>
                          this.setState({
                            showDetails: true,
                            addOrder: false,
                            showProducts: false,
                            order: {
                              id: item._id,
                              client: item.client,
                              timeDue: item.timeDue,
                              totalFee: item.totalFee,
                              description: item.description,
                              status: item.status,
                            },
                          })
                        }
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Order No. ${item.orderNumber}`}
                      description={this.descriptionLimit(item.description)}
                    />
                  </List.Item>
                )}
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
              (this.state.showProducts) &&
              <div className="contents-right">
                <ProductForm
                  order={this.state.order}
                  createProductAction={this.createProductHandler}
                  updateProductAction={this.updateProductHandler}
                  deleteProductAction={this.deleteProductHandler}
                  closeAction={() =>
                    this.setState({ showProducts: false })
                  }
                />
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
