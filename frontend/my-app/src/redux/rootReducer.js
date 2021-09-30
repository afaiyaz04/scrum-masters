import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import contactReducer from './Contact/contact.reducer'
import orderReducer from './Order/order.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    contact: contactReducer,
    orderState: orderReducer,
});

export default rootReducer;