import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";

const ProductForm = (props) => {
    const [product, setProduct] = useState({ ...props.product });

    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (
        <Form {...layout}>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
                <Button className="general-btn" onClick={props.closeAction}>
                    Close
                </Button>
            </Form.Item>
            <Form.Item label="Item Name:">
                <Input
                    placeholder={product.name}
                    onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="Fee:">
                <InputNumber
                    onChange={(e) => setProduct({ ...product, price: e })}
                    min={0}
                    placeholder={product.price}
                />
            </Form.Item>
            <Form.Item label="Quantity:">
                <InputNumber
                    onChange={(e) => setProduct({ ...product, quantity: e })}
                    min={0}
                    placeholder={product.quantity}
                />
            </Form.Item>
            <Form.Item label="Description:">
                <Input.TextArea
                    placeholder={product.description}
                    style={{ height: 150 }}
                    onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                    }
                />
            </Form.Item>
            {props.addProduct && !props.showProductDetails && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                        className="general-btn"
                        onClick={() => {
                            props.createProductAction(product);
                        }}
                    >
                        Create
                    </Button>
                </Form.Item>
            )}
            {!props.addProduct && props.showProductDetails && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                        className="general-btn"
                        onClick={() => props.updateProductAction(product)}
                    >
                        Update
                    </Button>
                    <Button
                        className="general-btn"
                        onClick={() => props.deleteProductAction(product._id)}
                    >
                        Delete
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};

export default ProductForm;
