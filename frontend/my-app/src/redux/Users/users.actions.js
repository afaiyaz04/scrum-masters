import { PROMOTE_USER, GET_ALL_USERS, DELETE_USER, REGISTER_USER } from "./users.types";
import * as api from '../../redux/api/index';

export const promoteUser = (userId) => async (dispatch) => {
	try {
		const { data } = await api.promoteUser(userId);
		dispatch({ type: PROMOTE_USER, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const fetchUsers = () => async (dispatch) => {
	try {
		const { data } = await api.fetchUsers();
		dispatch({ type: GET_ALL_USERS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = (userId) => async (dispatch) => {
	try {
		// delete clients etc.
		await api.deleteUser(userId);
		dispatch({ type: DELETE_USER, payload: userId });
	} catch (error) {
		console.log(error);
	}
};

export const registerUser = (formData) => async (dispatch) => {
	try {
		const { data } = await api.registerUser(formData);
		dispatch({ type: REGISTER_USER, payload: data });
	} catch (error) {
		console.log(error);
	}
};