import _ from 'lodash';

const SET_DASHBOARD_TAB = 'dashboard/SET_DASHBOARD_TAB'
const SET_DASHBOARD_SELECTED_BRAND = 'dashboard/SET_DASHBOARD_SELECTED_BRAND'

const initialState = {
    activeTab: "BRAND-TAB",
    selectedBrand: ""
};

export default (state = initialState, action) => {
    state = _.cloneDeep(state);
    switch (action.type) {
        case SET_DASHBOARD_TAB:{
            state.activeTab = action.data.activeTab === 0 ? "BRAND-TAB" : "SKU-TAB";
            break;
        }
        case SET_DASHBOARD_SELECTED_BRAND:{
            state.selectedBrand = action.data.selectedBrand;
            break;
        }
        default:
            break;
    }
    return state;
}

const setDashboardTab = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DASHBOARD_TAB,
            data
        })
    }
}

const setDashboardSelectedBrand = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DASHBOARD_SELECTED_BRAND,
            data
        })
    }
}

export const actions = {
    setDashboardTab: setDashboardTab,
    setDashboardSelectedBrand: setDashboardSelectedBrand
};
