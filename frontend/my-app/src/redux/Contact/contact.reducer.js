import { FETCH_CONTACTS, CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from "./contact.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_CONTACTS:
			return action.payload;
		case CREATE_CONTACT:
			return [...state, action.payload]
		case UPDATE_CONTACT:
			return state.map((contact) => (contact._id === action.payload._id ? action.payload : contact));
		case DELETE_CONTACT:
			return state.filter((contact) => contact._id !== action.payload);
		default:
			return state;
	}
};

export default reducer;
