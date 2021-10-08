import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import contactReducer from './Contact/contact.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactReducer,
});