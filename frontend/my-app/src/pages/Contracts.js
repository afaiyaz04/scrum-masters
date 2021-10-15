import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../redux/Order/order.actions";
import { List, Button } from "antd";
import {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../redux/Product/product.actions";
import ContractDetails from "../components/ContractDetails";

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: [],

      showDetails: false,
      addContract: false,

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

  descriptionLimit = (description) => {
    if (description.length > 50) {
      return `${description.slice(0, 50)}...`;
    } else {
      return description;
    }
  };

  render() {
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
                dataSource={this.props.orders.filter(this.contractFilter)}
                renderItem={(item) => (
                  <List.Item
                    className="order-item"
                    key={item.id}
                    actions={[
                      <Button
                        type="dashed"
                        style={{ paddingLeft: 2, textAlign: "center" }}
                        block
                        onClick={() => {
                          this.props.dispatch(fetchProducts(item._id));
                          this.setState({
                            showDetails: true,
                            addContract: false,
                            contract: item,
                          });
                        }}
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Contract No. ${item.orderNumber}`}
                      description={this.descriptionLimit(item.description)}
                    />
                  </List.Item>
                )}
              />
            </div>
            {this.state.showDetails && (
              <div className="contents-right">
                <ContractDetails
                  contract={this.state.contract}
                ></ContractDetails>
              </div>
            )}
            {this.state.addContract && (
              <div className="contents-right">
                <h1>add the Input from here</h1>
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
