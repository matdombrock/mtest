import _ from 'lodash';

const SET_USERS_DATA = 'sale/SET_USERS_DATA'

const initialState = [];

export default (state = initialState, action) => {
    state = _.cloneDeep(state);
    switch (action.type) {
        case SET_USERS_DATA:
            state = action.data; 
            break;
        default:
            break;
    }
    return state;
}

const setData = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_USERS_DATA,
            data
        })
    }
}

export const actions = {
    usersSetData: setData
};
