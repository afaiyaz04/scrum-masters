import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import orderReducer from './Order/order.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    orderState: orderReducer
});

export default rootReducer;