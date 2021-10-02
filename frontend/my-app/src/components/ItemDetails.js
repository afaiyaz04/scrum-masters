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
      editStatus: false,
    };
  }
  render() {
    const contact = this.props.contact;
    console.log(this.state.editStatus);
    return (
      <div className="contents-right">
        <h2>Contact Details</h2>
        <div className="list-item-details">
          <h3>Name: {contact.nameFirst} {contact.nameLast}</h3>
          <h3>Company: {contact.company}</h3>
          <h3>Title: {contact.title}</h3>
          <hr></hr>
          <h3></h3>
          <h3>Email: {contact.email}</h3>
          <h3>Phone: {contact.phoneNumber}</h3>
          <h3>Address: {contact.address}</h3>

          <div className="item-details-btns">
            <Button type="text" onClick={() => this.setState({editStatus: true})}>Edit</Button>
            <Button type="text">Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemDetails);
