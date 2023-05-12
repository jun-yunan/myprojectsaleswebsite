import { combineReducers } from 'redux';
import getUserReducer from '~/Pages/Profile/profileSlice';
import signInReducer from '~/Pages/UserAuthentication/components/SignIn/signInSlice';

const rootReducer = combineReducers({
    getUser: getUserReducer,
    signIn: signInReducer,
});

export default rootReducer;
