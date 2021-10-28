import {
    CREATE_ORDER,
    FETCH_ORDERS,
    UPDATE_ORDER,
    DELETE_ORDER,
} from "./order.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return action.payload;
        case CREATE_ORDER:
            return [...state, action.payload];
        case UPDATE_ORDER:
            return state.map((order) =>
                order.order._id === action.payload.order._id
                    ? action.payload
                    : order
            );
        case DELETE_ORDER:
            return state.filter((order) => order.order._id !== action.payload);
        default:
            return state;
    }
};

export default reducer;
