import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import CloseButton from "./buttons/CloseButton";

const OrderForm = (props) => {
    const [order, setOrder] = useState({ ...props.order });
    const [edit, setEdit] = useState(false);
    const contacts = { ...props.contacts };
    const zeroPad = (num) => String(num).padStart(2, "0");

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

    const onSubmit = () => {
        if (edit) {
            props.updateOrderAction(order);
        } else if (props.addOrder) {
            props.createOrderAction(order);
        }
    };

    const date = new Date(Date.parse(order.timeDue));

    const timeDue = `${date.getFullYear()}-${zeroPad(
        date.getMonth() + 1
    )}-${zeroPad(date.getDate())} ${zeroPad(date.getHours())}:${zeroPad(
        date.getMinutes()
    )}:${zeroPad(date.getSeconds())}`;

    return (
        <Form {...layout} onFinish={onSubmit}>
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
                        <div className="form-text">{timeDue}</div>
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
                    <Form.Item
                        label="Client:"
                        name="client"
                        rules={[
                            {
                                required: props.addOrder,
                                message: "Client required",
                            },
                        ]}
                    >
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
                    <Form.Item
                        label="Time Due:"
                        name="timeDue"
                        rules={[
                            {
                                required: props.addOrder,
                                message: "Deadline required",
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            placeholder={timeDue}
                            onOk={(value) =>
                                setOrder({
                                    ...order,
                                    timeDue: new Date(Date.parse(value)),
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Total Fee:"
                        name="totalFee"
                        rules={[
                            {
                                required: props.addOrder,
                                message: "Total Fee required",
                            },
                        ]}
                    >
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
                            disabled={props.addOrder}
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
                                    htmlType="sumbit"
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
                                htmlType="submit"
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
