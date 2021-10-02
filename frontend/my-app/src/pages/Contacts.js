import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import ContactListItem from "../components/ContactListItem";
import ItemDetails from "../components/ItemDetails";
import axios from "axios";
import { Component } from "react";
import { mapStateToProps } from "../redux/reduxConfig";
import { connect } from "react-redux";
import { Card } from "antd";
import "antd/dist/antd.css";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      active: [],
    };
  }

  componentDidMount = async () => {
    try {
      const endpoint1 = `https://jsonplaceholder.typicode.com/users`;
      const response1 = await axios.get(endpoint1, {
        withCredentials: true,
      });
      this.setState({
        contacts: response1.data,
        active: response1.data[0],
      });

      // get the objects in the order for rendering totals
    } catch (err) {
      console.log(err);
    }
    const name = this.state.active.name;
  };

  render() {
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="contacts">
          <Header page="Contacts"></Header>
          <div className="contents">
            <div className="contents-left">
              <h3>Cards</h3>
              <ul>
                {this.state.contacts.map((contact) => (
                  <ContactListItem contact={contact}></ContactListItem>
                ))}
              </ul>
            </div>
            <ItemDetails
              item="Contact"
              type="Contact"
              details={this.state.active.username}
            ></ItemDetails>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Contacts);
