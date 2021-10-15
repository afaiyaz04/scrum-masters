import React from "react";
import axios from "axios";
import { API, ORDER, PRODUCT, PRODUCTS } from "../pages/urlConfig";
import { Input, Card, Button, InputNumber } from "antd";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            productId: this.props.productID,
            showDetails: false,
            deleted: false,

            name: "",
            description: "",
            price: 0,
            quantity: 1,
            editProduct: false,
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

    updateHandler = (product) => {
        const path = API + PRODUCT + this.state.productId;
        const path2 = API + ORDER + this.props.orderID + PRODUCTS;
        console.log(product);
        axios.patch(path, product).then((res) => {
            console.log(res);
        });
        axios.patch(path2, product).then((res) => {
            console.log(res);
            this.setState({
                editProduct: false,
                showDetails: true,
            });
        });
        this.componentDidMount();
    };

    deleteHandler = (product) => {
        const path = API + ORDER + this.props.orderID + PRODUCTS;
        axios.delete(path, product).then((res) => {
            console.log(res);
            this.setState({
                deleted: true,
            });
        });
    };

    render() {
        const product = this.state.product;
        let details;
        if (this.state.deleted) {
            details = <div>DELETED</div>;
        } else {
            if (this.state.editProduct) {
                details = (
                    <Card>
                        <button
                            onClick={() =>
                                this.setState({ editProduct: false })
                            }
                        >
                            Cancel
                        </button>
                        <Input
                            placeholder={this.state.name}
                            onChange={(e) =>
                                this.setState({ name: e.target.value })
                            }
                        />
                        <Input
                            placeholder={this.state.description}
                            onChange={(e) =>
                                this.setState({ description: e.target.value })
                            }
                        />
                        <div className="horizontal">
                            <h3>Price: </h3>
                            <br></br>
                            <InputNumber
                                onChange={(value) => {
                                    this.setState({ price: value });
                                }}
                                min={0}
                                defaultValue={this.state.price}
                            />{" "}
                        </div>
                        <div className="horizontal">
                            <h3>Quantity: </h3>
                            <br></br>
                            <InputNumber
                                onChange={(value) => {
                                    this.setState({ quantity: value });
                                }}
                                min={1}
                                defaultValue={this.state.quantity}
                            />{" "}
                        </div>
                        <Button onClick={() => this.updateHandler(this.state)}>
                            Confirm
                        </Button>
                    </Card>
                );
            } else {
                if (this.state.showDetails) {
                    details = (
                        <div className="contact-popup">
                            <h4>Description: {product.description}</h4>
                            <h4>price: {product.price}</h4>
                            <h4>{this.state.quantity}</h4>
                            <Button
                                type="dashed"
                                block
                                onClick={() =>
                                    this.setState({
                                        name: product.name,
                                        description: product.description,
                                        price: product.price,
                                        quantity: product.quantity,
                                        editProduct: true,
                                        showDetails: true,
                                    })
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                type="dashed"
                                block
                                onClick={() => this.deleteHandler(this.state)}
                            >
                                Delete
                            </Button>
                        </div>
                    );
                }
            }
        }

        return (
            <div
                onClick={() =>
                    this.setState({ showDetails: !this.state.showDetails })
                }
                className="list-item"
            >
                <h4>{product.name}</h4>
                {details}
            </div>
        );
    }
}

export default ProductCard;
