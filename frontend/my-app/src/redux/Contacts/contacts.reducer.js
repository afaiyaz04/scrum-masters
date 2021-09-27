import { SET_CUSTOMER, DELETE_CUSTOMER } from "redux/Customer/customer.types";

const INITIAL_STATE = null;

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CUSTOMER:
			return action.payload;
		case DELETE_CUSTOMER:
			return null;
		default:
			return state;
	}
};

export default reducer;
