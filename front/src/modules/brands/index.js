import _ from 'lodash';

const SET_BRAND_DATA = 'brand/SET_BRAND_DATA'

const initialState = [];

export default (state = initialState, action) => {
    state = _.cloneDeep(state);
    switch (action.type) {
        case SET_BRAND_DATA:
            state = action.data
            break;
        default:
            break;
    }
    return state;
}

const setData = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_BRAND_DATA,
            data
        })
    }
}

export const actions = {
    brandSetData: setData
};
