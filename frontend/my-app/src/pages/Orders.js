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

const initialOrder = {
  id: "",
  timeDue: Date,
  totalFee: 0,
  description: "",
  client: "",
};

const initialProduct = {
  id: "",
  name: "",
  description: "",
  price: 0,
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

      userId: JSON.parse(localStorage.getItem("userData"))._id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrders(this.state.userId));
    this.props.dispatch(fetchContacts(this.state.userId));
    console.log(this.props.contacts);
  }

  createOrderHandler = (newItem) => {
    this.setState({ addOrder: false });
    this.props.dispatch(createOrder(this.state.userId, newItem));
  };

  render() {
    console.log(this.state.order.client);
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
                        type="dashed"
                        style={{
                          paddingLeft: 2,
                          textAlign: "center",
                        }}
                        block
                        onClick={() =>
                          this.setState({
                            showDetails: true,
                            addOrder: false,
                            order: {
                              id: item._id,
                              client: item.client,
                              timeDue: item.timeDue,
                              totalFee: item.totalFee,
                              description: item.description,
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
                      description={item.description}
                      avatar={<CgProfile />}
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
                  // Closes form
                  closeAction={() =>
                    this.setState({
                      addOrder: false,
                      showDetails: false,
                    })
                  }
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
    products: state.products,
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps)(Orders);
