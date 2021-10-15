import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import contactReducer from "./Contact/contact.reducer";
import usersReducer from "./Users/users.reducer";
import orderReducer from "./Order/order.reducer";
import transferReducer from "./Transfer/transfer.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactReducer,
    users: usersReducer,
    orders: orderReducer,
    transfers: transferReducer,
});
