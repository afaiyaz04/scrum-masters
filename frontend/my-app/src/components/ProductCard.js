import React from "react";
import axios from "axios";
import { API, ORDER, PRODUCT, PRODUCTS } from "../pages/urlConfig";
import { List, Input, Card, Button, InputNumber, Badge } from "antd";
import { fetchProduct } from "../redux/api";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                price: 1,
                name: "a",
            },
            productId: this.props.productID,
            showDetails: false,

            name: "",
            description: "",
            price: 0,
            quantity: this.props.quantity,
        };
    }
    componentDidMount = async () => {
        // const product = await fetchProduct(this.props.productID);
        // this.setState({ product: product.data });
    };

    render() {
        const product = this.state.product;
        let details;
        if (this.state.showDetails) {
            details = (
                <div className="contact-popup">
                    <h4>price: {product.price}</h4>
                </div>
            );
        }

        return (
            <div
                onClick={() =>
                    this.setState({ showDetails: !this.state.showDetails })
                }
                className="list-item"
            >
                <h4>{product.name}</h4>
                <Badge count={this.state.quantity}></Badge>
                {details}
            </div>
        );
    }
}

export default ProductCard;
