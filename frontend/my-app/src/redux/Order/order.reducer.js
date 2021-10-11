import { SET_ORDER, DELETE_ORDER } from "./order.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_ORDER:
			return action.payload;
		case DELETE_ORDER:
			return null;
		default:
			return state;
	}
};

export default reducer;
