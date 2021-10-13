import {
    PROMOTE_USER,
    GET_ALL_USERS,
    DELETE_USER,
    REGISTER_USER,
} from "./users.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROMOTE_USER:
            return state.map((user) =>
                user._id === action.payload._id ? action.payload : user
            );
        case GET_ALL_USERS:
            return action.payload;
        case DELETE_USER:
            return state.filter((user) => user._id !== action.payload);
        case REGISTER_USER:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default reducer;
