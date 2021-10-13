import { CREATE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from "./product.types";
import * as api from '../../redux/api/index';

export const createProduct = (orderId, formData, quantity) => async (dispatch) => {
	try {
		const { data } = await api.createProduct(formData);
		await api.addLineProduct(orderId, data._id, quantity);
		dispatch({ type: CREATE_PRODUCT, payload: { product: data, quantity } });
	} catch (error) {
		console.log(error);
	}
}

export const fetchProducts = (orderId) => async (dispatch) => {
	try {
		const { data } = await api.fetchLineProducts(orderId);
		dispatch({ type: FETCH_PRODUCTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateProduct = (orderId, productId, formData, quantity) => async (dispatch) => {
	try {
		const { data } = await api.updateProduct(productId, formData);
        await api.updateLineProduct(orderId, { productId, quantity });
		dispatch({ type: UPDATE_PRODUCT, payload: { product: data, quantity } });
	} catch (error) {
		console.log(error);
	}
}

export const deleteProduct = (orderId, productId) => async (dispatch) => {
	try {
		await api.deleteLineProduct(orderId, productId);
		dispatch({ type: DELETE_PRODUCT, payload: productId });
	} catch (error) {
		console.log(error);
	}
};