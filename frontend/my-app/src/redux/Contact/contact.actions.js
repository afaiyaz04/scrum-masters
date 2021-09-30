import { SET_CONTACT, DELETE_CONTACT } from "./contact.types";

export const setContact = (contact) => {
	return {
		type: SET_CONTACT,
		payload: contact,
	};
};

export const deleteContact = () => {
	return {
		type: DELETE_CONTACT,
	};
};