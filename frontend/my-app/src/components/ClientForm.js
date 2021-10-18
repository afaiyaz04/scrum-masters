import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import CloseButton from "./buttons/CloseButton";
import ChangePicture from "./ChangePicture";

const ClientForm = (props) => {
    const [contact, setContact] = useState({ ...props.contact });

    useEffect(() => {
        setContact({ ...props.contact });
    }, [props.contact]);

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
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            <Form.Item
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "auto",
                    width: "fit-content",
                    height: "fit-content",
                    alignContent: "center"
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
                <Input
                    placeholder={contact.nameFirst}
                    onChange={(e) =>
                        setContact({ ...contact, nameFirst: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="Last Name:">
                <Input
                    placeholder={contact.nameLast}
                    onChange={(e) =>
                        setContact({ ...contact, nameLast: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="Title:">
                <Input
                    placeholder={contact.title}
                    onChange={(e) =>
                        setContact({ ...contact, title: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="Company:">
                <Input
                    placeholder={contact.company}
                    onChange={(e) =>
                        setContact({ ...contact, company: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="E-mail:">
                <Input
                    placeholder={contact.email}
                    onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="Phone Number:">
                <Input
                    placeholder={contact.phoneNumber}
                    onChange={(e) =>
                        setContact({ ...contact, phoneNumber: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item label="Address:">
                <Input
                    placeholder={contact.address}
                    onChange={(e) =>
                        setContact({ ...contact, address: e.target.value })
                    }
                />
            </Form.Item>
            {props.showDetails && (
                <>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button
                            type="primary"
                            block
                            className="general-btn"
                            onClick={() => props.updateAction(contact)}
                        >
                            Update
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button
                            className="general-btn"
                            block
                            danger
                            onClick={() => props.deleteAction(contact.id)}
                        >
                            Delete
                        </Button>
                    </Form.Item>
                </>
            )}
            {props.addContact && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button
                        className="general-btn"
                        type="primary"
                        block
                        onClick={() => props.createAction(contact)}
                    >
                        Create
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};

export default ClientForm;
