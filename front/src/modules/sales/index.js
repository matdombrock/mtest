import _ from 'lodash';

const SET_SALES_DATA = 'sale/SET_SALES_DATA'

const initialState = {};

export default (state = initialState, action) => {
    state = _.cloneDeep(state);
    switch (action.type) {
        case SET_SALES_DATA:
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
            type: SET_SALES_DATA,
            data
        })
    }
}

export const actions = {
    saleSetData: setData
};
