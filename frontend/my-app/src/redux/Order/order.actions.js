import {
    CREATE_ORDER,
    FETCH_ORDERS,
    UPDATE_ORDER,
    DELETE_ORDER,
} from "./order.types";
import * as api from "../../redux/api/index";

export const createOrder = (userId, formData) => async (dispatch) => {
    try {
        const data = await api.createOrder(formData);
        await api.addUserOrder(userId, data.data._id);
        dispatch({ type: CREATE_ORDER, payload: data.data });
    } catch (error) {
        console.log(error);
    }
};

export const fetchOrders = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchOrders(userId);
        dispatch({ type: FETCH_ORDERS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateOrder = (orderId, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateOrder(orderId, formData);
        dispatch({ type: UPDATE_ORDER, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrder = (userId, orderId) => async (dispatch) => {
    try {
        await api.deleteUserOrder(userId, orderId);
        dispatch({ type: DELETE_ORDER, payload: orderId });
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = (orderId, formData) => async (dispatch) => {
	try {
		const { data } = await api.addLineProduct(orderId, formData);
		dispatch({ type: UPDATE_ORDER, payload: data });
	} catch (error) {
		console.log(error);
	}
}

export const updateProduct = (orderId, productId, formData) => async (dispatch) => {
	try {
		const { data } = await api.updateLineProduct(orderId, productId, formData);
		dispatch({ type: UPDATE_ORDER, payload: data });
	} catch (error) {
		console.log(error);
	}
}

export const deleteProduct = (orderId, productId) => async (dispatch) => {
	try {
		const { data } = await api.deleteLineProduct(orderId, productId);
		dispatch({ type: UPDATE_ORDER, payload: data });
	} catch (error) {
		console.log(error);
	}
}

export const transferOrder = (userId, toUserId, orderId) => async (dispatch) => {
	try {
		await api.transferOrder(userId, toUserId, orderId);
		dispatch({ type: DELETE_ORDER, payload: orderId });
	} catch (error) {
		console.log(error);
	}
}