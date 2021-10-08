import { PROMOTE_USER, GET_ALL_USERS } from "./users.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROMOTE_USER:
			return state.map((user) => (user._id === action.payload._id ? action.payload : user));
		case GET_ALL_USERS:
			return action.payload;
		default:
			return state;
	}
};

export default reducer;
