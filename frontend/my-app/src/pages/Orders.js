import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { API, USER, ORDERS } from "./urlConfig";
import { List, Card, Button } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reduxConfig";
import ClientCard from "../components/ClientCard";
import AddOrderForm from "../components/AddOrderForm";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      client: "",

      showDetails: false,
      editDetails: false,
      addOrder: false,

      id: "",
      client: "",
      lineProducts: "",
      timePlaced: "",
      timeDue: "",
      totalFee: "",
      status: "",
      description: "",
      log: "",

      userId: JSON.parse(localStorage.getItem('userData'))._id
    };
  }

  componentDidMount() {
    const endpoint = API + USER + this.state.userId + ORDERS;
    axios.get(endpoint).then((res) => {
      console.log(res);
      this.setState({ orders: res.data });
    });
  }

  activateAdd = () => {
    this.setState({ addOrder: true });
  };

  deactivateAdd = () => {
    this.setState({ addOrder: false });
  };

  createHandler = (newItem) => {
    const path = API + '/order';
    const path2 = API + USER + this.state.userId + ORDERS;
    axios.post(path, newItem).then((res) => {
      console.log(res);
      this.setState({
        id: res.data._id,
        editDetails: false,
        addOrder: false,
      });
      axios
        .post(path2, {
          orderId: this.state.id,
        })
        .then((res) => {
          axios.get(path2).then((res) => {
            console.log(res);
            this.setState({ orders: res.data });
          });
        });
    });
  };

  render() {
    let details;
    if (this.state.showDetails) {
      details = (
        <div className="contents-right">
          <Card
            className="contact-details"
            style={{ width: 300, height: 320 }}
            actions={[
              <Button onClick={() => this.setState({ editDetails: true })}>
                Edit
              </Button>,
              <Button onClick={this.deleteHandler}>Delete</Button>,
            ]}
          >
            <h2>Order Details</h2>
            <h3>Client</h3>
            <div className="list-item-details">
              <h3>Status: {this.state.status}</h3>
              <h3>Time Placed: {this.state.timePlaced}</h3>
              <h3>Time Due: {this.state.timeDue}</h3>
              <h3>Total Fee: {this.state.totalFee}</h3>
              <h3>Description: {this.state.description}</h3>
              <h3>Log: {this.state.log}</h3>
            </div>
          </Card>
        </div>
      );
    }
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="contacts">
          <Header page="Orders" actions={this.activateAdd}></Header>
          <div className="contents">
            <div className="contents-left">
              <span>Name</span>
              <List
                itemLayout="horizontal"
                dataSource={this.state.orders}
                renderItem={(order) => (
                  <List.Item
                    className="contact-item"
                    key={order.id}
                    actions={[
                      <Button
                        type="dashed"
                        block
                        onClick={() =>
                          this.setState({
                            client: order.client,
                            lineProducts: order.lineProducts,
                            timePlaced: order.timePlaced,
                            timeDue: order.timeDue,
                            totalFee: order.totalFee,
                            status: order.status,
                            description: order.description,
                            log: order.log,
                            showDetails: true,
                          })
                        }
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${order.client} ${order.timePlaced}`}
                      description={order.description}
                    />
                  </List.Item>
                )}
              />
            </div>
            {details}
          </div>
          <AddOrderForm
            trigger={this.state.addOrder}
            actions={this.deactivateAdd}
            createAction={this.createHandler}
          ></AddOrderForm>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Orders);
