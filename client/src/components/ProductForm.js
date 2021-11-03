import { Form, Input, InputNumber, Button } from "antd";
import { useState, useEffect } from "react";
import CloseButton from "./buttons/CloseButton";

const ProductForm = (props) => {
    const [product, setProduct] = useState({ ...props.product });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setProduct({ ...props.product });
        setEdit(false);
    }, [props.product]);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };

    const onSubmit = () => {
        if (edit) {
            props.updateProductAction(product);
        } else if (props.addProduct) {
            props.createProductAction(product);
        }
    };

    return (
        <Form {...layout} onFinish={onSubmit}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            {!edit && !props.addProduct && (
                <>
                    <Form.Item label="Item Name:">
                        <div className="form-text">
                            {product.name
                                ? product.name.slice(0, 30)
                                : product.name}
                        </div>
                    </Form.Item>
                    <Form.Item label="Price:">
                        <div className="form-text">{product.price}</div>
                    </Form.Item>
                    <Form.Item label="Quantity:">
                        <div className="form-text">{product.quantity}</div>
                    </Form.Item>
                    <Form.Item
                        label="Description:"
                        style={{ display: "flex", flexWrap: "wrap" }}
                    >
                        <div
                            className="form-text"
                            style={{
                                height: 150,
                                paddingTop: 5,
                                overflowY: "scroll",
                                maxWidth: "100%",
                                wordWrap: "break-word",
                            }}
                        >
                            {product.description}
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button block onClick={() => setEdit(true)}>
                            Edit Details
                        </Button>
                    </Form.Item>
                    <Form.Item />
                </>
            )}
            {(edit || props.addProduct) && (
                <>
                    <Form.Item
                        label="Item Name:"
                        name="name"
                        rules={[
                            {
                                required: props.addProduct,
                                message: "Item name required",
                            },
                        ]}
                    >
                        <Input
                            placeholder={
                                product.name
                                    ? product.name.slice(0, 30)
                                    : product.name
                            }
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price:"
                        name="price"
                        rules={[
                            {
                                required: props.addProduct,
                                message: "Item price required",
                            },
                        ]}
                    >
                        <InputNumber
                            onChange={(e) =>
                                setProduct({ ...product, price: e })
                            }
                            min={0}
                            precision={2}
                            placeholder={product.price}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quantity:"
                        name="quantity"
                        rules={[
                            {
                                required: props.addProduct,
                                message: "Item quantity required",
                            },
                        ]}
                    >
                        <InputNumber
                            onChange={(e) =>
                                setProduct({ ...product, quantity: e })
                            }
                            min={0}
                            placeholder={product.quantity}
                        />
                    </Form.Item>
                    <Form.Item label="Description:">
                        <Input.TextArea
                            placeholder={product.description}
                            style={{ height: 150 }}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    {props.addProduct && !props.showProductDetails && (
                        <>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button type="primary" block htmlType="submit">
                                    Create
                                </Button>
                            </Form.Item>
                            <Form.Item />
                        </>
                    )}
                    {!props.addProduct && props.showProductDetails && (
                        <>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button type="primary" block htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button
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
                </>
            )}
        </Form>
    );
};

export default ProductForm;
