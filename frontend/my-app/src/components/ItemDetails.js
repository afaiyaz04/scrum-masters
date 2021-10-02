import React from "react";
import { mapStateToProps } from "../redux/reduxConfig";
import { connect } from "react-redux";
import { Component } from "react";
import { Card, Button , Input} from "antd";
import "antd/dist/antd.css";
import axios from 'axios';

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    const contact = this.props.contact;
    this.state = {
      editStatus: this.props.edit,
      
      id: contact._id,
      nameFirst: contact.nameFirst,
      nameLast: contact.nameLast,
      title: contact.title,
      company: contact.company,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
    };
  }

  updateHandler = (newItem) => {
      axios.patch(`http://localhost:5000/client/${newItem.id}`, newItem)
      .then(res => {
          console.log(res)
          this.setState({
              editStatus: false,
          });
      })
      axios.get(`http://localhost:5000/user/614180facb6259ce3427029f/clients`)
          .then(res => {
              console.log(res)
              this.setState({contacts: res.data});
          })
  }

  render() {
    if(this.state.editStatus){
      return (
      <div className="contents-right">
        <h2>Edit Contact Details</h2>
        <div className="list-item-details">
          <Input placeholder={ this.state.nameFirst } onChange={(e) => this.setState({ nameFirst: e.target.value })} />
          <Input placeholder={ this.state.nameLast } onChange={(e) => this.setState({ nameLast: e.target.value })} />
          <Input placeholder={ this.state.title } onChange={(e) => this.setState({ title: e.target.value })} />
          <Input placeholder={ this.state.company } onChange={(e) => this.setState({ company: e.target.value })} />
          <Input placeholder={ this.state.email } onChange={(e) => this.setState({ email: e.target.value })} />
          <Input placeholder={ this.state.phoneNumber } onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
          <Input placeholder={ this.state.address } onChange={(e) => this.setState({ address: e.target.value })} />

          <div className="item-details-btns">
            <Button type="text" onClick={() => this.updateHandler(this.state)}>Update</Button>
            <Button type="text" onClick={() => this.setState({editStatus: false})}>Cancel</Button>
          </div>
        </div>
      </div>
    );
    }
    else{
      return (
      <div className="contents-right">
        <h2>Contact Details</h2>
        <div className="list-item-details">
          <h3>Name: {this.state.nameFirst} {this.state.nameLast}</h3>
          <h3>Company: {this.state.company}</h3>
          <h3>Title: {this.state.title}</h3>
          <hr></hr>
          <h3></h3>
          <h3>Email: {this.state.email}</h3>
          <h3>Phone: {this.state.phoneNumber}</h3>
          <h3>Address: {this.state.address}</h3>

          <div className="item-details-btns">
            <Button type="text" onClick={() => this.setState({editStatus: true})}>Edit</Button>
            <Button type="text">Delete</Button>
          </div>
        </div>
      </div>
    );
    }
  }
}

export default connect(mapStateToProps)(ItemDetails);
