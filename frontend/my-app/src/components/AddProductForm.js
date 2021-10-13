import React from "react";
import "./AddContactForm.css";
import { List, Input, Card, Button, InputNumber } from "antd";
import { API, PRODUCT, ORDER, PRODUCTS } from "../pages/urlConfig";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reduxConfig";
import ProductCard from "./ProductCard";

class AddProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterDetail: false,

            name: "",
            description: "",
            price: 0,
            quantity: 1,

            oldQuantity: 0,
            products: [],
        };
    }

    removeNull(array) {
        return array.filter((x) => x !== null);
    }

    createHandler = (product, quantity) => {
        const path = API + PRODUCT;
        const path2 = API + ORDER + this.props.orderID + PRODUCTS;
        console.log(product);
        axios.post(path, product).then((res) => {
            console.log(res);
            this.setState({
                enterDetail: false,
                products: [...this.state.products, res.data],
                name: "",
                description: "",
                price: 0,
                oldQuantity: this.state.quantity,
                quantity: 1,
            });
            axios
                .post(path2, {
                    productId: res.data._id,
                    quantity: quantity,
                })
                .then((res) => {
                    console.log(res);
                });
        });
    };

    render() {
        console.log(this.state.oldQuantity);
        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.state.products}
                    renderItem={(item) => (
                        <ProductCard
                            productID={item._id}
                            quantity={this.state.oldQuantity}
                            orderID={this.props.orderID}
                        ></ProductCard>
                    )}
                />
                {this.state.enterDetail ? (
                    <Card>
                        <button
                            onClick={() =>
                                this.setState({ enterDetail: false })
                            }
                        >
                            Cancel
                        </button>
                        <Input
                            placeholder="Product Name"
                            onChange={(e) =>
                                this.setState({ name: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Product Description"
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
                        <Button
                            onClick={() =>
                                this.createHandler(
                                    this.state,
                                    this.state.quantity
                                )
                            }
                        >
                            Submit
                        </Button>
                    </Card>
                ) : (
                    <Button
                        onClick={() => this.setState({ enterDetail: true })}
                    >
                        Add New Product
                    </Button>
                    // '<Card>
                    //   <Input
                    //     placeholder="Product Name"
                    //     onChange={(e) => this.setState({ name: e.target.value })}
                    //   />
                    //   <Input
                    //     placeholder="Product Description"
                    //     onChange={(e) => this.setState({ description: e.target.value })}
                    //   />
                    //   <Input
                    //     placeholder="Price"
                    //     onChange={(e) => this.setState({ price: e.target.value })}
                    //   />
                    //   <Input
                    //     placeholder="Quantity"
                    //     onChange={(e) => this.setState({ quantity: e.target.value })}
                    //   />
                    //   <Button onClick={() => this.props.createAction(this.state)}>
                    //     Submit
                    //   </Button>
                    // </Card>'
                )}
            </div>
        );
    }
}
export default connect(mapStateToProps)(AddProductForm);
