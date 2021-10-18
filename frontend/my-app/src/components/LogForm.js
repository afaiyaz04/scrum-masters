import { useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import CloseButton from "./buttons/CloseButton";

const LogForm = (props) => {
    const [log, setLog] = useState("");

    return (
        <Form>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            <Form.Item>
                <div
                    style={{
                        height: 400,
                        overflowY: "scroll",
                        paddingRight: "5%",
                    }}
                >
                    {props.orders
                        .find((order) => {
                            return order.order._id === props.order._id;
                        })
                        .order.log.map((log) => {
                            return (
                                <>
                                    <h6 style={{ textAlign: "right" }}>{`${
                                        log.userName
                                    } ${log.timeCreated.slice(0, 10)}`}</h6>
                                    <p>{log.text}</p>
                                    <Divider />
                                </>
                            );
                        })}
                </div>
            </Form.Item>
            <Form.Item>
                <Input.TextArea
                    style={{ height: 150, width: "100%" }}
                    onChange={(e) => setLog(e.target.value)}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 15 }}>
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
