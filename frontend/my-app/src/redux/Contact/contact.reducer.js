import { SET_CONTACT, DELETE_CONTACT } from "./contact.types";

const INITIAL_STATE = null;

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CONTACT:
			return action.payload;
		case DELETE_CONTACT:
			return null;
		default:
			return state;
	}
};

export default reducer;
