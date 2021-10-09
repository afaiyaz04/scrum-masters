import { SET_USER_DATA } from "./user.types";
import * as api from '../api/index';

export const setUser = (formData, router) => async (dispatch) => {
	try {
		const { data } = await api.setUser(formData);
		dispatch({ type: SET_USER_DATA, data });
		router.push('/dashboard');
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = (userId) => async () => {
	try {
		await api.deleteUser(userId);
	} catch (error) {
		console.log(error);
	}
};