import {
    DELETE_USER,
    SET_USER,
    SET_USER_DATA,
    SIGN_OUT,
    UPDATE_USER,
} from "./user.types";

const INITIAL_STATE = { authData: null };

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem("user", JSON.stringify({ ...action?.data }));
            return {
                ...state,
                authData: action.data,
                loading: false,
                errors: null,
            };

        case SET_USER_DATA:
            localStorage.setItem(
                "userData",
                JSON.stringify({ ...action?.data })
            );
            return {
                ...state,
                authData: action.data,
                loading: false,
                errors: null,
            };

        case SIGN_OUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };

        case UPDATE_USER:
            localStorage.setItem(
                "userData",
                JSON.stringify({ ...action?.data })
            );
            return {
                ...state,
                authData: action.data,
                loading: false,
                errors: null,
            };

        default:
            return state;
    }
};

export default reducer;
