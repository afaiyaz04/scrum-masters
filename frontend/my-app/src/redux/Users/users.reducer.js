import { SET_USERS, DELETE_USERS } from "redux/Users/users.types";

const INITIAL_STATE = null;

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_USERS:
			return action.payload;
		case DELETE_USERS:
			return null;
		default:
			return state;
	}
};

export default reducer;
