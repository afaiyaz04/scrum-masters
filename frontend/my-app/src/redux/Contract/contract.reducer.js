import { SET_CONTRACT, DELETE_CONTRACT } from "redux/Contract/contract.types";

const INITIAL_STATE = null;

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CONTRACT:
      return action.payload;
    case DELETE_CONTRACT:
      return null;
    default:
      return state;
  }
};

export default reducer;
