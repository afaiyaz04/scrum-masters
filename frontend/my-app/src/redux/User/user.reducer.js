import { SET_USER, DELETE_USER, SET_USER_DATA } from "./user.types";

// const INITIAL_STATE = { _id: "614180facb6259ce3427029f" };
const INITIAL_STATE = { authData: null };

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_USER:
			localStorage.setItem('user', JSON.stringify({ ...action?.data }));
			return { ...state, authData: action.data, loading: false, errors: null };

		case SET_USER_DATA:
			localStorage.setItem('userData', JSON.stringify({ ...action?.data }));
			return { ...state, authData: action.data, loading: false, errors: null };
			
		case DELETE_USER:
			return null;
		default:
			return state;
	}
};

export default reducer;
