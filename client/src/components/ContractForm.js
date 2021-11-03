import { useState, useEffect } from "react";
import { Form, Button, Table, Collapse } from "antd";
import CloseButton from "./buttons/CloseButton";

const { Panel } = Collapse;

const ContractForm = (props) => {
    const [contract, setContract] = useState({ ...props.contract });
    const zeroPad = (num) => String(num).padStart(2, "0");

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

    const date = new Date(Date.parse(contract.timeDue));

    const timeDue = `${date.getFullYear()}-${zeroPad(
        date.getMonth() + 1
    )}-${zeroPad(date.getDate())} ${zeroPad(date.getHours())}:${zeroPad(
        date.getMinutes()
    )}:${zeroPad(date.getSeconds())}`;

    return (
        <Form {...layout}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            <Form.Item label="Contract No:">
                <div className="form-text">{contract.orderNumber}</div>
            </Form.Item>
            <Form.Item label="Client:">
                <div className="form-text">{contract.clientName.slice(0, 30)}</div>
            </Form.Item>
            <Form.Item label="Total Fee:">
                <div className="form-text">{contract.totalFee}</div>
            </Form.Item>
            <Form.Item label="Time Due:">
                <div className="form-text">{timeDue}</div>
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
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                <Button
                    type="primary"
                    block
                    onClick={() => props.reportAction(contract)}
                >
                    Generate Report
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                <Button
                    block
                    onClick={() =>
                        props.updateAction({
                            ...contract,
                            status: "SIGNED",
                        })
                    }
                >
                    Revert to Order
                </Button>
            </Form.Item>
            {contract.status !== "ARCHIVED" && (
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button
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
                        block
                        onClick={() =>
                            props.updateAction({
                                ...contract,
                                status: "CONTRACT",
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
