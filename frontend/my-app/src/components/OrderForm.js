import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";

const OrderForm = (props) => {
    const [order, setOrder] = useState({ ...props.order });
    const contacts = { ...props.contacts };

    useEffect(() => {
        setOrder({ ...props.order });
    }, [props.order]);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (
        <Form {...layout}>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
                <Button
                    style={{ paddingLeft: 2, textAlign: "center" }}
                    onClick={props.closeAction}
                >
                    Close
                </Button>
            </Form.Item>
            <Form.Item>
                <Select
                    showArrow={false}
                    placeholder={order.client}
                    style={{ width: "150%" }}
                    onChange={(value) => setOrder({ ...order, client: value })}
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
            <Form.Item label="Time Due">
                <DatePicker
                    showTime
                    onOk={(value) =>
                        setOrder({
                            ...order,
                            timeDue: new Date(Date.parse(value)),
                        })
                    }
                />
            </Form.Item>
            <Form.Item label="Total Fee">
                <InputNumber
                    onChange={(value) => {
                        setOrder({ ...order, totalFee: value });
                    }}
                    min={0}
                    defaultValue={order.totalFee}
                />
            </Form.Item>
            <Form.Item label="Description:">
                <Input
                    placeholder={order.description}
                    onChange={(e) =>
                        setOrder({ ...order, description: e.target.value })
                    }
                />
            </Form.Item>
            {props.showOrderDetails && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                        style={{ paddingLeft: 2, textAlign: "center" }}
                        onClick={() => props.updateAction(order)}
                    >
                        Update
                    </Button>
                    <Button
                        style={{ paddingLeft: 2, textAlign: "center" }}
                        onClick={() => props.deleteAction(order.id)}
                    >
                        Delete
                    </Button>
                </Form.Item>
            )}
            {props.addOrder && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                        style={{ paddingLeft: 2, textAlign: "center" }}
                        onClick={() => props.createOrderAction(order)}
                    >
                        Create
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};

export default OrderForm;
