import { SET_ORDER, DELETE_ORDER } from "./order.types";

export const setOrder = (order) => {
	return {
		type: SET_ORDER,
		payload: order,
	};
};

export const deleteContact = () => {
	return {
		type: DELETE_ORDER,
	};
};