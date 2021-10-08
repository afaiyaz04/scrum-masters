import { SET_USER, DELETE_USER } from "./user.types";
import * as api from '../api/index';

export const setUser = (formData, router) => async (dispatch) => {
	try {
		const { data } = await api.createUser(formData);
		dispatch({ type: SET_USER, data });
		router.push('/dashboard');
	} catch (error) {
		console.log(error);
	}
};

export const deleteContact = () => {
	return {
		type: DELETE_USER,
	};
};