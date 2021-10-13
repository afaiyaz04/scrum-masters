import { Form, Input, InputNumber, Button, Select, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts } from "../redux/Product/product.actions";

const initialProduct = {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

const ProductForm = (props) => {
  const [product, setProduct] = useState(initialProduct);
	const [showDetails, setShowDetails] = useState(false);
	const [addProduct, setAddProduct] = useState(false);
  const products = useSelector((state) => state.products);

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
      
			{
				!showDetails && !addProduct &&
				<>
					<List
						itemLayout="horizontal"
						dataSource={products}
						pagination={{
							pageSize: 5
						}}
						renderItem={(item) => (
							<List.Item
								className="order-item"
								key={item.product._id}
								actions={[
									<Button
										type="dashed"
										style={{ paddingLeft: 2, textAlign: 'center' }}
										block
										onClick={() => {
											setProduct({
												id: item.product._id,
												name: item.product.name,
												description: item.product.description,
												price: item.product.price,
												quantity: item.quantity
											});
											setShowDetails(true);
										}}
									>
										Details
									</Button>,
								]}
							>
								<List.Item.Meta
									title={`${item.product.name}`}
								/>
							</List.Item>
						)}
					/>
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => {setProduct(initialProduct); setAddProduct(true)}}>Add Item</Button>
					</Form.Item>
				</>
			}
			{
				showDetails && !addProduct &&
				<>
					<Form.Item label="Item Name:">
						<Input
							placeholder={product.name}
							onChange={(e) => setProduct({ ...product, product: e.target.value })}
						/>
					</Form.Item>
					<Form.Item label="Fee:">
						<InputNumber
							onChange={(e) => setProduct({ ...product, price: e.target.value })}
							min={0}
							defaultValue={product.price}
						/>
					</Form.Item>
					<Form.Item label="Quantity:">
						<InputNumber
							onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
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
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => {props.updateProductAction(product.id, product, product.quantity); setShowDetails(false)}}>Update</Button>
						<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => {props.deleteProductAction(product.id); setShowDetails(false)}}>Delete</Button>
					</Form.Item>
				</>
			}
			{
				addProduct && !showDetails &&
				<>
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
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button style={{ paddingLeft: 2, textAlign: 'center' }} onClick={() => {props.createProductAction(product, product.quantity); setAddProduct(false)}}>Create</Button>
					</Form.Item>
				</>
			}
    </Form>
  );
};

export default ProductForm;
