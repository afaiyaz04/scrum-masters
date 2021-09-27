import { SET_CONTACTS, DELETE_CONTACTS } from "redux/Contacts/contacts.types";

export const setContacts = (customerId) => ({
	type: SET_CUSTOMER,
	payload: customerId,
});

export const deleteCustomer = () => ({
	type: DELETE_CUSTOMER,
});
