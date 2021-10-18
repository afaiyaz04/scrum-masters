import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import CloseButton from "./buttons/CloseButton";

const ProductForm = (props) => {
    const [product, setProduct] = useState({ ...props.product });

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };

    return (
        <Form {...layout}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button
                        className="general-btn"
                        type="primary"
                        block
                        onClick={() => {
                            props.createProductAction(product);
                        }}
                    >
                        Create
                    </Button>
                </Form.Item>
            )}
            {!props.addProduct && props.showProductDetails && (
                <>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button
                            className="general-btn"
                            type="primary"
                            block
                            onClick={() => props.updateProductAction(product)}
                        >
                            Update
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button
                            className="general-btn"
                            danger
                            block
                            onClick={() =>
                                props.deleteProductAction(product._id)
                            }
                        >
                            Delete
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};

export default ProductForm;
