import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import CloseButton from "./buttons/CloseButton";

const OrderForm = (props) => {
    const [order, setOrder] = useState({ ...props.order });
    const [edit, setEdit] = useState(false);
    const contacts = { ...props.contacts };

    useEffect(() => {
        setOrder({ ...props.order });
        setEdit(false);
    }, [props.order]);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };

    const getClientName = (clientId) => {
        if (!clientId) return "";
        let name;
        Object.keys(contacts).forEach((contact) => {
            if (contacts[contact]._id === clientId) {
                name = `${contacts[contact].nameFirst} ${contacts[contact].nameLast}`;
            }
        });
        return name;
    };

    return (
        <Form {...layout}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            <Form.Item label="Order No">
                <Input
                    disabled={true}
                    bordered={false}
                    placeholder={order.orderNumber}
                />
            </Form.Item>
            {!edit && !props.addOrder && (
                <>
                    <Form.Item label="Client:">
                        <div className="form-text">
                            {getClientName(order.client)}
                        </div>
                    </Form.Item>
                    <Form.Item label="Time Due:">
                        <div className="form-text">{order.timeDue}</div>
                    </Form.Item>
                    <Form.Item label="Total Fee:">
                        <div className="form-text">{order.totalFee}</div>
                    </Form.Item>
                    <Form.Item label="Status:">
                        <div className="form-text">{order.status}</div>
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
                            {order.description}
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button
                            className="general-btn"
                            block
                            onClick={() => setEdit(true)}
                        >
                            Edit Details
                        </Button>
                    </Form.Item>
                    <Form.Item />
                </>
            )}
            {(edit || props.addOrder) && (
                <>
                    <Form.Item label="Client:">
                        <Select
                            placeholder={getClientName(order.client)}
                            style={{ width: "100%" }}
                            onChange={(value) =>
                                setOrder({ ...order, client: value })
                            }
                        >
                            {Object.keys(contacts).map((contact, index) => {
                                return (
                                    <Select.Option
                                        key={contacts[contact]._id}
                                        value={contacts[contact]._id}
                                    >
                                        {contacts[contact].nameFirst +
                                            " " +
                                            contacts[contact].nameLast}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Time Due:">
                        <DatePicker
                            showTime
                            placeholder={order.timeDue}
                            onOk={(value) =>
                                setOrder({
                                    ...order,
                                    timeDue: new Date(Date.parse(value)),
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Total Fee:">
                        <InputNumber
                            onChange={(value) => {
                                setOrder({ ...order, totalFee: value });
                            }}
                            min={0}
                            placeholder={order.totalFee}
                        />
                    </Form.Item>
                    <Form.Item label="Status:">
                        <Select
                            placeholder={order.status}
                            onChange={(value) =>
                                setOrder({ ...order, status: value })
                            }
                        >
                            <Select.Option value={"CREATED"}>
                                CREATED
                            </Select.Option>
                            <Select.Option value={"DISCUSSED"}>
                                DISCUSSED
                            </Select.Option>
                            <Select.Option value={"AGREED"}>
                                AGREED
                            </Select.Option>
                            <Select.Option value={"SIGNED"}>
                                SIGNED
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description:">
                        <Input.TextArea
                            placeholder={order.description}
                            style={{ height: 150 }}
                            onChange={(e) =>
                                setOrder({
                                    ...order,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    {props.showOrderDetails && !props.addOrder && (
                        <>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button
                                    className="general-btn"
                                    type="primary"
                                    block
                                    onClick={() => {
                                        props.updateOrderAction(order);
                                    }}
                                >
                                    Update
                                </Button>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button
                                    className="general-btn"
                                    block
                                    danger
                                    onClick={() => {
                                        props.deleteOrderAction(order._id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </Form.Item>
                        </>
                    )}
                    {props.addOrder && !props.showOrderDetails && (
                        <Form.Item
                            wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                        >
                            <Button
                                className="general-btn"
                                type="primary"
                                block
                                onClick={() => {
                                    props.createOrderAction(order);
                                }}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    )}
                </>
            )}
        </Form>
    );
};

export default OrderForm;
