import { combineReducers } from 'redux';
import sales from './sales';
import brands from './brands';
import users from './users';

export default combineReducers({
    sales,
    brands,
    users
});
