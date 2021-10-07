import React from "react";
import "./AddContactForm.css";
import { List, Input, Card, Button } from "antd";
import { API, CLIENTS, USER } from "../pages/urlConfig";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reduxConfig";

class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProduct: false,
    };
  }

  removeNull(array) {
    return array.filter((x) => x !== null);
  }

  render() {
    return (
      <div>
        <Button onClick={() => console.log(Hi)}>Add Product</Button>
      </div>
    );
  }
}
export default connect(mapStateToProps)(AddProductForm);
