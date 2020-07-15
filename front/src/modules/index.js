import { combineReducers } from 'redux';
import sales from './sales';
import brands from './brands';
import users from './users';
import dashboard from './dashboardReducer';

export default combineReducers({
    sales,
    brands,
    users,
    dashboard
});
