import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import contactReducer from "./Contact/contact.reducer";
import usersReducer from "./Users/users.reducer";
import orderReducer from "./Order/order.reducer";
import productReducer from "./Product/product.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
  users: usersReducer,
  orders: orderReducer,
  products: productReducer,
});
