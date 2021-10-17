import { useState, useEffect } from "react";
import { Form, Input, Button, List } from "antd";
import ClientCard from "./ClientCard";
import ProductCard from "./ProductCard";

const ContractDetails = (props) => {
  const [contract, setContract] = useState({ ...props.contract });
  console.log(contract);
  useEffect(() => {
    setContract({ ...props.contract });
  }, [props.contract]);

  const layout = {
    labelCol: {
      span: 10,
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
      <h3>Order no: {contract.orderNumber}</h3>
      <h3>Fee Agreed: ${contract.totalFee}</h3>
      {/* <h3>Time Placed: {contract.timePlaced.slice(0, 10)}</h3> */}
      <h3>status: {contract.status}</h3>
      <h3 style={{ color: "red" }}>
        Time Due: {contract.timeDue.slice(0, 10)}
      </h3>
      <h3>Last Modified: {contract.lastModified.slice(0, 10)}</h3>
      <h3>Description: {contract.description}</h3>
      <h3>Products:</h3>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={contract.lineProducts}
        renderItem={(item) => (
          <ProductCard
            productID={item.productId}
            quantity={item.quantity}
          ></ProductCard>
        )}
      />
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
