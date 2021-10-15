import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import ClientCard from "./ClientCard";

const ContractDetails = (props) => {
  const [contract, setContract] = useState({ ...props.contract });

  useEffect(() => {
    setContract({ ...props.contract });
  }, [props.contract]);

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
      <h1>Contract Details</h1>
      <h3>Client:</h3>
      <ClientCard client={contract.client}></ClientCard>
      <Form.Item label="Last Name:"></Form.Item>
      <Form.Item label="Title:"></Form.Item>
      <Form.Item label="Company:"></Form.Item>
      <Form.Item label="E-mail:"></Form.Item>
      <Form.Item label="Phone Number:"></Form.Item>
      <Form.Item label="Address:"></Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          style={{ paddingLeft: 2, textAlign: "center" }}
          onClick={() => props.updateAction(contract)}
        >
          Mark complete
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContractDetails;
