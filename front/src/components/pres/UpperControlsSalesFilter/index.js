import React, { Component } from "react";
import { actions as salesActions } from "../../../modules/sales";
import { actions as brandActions } from "../../../modules/brands";
import { actions as dashboardActions } from "../../../modules/dashboardReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchBrands,
  fetchSalesData
} from "../../../services/api";
import MuiSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import s from "./style.module.scss";
import DateFnsUtils from "@date-io/date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class UpperControlsSalesFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBrand: null,
      openSideBar: false,
      period: "weekly",
      comparison: false,
      customDateRange: false,
      isError: false,
      selectedSku: null,
      customDateStart: moment().subtract(2, "weeks").startOf("isoWeek"),
      customDateEnd: moment().subtract(2, "weeks").endOf("isoWeek"),
      startDate: null,
      endDate: null,
      selectedDateRange: "lastWeek",
      displayDateRange: "lastWeek",
      periodsCount: 2,
      isYOY: false,
      isStartDateVisible: false,
      isEndDateVisible: false,
      isCustomStartDateVisible: false,
      isCustomEndDateVisible: false,
    };
    this.setBrand = this.setBrand.bind(this);
    this.setError = this.setError.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
    this.togglecomparison = this.togglecomparison.bind(this);
    this.toggleCustomDateRange = this.toggleCustomDateRange.bind(this);
    this.changeSelectedSku = this.changeSelectedSku.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidMount() {

    fetchBrands().then((data) => {
      let sortedBrands = data.sort(this.brandsSortingComparer);
      this.props.brandSetData(sortedBrands);
    });

    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.activeTab !== prevProps.dashboard.activeTab) {
      this.fetchData();
    }
    if (
      this.props.brands.length !== prevProps.brands.length &&
      this.props.brands.length === 1
    ) {
      this.setState({ selectedBrand: this.props.brands[0].brand_name }, () =>
        this.fetchData()
      );
    }
  }

  brandsSortingComparer(a, b) {
    if (a.brand_name.toLowerCase() < b.brand_name.toLowerCase()) {
      return -1;
    }
    if (a.brand_name.toLowerCase() > b.brand_name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  download() {
    const filename = "report.pdf";
    html2canvas(document.getElementById("#report")).then((canvas) => {
      let pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
      pdf.save(filename);
    });
  }

  setBrand(value) {
    this.setState({ selectedBrand: value });
    this.props.setDashboardSelectedBrand({selectedBrand:value});
  }

  setError = (isError) => this.setState({ isError });

  setPeriods(value) {
    this.setState({ periodsCount: value });
  }

  changePeriod(value) {
    this.setState({ period: value });
  }

  togglecomparison(checked) {
    if (checked === true) this.setState({ comparison: checked });
    if (checked === false)
      this.setState({ comparison: checked, selectedSku: null });
  }

  toggleCustomDateRange(checked) {
    this.setState({
      customDateRange: checked,
      customDateStart: null,
      customDateEnd: null,
    });
  }

  setCustomDateStart(e) {
    this.setState({ customDateStart: e });
  }

  setCustomDateEnd(e) {
    this.setState({ customDateEnd: e });
  }

  changeSelectedSku(e) {
    this.setState({ selectedSku: e.target.value });
  }

  fetchData = () => {
    const {
      selectedBrand: brand,
      // period,
      selectedDateRange,
      periodsCount,
      startDate,
      endDate,
      customDateEnd,
      customDateStart,
      compareType,
      compareToPrevious,
    } = this.state;
    const isYOY = compareToPrevious && compareType === "previous-range";
    if (brand) {
      this.props.setLoadingData(true);
    }
    const { activeTab } = this.props.dashboard;
    const payload = {
      displayDateRange: selectedDateRange,
    };
    let data = {
      brand: brand,
      // byMonth: period === "weekly" ? false : true,
      period_count: periodsCount,
      load_yoy: isYOY,
    };
    if (selectedDateRange !== "custom") {
      payload.startDate = null;
      payload.endDate = null;
    } else {
      data.custom_period = {
        start: moment(startDate).format("YYYY-MM-DD"),
        end: moment(endDate).format("YYYY-MM-DD"),
      };
    }
    if (compareType !== "custom-range" || !compareToPrevious) {
      payload.customDateStart = null;
      payload.customDateEnd = null;
    } else {
      data.custom_compare_period = {
        start: moment(customDateStart).format("YYYY-MM-DD"),
        end: moment(customDateEnd).format("YYYY-MM-DD"),
      };
    }
    
    this.setState({
      ...payload,
    });

    data.period =
      selectedDateRange === "lastMonth"
        ? "last-month"
        : selectedDateRange === "last7Days"
          ? "7-days"
          : selectedDateRange === "last14Days"
            ? "14-days"
            : selectedDateRange === "this30Days"
              ? "30-days"
              : selectedDateRange === "lastWeek"
                ? "last-week"
                : selectedDateRange === "currentMonth"
                  ? "current-month"
                  : "yesterday";

    const setPeriodDataForSKU = () => {
      data.period_count = 1
      return data
    }

    if (activeTab === "SKU") {
      brand &&
        fetchSalesData(setPeriodDataForSKU())
          .then((data) => {
            if (!data) throw Object.assign(new Error("Error"), { code: 402 });
            if (data.status !== 200) {
              // this.props.setSKUData({});
              this.setError(data.message);
            } else {
              this.setError(false);
              const payload = data;
              payload.periods = data?.data?.periods?.map((d) => ({
                ...d,
                summary: {
                  ...d?.summary,
                  acos: d?.summary?.acos,
                  average_cpc: d?.summary?.averageg_cpc,
                  average_selling_price: d?.summary?.average_selling_price
                },
                itemized: d.itemized.map((o) => ({
                  ...o,
                  acos: o?.acos,
                  average_cpc: o?.average_cpc,
                  average_selling_price: o?.average_selling_price
                })),
              }));
              payload.yoy = data?.data?.yoy?.map((d) => ({
                ...d,
                summary: {
                  ...d?.summary,
                  acos: d?.summary?.acos,
                  average_cpc: d?.summary?.average_cpc,
                  average_selling_price: d?.summary?.average_selling_price
                },
                itemized: d?.itemized?.map((o) => ({
                  ...o,
                  acos: o?.acos,
                  average_cpc: o?.averageg_cpc,
                  average_selling_price: o?.average_selling_price
                })),
              }));

              if (!isYOY) payload.yoy = [];
              console.log("UpperControls -> fetchData -> payload", payload);
              this.props.setSKUData(payload);
            }
            this.props.setLoadingData(false);
          })
          .catch((error) => {
            this.props.setLoadingData(false);
            console.log("request failed", error);
            this.setError("Something went wrong please try again");
          });
    } else {
      brand &&
        fetchSalesData(data)
          .then((data) => {
            if (!data) throw Object.assign(new Error("Error"), { code: 402 });
            if (data.status !== 200) {
              this.props.saleSetData();
              this.setError(data.message);
            }
            else {
              this.setError(false);
              const payload = data;
              payload.periods = data.data?.periods?.map((d) => ({
                ...d,
                summary: {
                  ...d.summary,
                  acos: d.summary.ad_sales
                    ? (d.summary.ad_spend / d.summary.ad_sales) * 100
                    : 0,
                  average_cpc: d.summary.ad_clicks
                    ? d.summary.ad_spend / d.summary.ad_clicks
                    : 0,
                  average_selling_price: d.summary.units_sold
                    ? d.summary.ad_sales / d.summary.units_sold
                    : 0
                },
                itemized: d.itemized.map((o) => ({
                  ...o,
                  acos: o.ad_sales ? (o.ad_spend / o.ad_sales) * 100 : 0,
                  average_cpc: o.ad_clicks ? o.ad_spend / o.ad_clicks : 0,
                  average_selling_price: o.units_sold
                    ? o.ad_sales / o.units_sold
                    : 0
                })),
              }));
              payload.yoy = data.data?.yoy?.map((d) => ({
                ...d,
                summary: {
                  ...d.summary,
                  acos: d.summary.ad_sales
                    ? (d.summary.ad_spend / d.summary.ad_sales) * 100
                    : 0,
                  average_cpc: d.summary.ad_clicks
                    ? d.summary.ad_spend / d.summary.ad_clicks
                    : 0,
                  average_selling_price: d.summary.units_sold
                    ? d.summary.ad_sales / d.summary.units_sold
                    : 0
                },
                itemized: d.itemized.map((o) => ({
                  ...o,
                  acos: o.ad_sales ? (o.ad_spend / o.ad_sales) * 100 : 0,
                  average_cpc: o.ad_clicks ? o.ad_spend / o.ad_clicks : 0,
                  average_selling_price: o.units_sold
                    ? o.ad_sales / o.units_sold
                    : 0
                })),
              }));
              if (!isYOY) payload.yoy = [];
              this.props.saleSetData(payload);
            }
            this.props.setLoadingData(false);
          })
          .catch((error) => {
            this.props.setLoadingData(false);
            console.log("request failed", error);
            this.setError("Something went wrong please try again");
          });
    }

    this.setState({ showDropDown: false });
  };

  handleUpdateState = (key, value) => this.setState({ [key]: value });

  handleChangeCustomDateRange = (value) => {
    this.setState({
      selectedDateRange: value,
      startDate: moment().subtract(1, "months"),
      endDate: moment().subtract(1, "days"),
    });
    setTimeout(() => {
      this.setState({ isStartDateVisible: true });
    }, 0);
  };

  handleYesterday = () => {
    this.setState({
      selectedDateRange: "yesterday",
    });
  };

  handleLastWeek = () => {
    this.setState({
      selectedDateRange: "lastWeek",
    });
  };

  handleLast7Days = () => {
    this.setState({
      selectedDateRange: "last7Days",
    });
  };

  handleThis30Days = () => {
    this.setState({
      selectedDateRange: "this30Days",
    });
  };

  handleLast14 = () => {
    this.setState({
      selectedDateRange: "last14Days",
    });
  };

  handleLastMonth = () => {
    this.setState({
      selectedDateRange: "lastMonth",
    });
  };

  handleCurrentMonth = () => {
      
    this.setState({
      selectedDateRange: "currentMonth",
    });
  };

  dashboardIsBrand = () => this.props.dashboard.activeTab === "BRAND-TAB";

  render() {
    const {
      startDate,
      endDate,
      showDropDown,
      selectedDateRange,
      displayDateRange,
      customDateStart,
      customDateEnd,
      isStartDateVisible,
      isEndDateVisible,
      isCustomEndDateVisible,
      isCustomStartDateVisible,
      compareType,
    } = this.state;


    const isCustomVisible = this.props.sales.isComparison;
    const activeSelectedDateRange = selectedDateRange || displayDateRange;

    return (
      <>
              <div className={s["position-relative"]} >
                <div
                  onClick={() =>
                    this.handleUpdateState("showDropDown", !showDropDown)
                  }
                  className={s["position-relative"]}
                >
                  {" "}
                  {/* <EventNoteIcon className={s.menuOpen} />{" "} */}
                  <p style={{ textTransform: "capitalize" }}>
                    {displayDateRange === "custom"
                      ? isCustomVisible
                        ? `${moment(startDate).format(
                          "MMM DD, YYYY"
                        )} - ${moment(endDate).format(
                          "MMM DD, YYYY"
                        )} VS ${moment(customDateStart).format(
                          "MMM DD, YYYY"
                        )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                        : `${moment(startDate).format(
                          "MMM DD, YYYY"
                        )} - ${moment(endDate).format("MMM DD, YYYY")}`
                      : displayDateRange === "lastMonth"
                        ? isCustomVisible
                          ? `LAST MONTH VS ${moment(customDateStart).format(
                            "MMM DD, YYYY"
                          )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                          : "LAST MONTH"
                        : displayDateRange === "last7Days"
                          ? isCustomVisible
                            ? `LAST 7 DAYS VS ${moment(customDateStart).format(
                              "MMM DD, YYYY"
                            )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                            : "LAST 7 DAYS"
                          : displayDateRange === "last14Days"
                            ? isCustomVisible
                              ? `LAST 14 DAYS VS ${moment(customDateStart).format(
                                "MMM DD, YYYY"
                              )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                              : "LAST 14 DAYS"
                            : displayDateRange === "this30Days"
                              ? isCustomVisible
                                ? `LAST 30 DAYS VS ${moment(customDateStart).format(
                                  "MMM DD, YYYY"
                                )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                                : "LAST 30 DAYS"
                              : displayDateRange === "lastWeek"
                                ? isCustomVisible
                                  ? `LAST WEEK VS ${moment(customDateStart).format(
                                    "MMM DD, YYYY"
                                  )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                                  : "LAST WEEK"
                                : displayDateRange === "currentMonth"
                                  ? isCustomVisible
                                    ? `CURRENT MONTH VS ${moment(customDateStart).format(
                                      "MMM DD, YYYY"
                                    )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                                    : "CURRENT MONTH"
                                  : isCustomVisible
                                    ? `YESTERDAY VS ${moment(customDateStart).format(
                                      "MMM DD, YYYY"
                                    )} - ${moment(customDateEnd).format("MMM DD, YYYY")}`
                                    : "YESTERDAY"}
                  </p>
                  <ExpandMoreIcon className={s.menuOpen} />
                </div>
                {showDropDown && (
                  <>
                    <div
                      className={s.back}
                      onClick={() =>
                        this.setState({
                          showDropDown: false,
                          selectedDateRange: "",
                        })
                      }
                    ></div>
                    <div className={s["custom-date-container"]}>
                      <div
                        className={
                          activeSelectedDateRange === "yesterday" &&
                          s["active-item"]
                        }
                        onClick={this.handleYesterday}
                      >
                        YESTERDAY
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "lastWeek" &&
                          s["active-item"]
                        }
                        onClick={this.handleLastWeek}
                      >
                        LAST WEEK
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "last7Days" &&
                          s["active-item"]
                        }
                        onClick={this.handleLast7Days}
                      >
                        LAST 7 DAYS
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "last14Days" &&
                          s["active-item"]
                        }
                        onClick={this.handleLast14}
                      >
                        LAST 14 DAYS
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "this30Days" &&
                          s["active-item"]
                        }
                        onClick={this.handleThis30Days}
                      >
                        LAST 30 DAYS
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "lastMonth" &&
                          s["active-item"]
                        }
                        onClick={this.handleLastMonth}
                      >
                        LAST MONTH
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "currentMonth" &&
                          s["active-item"]
                        }
                        onClick={this.handleCurrentMonth}
                      >
                        CURRENT MONTH
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "custom" &&
                          s["active-item"]
                        }
                        onClick={() => {
                          this.handleChangeCustomDateRange("custom");
                        }}
                      >
                        CUSTOM RANGE
                      </div>
                      {/* )} */}
                      {activeSelectedDateRange === "custom" && (
                        <>
                          <div className={s["item"]}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                label="Custom Date Start"
                                value={this.state.startDate}
                                onChange={(e) => {
                                  this.handleUpdateState("startDate", e);
                                  this.setState({
                                    isStartDateVisible: false,
                                    isEndDateVisible: true,
                                  });
                                }}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                open={isStartDateVisible}
                                onClose={(e) =>
                                  this.setState({ isStartDateVisible: false })
                                }
                                onOpen={(e) =>
                                  this.setState({ isStartDateVisible: true })
                                }
                                maxDate={moment().subtract(1, "days")}
                              />
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                label="Custom Date End"
                                value={this.state.endDate}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                onChange={(e) => {
                                  this.handleUpdateState("endDate", e);
                                  this.setState({ isEndDateVisible: false });
                                }}
                                open={isEndDateVisible}
                                onClose={(e) =>
                                  this.setState({ isEndDateVisible: false })
                                }
                                onOpen={(e) =>
                                  this.setState({ isEndDateVisible: true })
                                }
                                maxDate={moment().subtract(1, "days")}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </>
                      )}
                      <div className={s["item"]}>
                        <p className={s["comparison-input"]}>
                          <label className={s["comparison-input"]}>
                            {" "}
                            <input
                              type="checkbox"
                              checked={this.state.compareToPrevious}
                              onChange={(e) => {
                                this.setState({
                                  compareToPrevious: e.target.checked,
                                });
                                this.props.setComparison(
                                  !!e.target.checked &&
                                  compareType === "custom-range"
                                );
                              }}
                              value="true"
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                            />
                            <span>CUSTOM COMPARE</span>
                          </label>
                        </p>
                      </div>
                      {this.state.compareToPrevious && (
                        <>
                          <MuiSelect
                            variant="outlined"
                            onChange={(e) => {
                              this.setState({
                                compareType: e.target.value,

                                isYoy: e.target.value === "previous-range",
                              });
                              this.props.setComparison(
                                e.target.value === "custom-range"
                              );
                              setTimeout(
                                () =>
                                  this.setState({
                                    isCustomStartDateVisible: true,
                                  }),
                                10
                              );
                            }}
                            value={
                              this.state.compareType
                                ? this.state.compareType
                                : "Select Previous Type"
                            }
                            classes={{ root: "color-dark" }}
                            style={{ width: "100%" }}
                          >
                            <MenuItem value={"previous-range"}>
                              PREVIOUS PERIOD + YOY
                            </MenuItem>
                            <MenuItem value={"custom-range"}>
                              CUSTOM RANGE
                            </MenuItem>
                          </MuiSelect>
                          {/* )} */}
                          {isCustomVisible && (
                            <>
                              <div className={s["item"]}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    label="Custom Date Start"
                                    value={this.state.customDateStart}
                                    onChange={(e) => {
                                      this.handleUpdateState(
                                        "customDateStart",
                                        e
                                      );
                                      this.setState({
                                        isCustomStartDateVisible: false,
                                        isCustomEndDateVisible: true,
                                      });
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                    open={isCustomStartDateVisible}
                                    onClose={(e) =>
                                      this.setState({
                                        isCustomStartDateVisible: false,
                                      })
                                    }
                                    onOpen={(e) =>
                                      this.setState({
                                        isCustomStartDateVisible: true,
                                      })
                                    }
                                    maxDate={moment().subtract(1, "days")}
                                  />
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    label="Custom Date End"
                                    value={this.state.customDateEnd}
                                    onChange={(e) => {
                                      this.handleUpdateState(
                                        "customDateEnd",
                                        e
                                      );
                                      this.setState({
                                        isCustomEndDateVisible: false,
                                      });
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                    open={isCustomEndDateVisible}
                                    onClose={(e) =>
                                      this.setState({
                                        isCustomEndDateVisible: false,
                                      })
                                    }
                                    onOpen={(e) =>
                                      this.setState({
                                        isCustomEndDateVisible: true,
                                      })
                                    }
                                    maxDate={moment().subtract(1, "days")}
                                  />
                                </MuiPickersUtilsProvider>
                              </div>
                            </>
                          )}
                        </>
                      )}
                      <div className={s["item"]}>
                        <Button
                          onClick={() =>
                            this.setState({
                              showDropDown: false,
                              displayDateRange: selectedDateRange,
                            })
                          }
                          variant="contained"
                          className={s.button}
                        >
                          Apply
                        </Button>
                        <Button
                          onClick={() =>
                            this.setState({
                              showDropDown: false,
                              selectedDateRange: "",
                            })
                          }
                          variant="contained"
                          className={s.buttonWihtout}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {!isCustomVisible && this.dashboardIsBrand() && (
                <MuiSelect
                  variant="outlined"
                  onChange={(e) =>
                    e.target.value !== "SELECT PERIODS" &&
                    this.setPeriods(e.target.value)
                  }
                  value={
                    this.state.periodsCount
                      ? this.state.periodsCount
                      : "SELECT PERIODS"
                  }
                  classes={s["colo-grey"]}
                  style={btnStyleOutlined}
                >
                  <MenuItem key={1} value={"SELECT PERIODS"}>
                    SELECT PERIODS
                  </MenuItem>
                  {[...Array(25)].map(
                    (d, i) =>
                      i > 1 && (
                        <MenuItem key={i} value={i}>
                          {i} PERIODS
                        </MenuItem>
                      )
                  )}
                </MuiSelect>
              )}
              {this.props.brands.length > 1 && (
                <MuiSelect
                  variant="outlined"
                  onChange={(e) =>
                    e.target.value !== "SELECT BRAND" &&
                    this.setBrand(e.target.value)
                  }
                  value={
                    this.props.dashboard?.selectedBrand ? this.props.dashboard?.selectedBrand : "SELECT BRAND"
                  }
                  classes={s["colo-grey"]}
                  // style={{ marginRight: 10 }}
                  style={btnStyleOutlined}
                >
                  <MenuItem key={1} value={"SELECT BRAND"}>
                    SELECT BRAND
                  </MenuItem>
                  {this.props.brands.length !== 0
                    ? this.props.brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.brand_name.toUpperCase()}>
                        {brand.brand_name.toUpperCase()}
                      </MenuItem>
                    ))
                    : ""}
                </MuiSelect>
              )}
              <Button
                onClick={this.fetchData}
                variant="contained"
                // className={s.button}
                style={btnStyleContained}
              >
                Submit
              </Button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  sales: state.sales,
  brands: state.brands,
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...salesActions,
      ...brandActions,
      ...dashboardActions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpperControlsSalesFilter);

const btnStyleOutlined = {
  borderRadius: 0,
  border: '2px solid var(--teal-dark)',
  marginLeft: '15px'
}

const btnStyleContained = {
  borderRadius: 0,
  marginLeft: '15px',
  boxShadow: 'none',
  backgroundColor: 'var(--teal-dark)',
  color: '#fff',
  paddingLeft: '10px',
}