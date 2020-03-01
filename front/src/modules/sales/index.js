import _ from "lodash";

const SET_SALES_DATA = "sale/SET_SALES_DATA";
const SET_SALES_COMPARISONS_DATA = "sale/SET_SALES_COMPARISONS_DATA";
const SET_SKU_DATA = "sale/SET_SKU_DATA";
const SET_SKU_DATA_COMPARISONS = "sale/SET_SKU_DATA_COMPARISONS";
const initialState = {
  active: {},
  comparisons: {},
  skuActive: {},
  skuComparisons: {}
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
  const total = { totalSale: 0 };
  data.map(d => {
    total.totalSale += Number(d.sales);
    return false
  });
  return dispatch => {
    dispatch({
      type: SET_SKU_DATA,
      data: { total, data }
    });
  };
};

const setSKUComprisionData = data => {
  const total = { totalSale: 0 };
  data.map(d => {
    total.totalSale += Number(d.sales);
    return false
  });
  return dispatch => {
    dispatch({
      type: SET_SKU_DATA_COMPARISONS,
      data: { total, data }
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
  setSecondData,
  setSKUComprisionData,
  setSKUData
};
