import { SET_USERS, DELETE_USERS } from "redux/Users/users.types";

export const setUsers = (users) => {
	return {
		type: SET_USERS,
		payload: users,
	};
};

export const deleteContact = () => {
	return {
		type: DELETE_USERS,
	};
};