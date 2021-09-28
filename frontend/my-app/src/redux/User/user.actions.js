import { SET_USER, DELETE_USER } from "./user.types";

export const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

export const deleteContact = () => {
	return {
		type: DELETE_USER,
	};
};