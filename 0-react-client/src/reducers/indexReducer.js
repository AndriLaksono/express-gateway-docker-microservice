import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import userData from './userDataReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    dash: dashboardReducer,
    user: userData
});