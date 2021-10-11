import { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";

const OrderForm = (props) => {
  const [order, setOrder] = useState({ ...props.order });
  const contacts = { ...props.contacts };

  useEffect(() => {
    setOrder({ ...props.order });
  }, [props.order]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  console.log(contacts);

  return (
    <Form {...layout}>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
        <Button onClick={props.closeAction}>Close</Button>
      </Form.Item>
      <Form.Item>
        <Select
          showArrow={false}
          placeholder="Select Client"
          style={{ width: "150%" }}
        >
          {Object.keys(contacts).map((contact, index) => {
            return (
              <Select.Option
                key={contacts[contact]._id}
                value={contacts[contact].nameFirst}
              >
                {contacts[contact].nameFirst + " " + contacts[contact].nameLast}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
