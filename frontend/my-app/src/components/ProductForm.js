import { Form, Input, InputNumber, Button, Select, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ProductForm = (props) => {
	const [product, setProduct] = useState({ ...props.product });

  const layout = {
    labelCol: {
      span: 5,
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
      <Form.Item label="Item Name:">
			<Input
				placeholder={product.name}
				onChange={(e) => setProduct({ ...product, name: e.target.value })}
			/>
		</Form.Item>
		<Form.Item label="Fee:">
			<InputNumber
				onChange={(e) => setProduct({ ...product, price: e })}
				min={0}
				defaultValue={product.price}
			/>
		</Form.Item>
		<Form.Item label="Quantity:">
			<InputNumber
				onChange={(e) => setProduct({ ...product, quantity: e })}
				min={0}
				defaultValue={product.quantity}
			/>
		</Form.Item>
		<Form.Item label="Description:">
			<Input.TextArea
				defaultValue={product.description}
				style={{ height: 150 }}
				onChange={(e) => setProduct({ ...product, description: e.target.value })}
			/>
		</Form.Item>
		{
			(props.addProduct && !props.showProductDetails) &&
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => {props.createProductAction(product)}}>Create</Button>
			</Form.Item>
		}
		{
			(!props.addProduct && props.showProductDetails) &&
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => props.updateProductAction(product)}>Update</Button>
				<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => props.deleteProductAction(product._id)}>Delete</Button>
			</Form.Item>
		}
    </Form>
  );
};

export default ProductForm;
