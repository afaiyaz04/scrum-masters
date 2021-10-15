import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";

const OrderForm = (props) => {
  const [order, setOrder] = useState({ ...props.order });
  const contacts = { ...props.contacts };

  useEffect(() => {
    setOrder({ ...props.order });
  }, [props.order]);

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const getClientName = (clientId) => {
    if (!clientId) return '';
    let name;
    Object.keys(contacts).forEach(contact => {
      if (contacts[contact]._id == clientId) {
        name = `${contacts[contact].nameFirst} ${contacts[contact].nameLast}`
      }
    });
    return name;
  }

  return (
    <Form {...layout}>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
        <Button className='general-btn' onClick={props.closeAction}>Close</Button>
      </Form.Item>
      <Form.Item label="Client:">
        <Select
          showArrow={false}
          placeholder={getClientName(order.client)}
          style={{ width: "100%" }}
          onChange={(value) => setOrder({ ...order, client: value })}
        >
          {Object.keys(contacts).map((contact, index) => {
            return (
              <Select.Option
                key={contacts[contact]._id}
                value={contacts[contact]._id}
              >
                {contacts[contact].nameFirst + " " + contacts[contact].nameLast}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Time Due:">
        <DatePicker
          showTime
          placeholder={order.timeDue}
          onOk={(value) =>
            setOrder({ ...order, timeDue: new Date(Date.parse(value)) })
          }
        />
      </Form.Item>
      <Form.Item label="Total Fee:">
        <InputNumber
          onChange={(value) => {
            setOrder({ ...order, totalFee: value });
          }}
          min={0}
          placeholder={order.totalFee}
        />
      </Form.Item>
      <Form.Item label="Status:">
        <Select
          showArrow={false}
          placeholder={order.status}
          onChange={(value) => setOrder({ ...order, status: value })}
        >
          <Select.Option value={"CREATED"}>CREATED</Select.Option>
          <Select.Option value={"DISCUSSED"}>DISCUSSED</Select.Option>
          <Select.Option value={"AGREED"}>AGREED</Select.Option>
          <Select.Option value={"SIGNED"}>SIGNED</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description:">
        <Input.TextArea
          placeholder={order.description}
          style={{ height: 150 }}
          onChange={(e) => setOrder({ ...order, description: e.target.value })}
        />
      </Form.Item>
      {(props.showOrderDetails && !props.addOrder) && (
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button className='general-btn' onClick={() => {props.updateOrderAction(order)}}>Update</Button>
          <Button className='general-btn' onClick={() => {props.deleteOrderAction(order._id)}}>Delete</Button>
        </Form.Item>
      )}
      {(props.addOrder && !props.showOrderDetails) && (
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button className='general-btn' onClick={() => {props.createOrderAction(order)}}>Create</Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default OrderForm;
