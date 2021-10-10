import { CREATE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from "./product.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.payload;
		case CREATE_PRODUCT:
			return [...state, action.payload]
		case UPDATE_PRODUCT:
			return state.map((product) => (product._id === action.payload._id ? action.payload : product));
		case DELETE_PRODUCT:
			return state.filter((product) => product._id !== action.payload);
		default:
			return state;
	}
};

export default reducer;
