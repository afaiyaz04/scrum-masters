import { useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import CloseButton from "./buttons/CloseButton";

const LogForm = (props) => {
    const [log, setLog] = useState("");

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
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                <div style={{ height: 400, overflowY: "scroll", paddingRight: "5%" }}>
                    {
                        props.orders.find((order) => {
                            return order.order._id === props.order._id;
                        }).order.log.map((log) => {
                            return (
                                <>
                                    <h6 style={{ textAlign: "right" }}>{`${log.userName} ${log.timeCreated.slice(0,10)}`}</h6>
                                    <p>{log.text}</p>
                                    <Divider />
                                </>
                            )
                        })
                    }
                </div>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                <Input.TextArea
                    style={{ height: 150, width: "100%" }}
                    onChange={(e) =>
                        setLog(e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 14 }}>
                <Button
                    className="general-btn"
                    onClick={() => {
                        props.addLogAction(log);
                    }}
                >
                    Post
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LogForm;
