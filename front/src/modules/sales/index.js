import _ from "lodash";

const SET_SALES_DATA = "sale/SET_SALES_DATA";
const SET_SALES_COMPARISONS_DATA = "sale/SET_SALES_COMPARISONS_DATA";
const SET_SKU_DATA = "sale/SET_SKU_DATA";
const SET_SKU_DATA_COMPARISONS = "sale/SET_SKU_DATA_COMPARISONS";
const SET_SALES_LOADING = "sale/SET_SALES_LOADING";
const initialState = {
  active: {},
  comparisons: {},
  skuActive: {},
  skuComparisons: {},
  isLoading: false
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
    case SET_SKU_DATA:
      state.skuActive = action.data;
      break;
    case SET_SKU_DATA_COMPARISONS:
      state.skuComparisons = action.data;
      break;
    case SET_SALES_LOADING:
      state.isLoading = action.data;
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

const setSKUData = data => {
  return dispatch => {
    dispatch({
      type: SET_SKU_DATA,
      data
    });
  };
};

const setSKUComparisonData = data => {
  return dispatch => {
    dispatch({
      type: SET_SKU_DATA_COMPARISONS,
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
const setLoadingData = data => {
  return dispatch => {
    dispatch({
      type: SET_SALES_LOADING,
      data
    });
  };
};

export const actions = {
  saleSetData: setData,
  setSecondData,
  setSKUComparisonData,
  setSKUData,
  setLoadingData
};
