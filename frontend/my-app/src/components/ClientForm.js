import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import CloseButton from "./buttons/CloseButton";
import ChangePicture from "./ChangePicture";

const ClientForm = (props) => {
    const [contact, setContact] = useState({ ...props.contact });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setContact({ ...props.contact });
        setEdit(false);
    }, [props.contact]);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const onSubmit = () => {
        if (edit) {
            props.updateAction(contact);
            setEdit(false);
        } else if (props.addContact) {
            props.createAction(contact);
        }
    };

    return (
        <Form {...layout} onFinish={onSubmit}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            {!edit && !props.addContact && (
                <>
                    <Form.Item
                        style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "auto",
                            width: "fit-content",
                            height: "fit-content",
                            alignContent: "center",
                        }}
                    >
                        <ChangePicture
                            width={75}
                            height={75}
                            img={contact.profilePic}
                            text={props.addContact ? "Add" : "Change"}
                            fontSize="smaller"
                            onChange={(img) =>
                                setContact({ ...contact, profilePic: img })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="First Name:">
                        <div className="form-text">{contact.nameFirst}</div>
                    </Form.Item>
                    <Form.Item label="Last Name:">
                        <div className="form-text">{contact.nameLast}</div>
                    </Form.Item>
                    <Form.Item label="Title:">
                        <div className="form-text">{contact.title}</div>
                    </Form.Item>
                    <Form.Item label="Company:">
                        <div className="form-text">{contact.company}</div>
                    </Form.Item>
                    <Form.Item label="Email:">
                        <div className="form-text">{contact.email}</div>
                    </Form.Item>
                    <Form.Item label="Phone Number:">
                        <div className="form-text">{contact.phoneNumber}</div>
                    </Form.Item>
                    <Form.Item label="Address:">
                        <div className="form-text">{contact.address}</div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button
                            block
                            onClick={() => setEdit(true)}
                        >
                            Edit Details
                        </Button>
                    </Form.Item>
                    <Form.Item />
                </>
            )}
            {(edit || props.addContact) && (
                <>
                    <Form.Item
                        style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "auto",
                            width: "fit-content",
                            height: "fit-content",
                            alignContent: "center",
                        }}
                    >
                        <ChangePicture
                            width={75}
                            height={75}
                            img={contact.profilePic}
                            text={props.addContact ? "Add" : "Change"}
                            fontSize="smaller"
                            onChange={(img) =>
                                setContact({ ...contact, profilePic: img })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="First Name:"
                        name="nameFirst"
                        rules={[
                            {
                                required: props.addContact,
                                message: "First name required",
                            },
                        ]}
                    >
                        <Input
                            placeholder={contact.nameFirst}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    nameFirst: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Last Name:"
                        name="nameLast"
                        rules={[
                            {
                                required: props.addContact,
                                message: "Last name required",
                            },
                        ]}
                    >
                        <Input
                            placeholder={contact.nameLast}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    nameLast: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Title:">
                        <Input
                            placeholder={contact.title}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    title: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Company:">
                        <Input
                            placeholder={contact.company}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    company: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Email:">
                        <Input
                            placeholder={contact.email}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    email: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Phone Number:">
                        <Input
                            placeholder={contact.phoneNumber}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    phoneNumber: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Address:">
                        <Input
                            placeholder={contact.address}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    address: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    {props.showDetails && (
                        <>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
                            >
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                >
                                    Update
                                </Button>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
                            >
                                <Button
                                    block
                                    danger
                                    onClick={() =>
                                        props.deleteAction(contact.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </Form.Item>
                        </>
                    )}
                    {props.addContact && (
                        <>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
                            >
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                >
                                    Create
                                </Button>
                            </Form.Item>
                            <Form.Item />
                        </>
                    )}
                </>
            )}
        </Form>
    );
};

export default ClientForm;
