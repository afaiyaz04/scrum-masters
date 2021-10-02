import React from "react";
import { mapStateToProps } from "../redux/reduxConfig";
import { connect } from "react-redux";
import { Component } from "react";
import { Card, Button } from "antd";
import "antd/dist/antd.css";

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "placeholder",
    };
  }
  render() {
    const contact = this.props.contact;
    return (
      <div className="contents-right">
        <h2>Contact Details</h2>
        <div className="list-item-details">
          <h3>Name: {contact.name}</h3>
          <h3>Company: </h3>
          <h3>Designation: </h3>
          <hr></hr>
          <h3>Email: {contact.email}</h3>
          <h3>Phone: {contact.phone}</h3>
          <h3>Address: </h3>
          <h3>Last Order: </h3>

          <div className="item-details-btns">
            <Button type="text">Edit</Button>
            <Button type="text">Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemDetails);
