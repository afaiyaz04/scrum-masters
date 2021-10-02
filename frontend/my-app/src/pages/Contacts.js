import React from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import ContactListItem from "../components/ContactListItem";
import ItemDetails from "../components/ItemDetails";
import axios from "axios";
import { Component } from "react";
import { mapStateToProps } from "../redux/reduxConfig";
import { connect } from "react-redux";
import { Card , Button, Input} from "antd";
import "antd/dist/antd.css";
import { API, USER, ORDERS , CLIENTS} from './urlConfig';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount = async () => {
    try {
      const endpoint1 = API + USER + this.props.user._id + CLIENTS;
      const response1 = await axios.get(endpoint1, {
        withCredentials: true,
      });
      this.setState({
        contacts: response1.data,
      });

      // get the objects in the order for rendering totals
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const isShowDetails = this.state.showDetails;
    let details;
    if (this.props.contact) {
        details = <ItemDetails
              item="Contact"
              type="Contact"
            ></ItemDetails>
    }
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
                  <ContactListItem key={contact._id} contact={contact} ></ContactListItem>
                ))}
              </ul>
            </div>
            { details }
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Contacts);
