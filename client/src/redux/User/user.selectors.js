import { createSelector } from "reselect";

const userSelector = (state) => {
    if (state) {
        return state.UserState;
    }
};

export const getUser = createSelector(userSelector, (user) => user);
