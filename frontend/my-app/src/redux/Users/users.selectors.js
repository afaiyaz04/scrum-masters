import { createSelector } from "reselect";

const usersSelector = (state) => {
	if (state) {
		return state.UsersState;
	}
};

export const getUsers = createSelector(usersSelector, (users) => users);


