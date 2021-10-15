import { TRANSFER_RESPONSE, FETCH_TRANSFERS } from "./transfer.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TRANSFERS:
            return [...state, action.payload];
        case TRANSFER_RESPONSE:
            return state.filter(
                (transfer) => transfer.order._id !== action.payload
            );
        default:
            return state;
    }
};

export default reducer;
