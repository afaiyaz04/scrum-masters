import { useState } from "react";
import { Form, Transfer, Button, Select, Modal } from "antd";

const TransferForm = (props) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [targetKeys, setTargetKeys] = useState([]);

    const formatOrders = () => {
        return props.orders.map((order) => {
            return {
                ...order,
                key: order._id,
            };
        });
    };

    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const getUserName = (userId) => {
        let name;
        props.users.forEach((user) => {
            if (user._id === userId) {
                name = `${user.nameFirst} ${user.nameLast}`;
            }
        });
        return name;
    };

    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    return (
        <Modal
            title="Order Transfer"
            visible={props.transferOrder}
            onCancel={props.closeAction}
            footer={null}
            destroyOnClose={true}
            style={{ width: "100%" }}
        >
            <Form>
                <Form.Item>
                    <Select
                        style={{ width: "100%" }}
                        onChange={(user) => {
                            setSelectedUser(user);
                        }}
                    >
                        {props.users
                            .filter((user) => {
                                return props.userId !== user._id;
                            })
                            .map((user) => {
                                return (
                                    <Select.Option
                                        key={user._id}
                                        value={user._id}
                                    >
                                        {`${user.nameFirst} ${user.nameLast}`}
                                    </Select.Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Transfer
                        style={{ width: "100%", paddingLeft: 30 }}
                        titles={["Source", "Destination"]}
                        targetKeys={targetKeys}
                        onChange={onChange}
                        dataSource={formatOrders()}
                        render={(item) => item.orderNumber}
                    />
                </Form.Item>
                {!selectedUser && (
                    <Form.Item>
                        <Button style={{ width: "100%" }} disabled={true}>
                            Select a User
                        </Button>
                    </Form.Item>
                )}
                {selectedUser && (
                    <Form.Item>
                        <Button
                            style={{ width: "100%" }}
                            onClick={() => {
                                props.transferAction(selectedUser, targetKeys);
                            }}
                        >{`Transfer order to ${getUserName(
                            selectedUser
                        )}`}</Button>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default TransferForm;
