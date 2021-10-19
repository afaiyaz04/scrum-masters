import { useState, useEffect } from "react";
import { Form, Select, Button, Table, Collapse } from "antd";
import CloseButton from "./buttons/CloseButton";

const { Panel } = Collapse;

const ContractForm = (props) => {
    const [contract, setContract] = useState({ ...props.contract });

    useEffect(() => {
        setContract({ ...props.contract });
    }, [props.contract]);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };

    const productColumns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Price", dataIndex: "price", key: "price", width: "20%" },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: "20%",
        },
    ];

    return (
        <Form {...layout}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            <Form.Item label="Contract No:">
                <div className="form-text">{contract.orderNumber}</div>
            </Form.Item>
            <Form.Item label="Client:">
                <div className="form-text">{contract.clientName}</div>
            </Form.Item>
            <Form.Item label="Total Fee:">
                <div className="form-text">{contract.totalFee}</div>
            </Form.Item>
            <Form.Item label="Time Due:">
                <div className="form-text">{contract.timeDue}</div>
            </Form.Item>
            {contract.status === "ARCHIVED" && (
                <Form.Item label="Status:">
                    <Select placeholder={contract.status} disabled={true} />
                </Form.Item>
            )}
            {contract.status !== "ARCHIVED" && (
                <Form.Item label="Status:">
                    <Select
                        placeholder={contract.status}
                        onChange={(value) =>
                            props.updateAction({ ...contract, status: value })
                        }
                    >
                        <Select.Option value={"CREATED"}>CREATED</Select.Option>
                        <Select.Option value={"DISCUSSED"}>
                            DISCUSSED
                        </Select.Option>
                        <Select.Option value={"AGREED"}>AGREED</Select.Option>
                        <Select.Option value={"SIGNED"}>SIGNED</Select.Option>
                    </Select>
                </Form.Item>
            )}
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
                    {contract.description}
                </div>
            </Form.Item>
            <Collapse bordered={false}>
                <Panel
                    header={`Items (${contract.lineProducts.length})`}
                    key="1"
                >
                    <Table
                        columns={productColumns}
                        pagination={false}
                        expandable={{
                            expandedRowRender: (record) => (
                                <p style={{ margin: 0 }}>
                                    Item Description:
                                    <br />
                                    {record.description}
                                </p>
                            ),
                        }}
                        dataSource={contract.lineProducts.map((product) => {
                            return {
                                key: product._id,
                                name: product.name,
                                quantity: product.quantity,
                                price: product.price,
                                description: product.description,
                            };
                        })}
                    />
                </Panel>
            </Collapse>
            <Form.Item />
            {contract.status !== "ARCHIVED" && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button
                        className="general-btn"
                        block
                        onClick={() =>
                            props.updateAction({
                                ...contract,
                                status: "ARCHIVED",
                            })
                        }
                    >
                        Archive Contract
                    </Button>
                </Form.Item>
            )}
            {contract.status === "ARCHIVED" && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button
                        className="general-btn"
                        block
                        onClick={() =>
                            props.updateAction({
                                ...contract,
                                status: "AGREED",
                            })
                        }
                    >
                        Restore Contract
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};

export default ContractForm;
