import { createSelector } from "reselect";

const contactSelector = (state) => {
	if (state) {
		return state.contactState;
	}
};

export const getContacts = createSelector(contactSelector, (contacts) => contacts);


