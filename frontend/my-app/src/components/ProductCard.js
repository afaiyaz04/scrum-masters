import React from "react";
import axios from "axios";
import { API, PRODUCT } from "../pages/urlConfig";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      quantiy: this.props.quantity,
      showDetails: false,
    };
  }
  componentDidMount = async () => {
    const endpoint = API + PRODUCT + this.props.productID;
    const response = await axios.get(endpoint).catch((err) => {
      console.log("ERR", err);
    });
    console.log(response);
    this.setState({ product: response.data });
  };

  render() {
    const product = this.state.product;
    let details;
    if (this.state.showDetails) {
      details = (
        <div className="contact-popup">
          <h6>{product.description}</h6>
          <h4>{product.price}</h4>
          <h4>{this.state.quantity}</h4>
        </div>
      );
    }

    return (
      <div
        onClick={() => this.setState({ showDetails: !this.state.showDetails })}
        className="list-item"
      >
        <h4>{product.name}</h4>
        {details}
      </div>
    );
  }
}

export default ProductCard;
