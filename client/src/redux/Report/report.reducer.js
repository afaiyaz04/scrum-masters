import { FETCH_REPORT } from "./report.types";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_REPORT:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
