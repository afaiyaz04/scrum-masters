import { useState, useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import CloseButton from "./buttons/CloseButton";

const UsersForm = (props) => {
    const [user, setUser] = useState({ ...props.user });
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        setUser({ ...props.user });
    }, [props.user]);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };

    if (props.showDetails) {
        return (
            <Form {...layout}>
                <Form.Item />
                <CloseButton closeAction={props.closeAction} />
                {(user.nameFirst || user.nameLast) && (
                    <>
                        <Form.Item label="First Name:">
                            <Input
                                placeholder={user.nameFirst}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item label="Last Name:">
                            <Input
                                placeholder={user.nameLast}
                                disabled={true}
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item label="Email:">
                    <Input placeholder={user.email} disabled={true} />
                </Form.Item>
                <Form.Item label="Type:">
                    <Input placeholder={user.type} disabled={true} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button
                        className="general-btn"
                        block
                        onClick={() => props.promoteAction(user.id)}
                    >
                        Promote
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button
                        className="general-btn"
                        block
                        onClick={() => props.controlAction(user.id)}
                    >
                        Control
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button
                        className="general-btn"
                        type="primary"
                        danger
                        block
                        onClick={() => setShowDelete(true)}
                    >
                        Delete
                    </Button>
                </Form.Item>
                <Modal
                        title={`Delete User ${user.nameFirst} ${user.nameLast}`}
                        visible={showDelete}
                        onCancel={() => setShowDelete(false)}
                        footer={null}
                        width={300}
                        centered={true}
                    >
                        <h3 style={{ textAlign: "center" }}>
                           {`Are you sure you want to delete ${user.nameFirst} ${user.nameLast}? This action is irreversible.`}
                        </h3>
                        <Button
                            type="primary"
                            danger
                            block
                            onClick={() => props.deleteAction(user.id)}
                            style={{ textAlign: "center" }}
                        >
                            Confirm
                        </Button>
                    </Modal>
            </Form>
        );
    } else {
        return (
            <Form {...layout}>
                <Form.Item />
                <CloseButton closeAction={props.closeAction} />
                <Form.Item label="Email:">
                    <Input
                        placeholder={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button
                        className="general-btn"
                        block
                        onClick={() => props.registerAction(user)}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

export default UsersForm;
