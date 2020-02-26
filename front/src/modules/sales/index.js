import _ from "lodash";

const SET_SALES_DATA = "sale/SET_SALES_DATA";
const SET_SALES_COMPARISONS_DATA = "sale/SET_SALES_COMPARISONS_DATA";

const initialState = {
  active: {},
  comparisons: {}
};

export default (state = initialState, action) => {
  state = _.cloneDeep(state);
  switch (action.type) {
    case SET_SALES_DATA:
      state.active = action.data;
      break;
    case SET_SALES_COMPARISONS_DATA:
      state.comparisons = action.data;
      break;

    default:
      break;
  }
  return state;
};

const setData = data => {
  return dispatch => {
    dispatch({
      type: SET_SALES_DATA,
      data
    });
  };
};

const setSecondData = data => {
    return dispatch => {
      dispatch({
        type: SET_SALES_COMPARISONS_DATA,
        data
      });
    };
  };


export const actions = {
  saleSetData: setData,
  setSecondData
};
