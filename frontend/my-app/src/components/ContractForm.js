import { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  List,
} from "antd";
import ClientCard from "./ClientCard";
import ProductCard from "./ProductCard";
import { fetchOrder } from "../redux/api";

const ContractForm = (props) => {
  const [contract, setContract] = useState("");
  const orders = { ...props.orders };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  console.log(contract);
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
      <Form.Item label="Order:">
        <Select
          showArrow={false}
          placeholder={""}
          style={{ width: "100%" }}
          onChange={(value) => setContract(fetchOrder(value))}
        >
          {Object.keys(orders).map((order, index) => {
            return (
              <Select.Option key={orders[order]._id} value={orders[order]._id}>
                Order Number -{orders[order].orderNumber}
              </Select.Option>
            );
          })}
        </Select>
        {contract != "" ? (
          <div>
            <h3>Client:</h3>
            <ClientCard client={contract.client}></ClientCard>
            <h3>Order no: {contract.orderNumber}</h3>
            <h3>Fee Agreed: ${contract.totalFee}</h3>
            {/* <h3>Time Placed: {contract.timePlaced.slice(0, 10)}</h3> */}
            <h3>status: {contract.status}</h3>
            {/* <h3 style={{ color: "red" }}>
              Time Due: {contract.timeDue.slice(0, 10)}
            </h3> */}
            {/* <h3>Last Modified: {contract.lastModified.slice(0, 10)}</h3> */}
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
          </div>
        ) : (
          ""
        )}
      </Form.Item>
    </Form>
  );
};

export default ContractForm;
