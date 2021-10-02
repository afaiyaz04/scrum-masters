import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { List, Input, Card, Button } from "antd";
import "antd/dist/antd.css";

export default class Contacts extends React.Component {
  state = {
    contacts: [],

    showDetails: false,

    id: "",
    nameFirst: "",
    nameLast: "",
    title: "",
    company: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/user/614180facb6259ce3427029f/clients`)
      .then((res) => {
        console.log(res);
        this.setState({ contacts: res.data });
      });
  }

  updateHandler = (newItem) => {
    axios
      .patch(`http://localhost:5000/client/${newItem.id}`, newItem)
      .then((res) => {
        console.log(res);
        this.setState({
          nameFirst: res.nameFirst,
          nameLast: res.nameLast,
          title: res.title,
          company: res.company,
          email: res.email,
          phoneNumber: res.phoneNumber,
          address: res.address,

          showDetails: false,
          editDetails: false,
        });
      });
    axios
      .get(`http://localhost:5000/user/614180facb6259ce3427029f/clients`)
      .then((res) => {
        console.log(res);
        this.setState({ contacts: res.data });
      });
  };

  createHandler = (newItem) => {
    axios.post(`http://localhost:5000/client`, newItem).then((res) => {
      console.log(res);
      this.setState({
        id: res._id,
        nameFirst: res.nameFirst,
        nameLast: res.nameLast,
        title: res.title,
        company: res.company,
        email: res.email,
        phoneNumber: res.phoneNumber,
        address: res.address,

        showDetails: true,
        editDetails: false,
      });
    });
    axios.post(
      `http://localhost:5000/user/614180facb6259ce3427029f/clients`,
      this.state.id
    );
    axios
      .get(`http://localhost:5000/user/614180facb6259ce3427029f/clients`)
      .then((res) => {
        console.log(res);
        this.setState({ contacts: res.data });
      });
  };

  render() {
    // const isShowDetails = this.state.showDetails;
    let details;
    if (this.state.showDetails) {
      if (!this.state.editDetails) {
        details = (
          <div className="contents-right">
            <Card
              className="contact-details"
              style={{ width: 300, height: 300 }}
              actions={[
                <Button onClick={() => this.setState({ editDetails: true })}>
                  Edit
                </Button>,
                <Button>Delete</Button>,
              ]}
            >
              <h2>Contact Details</h2>
              <div className="list-item-details">
                <h3>First Name: {this.state.nameFirst}</h3>
                <h3>Last Name: {this.state.nameLast}</h3>
                <h3>Title: {this.state.title}</h3>
                <h3>Company: {this.state.company}</h3>
                <h3>Email: {this.state.email}</h3>
                <h3>Phone: {this.state.phoneNumber}</h3>
                <h3>Address: {this.state.address}</h3>
              </div>
            </Card>
          </div>
        );
      } else {
        details = (
          <div className="contents-right">
            <Card
              style={{ width: 300, height: 600 }}
              actions={[
                <Button onClick={() => this.updateHandler(this.state)}>
                  Update
                </Button>,
                <Button>Delete</Button>,
              ]}
            >
              <h2>Contact Details</h2>
              <div className="list-item-details">
                <Input
                  placeholder={this.state.nameFirst}
                  onChange={(e) => this.setState({ nameFirst: e.target.value })}
                />
                <Input
                  placeholder={this.state.nameLast}
                  onChange={(e) => this.setState({ nameLast: e.target.value })}
                />
                <Input
                  placeholder={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <Input
                  placeholder={this.state.company}
                  onChange={(e) => this.setState({ company: e.target.value })}
                />
                <Input
                  placeholder={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <Input
                  placeholder={this.state.phoneNumber}
                  onChange={(e) =>
                    this.setState({ phoneNumber: e.target.value })
                  }
                />
                <Input
                  placeholder={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </div>
            </Card>
          </div>
        );
      }
    }
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="contacts">
          <Header page="Contacts"></Header>
          <div className="contents">
            <div className="contents-left">
              <span>Name</span>
              <List
                itemLayout="horizontal"
                dataSource={this.state.contacts}
                renderItem={(item) => (
                  <List.Item
                    className="contact-item"
                    key={item.id}
                    actions={[
                      <Button
                        type="dashed"
                        block
                        onClick={() =>
                          this.setState({
                            id: item._id,
                            nameFirst: item.nameFirst,
                            nameLast: item.nameLast,
                            title: item.title,
                            company: item.company,
                            email: item.email,
                            phoneNumber: item.phoneNumber,
                            address: item.address,
                            showDetails: true,
                          })
                        }
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.nameFirst} ${item.nameLast}`}
                      description={item.email}
                      avatar={<CgProfile />}
                    />
                  </List.Item>
                )}
              />
            </div>
            {details}
          </div>
        </div>
      </div>
    );
  }
}
