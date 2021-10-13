import { CREATE_ORDER } from "../constants/actionTypes";

export default (order = [], action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return [...order, action.payload];
    default:
      return order;
  }
};
