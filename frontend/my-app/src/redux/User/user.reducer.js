import { SET_USER, DELETE_USER } from "./user.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_USER:
			return action.payload;
		case DELETE_USER:
			return null;
		default:
			return state;
	}
};

export default reducer;
