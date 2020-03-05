import React, { Component } from "react";
import { actions as salesActions } from "../../../modules/sales";
import { actions as brandActions } from "../../../modules/brands";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchBrands,
  fetchSalesData,
  fetchSalesDataBySKU
} from "../../../services/api";
import MuiSelect from "@material-ui/core/Select";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Drawer from "@material-ui/core/Drawer";
import Checkbox from "@material-ui/core/Checkbox";
import s from "./style.module.scss";
import DateFnsUtils from "@date-io/date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class UpperControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBrand: null,
      openSideBar: false,
      period: "weekly",
      comparison: false,
      customDateRange: false,
      selectedSku: null,
      customDateStart: moment()
        .subtract(2, "weeks")
        .startOf("isoWeek"),
      customDateEnd: moment()
        .subtract(2, "weeks")
        .endOf("isoWeek"),
      startDate: moment()
        .subtract(1, "weeks")
        .startOf("isoWeek"),
      endDate: moment()
        .subtract(1, "weeks")
        .endOf("isoWeek"),
      selectedDateRange: "lastWeek",
      displayDateRange: "lastWeek"
    };
    this.setBrand = this.setBrand.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
    this.togglecomparison = this.togglecomparison.bind(this);
    this.toggleCustomDateRange = this.toggleCustomDateRange.bind(this);
    this.changeSelectedSku = this.changeSelectedSku.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    fetchBrands().then(data => this.props.brandSetData(data));
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeTab !== prevProps.activeTab) {
      this.fetchData();
    }
  }
  download() {
    const filename = "report.pdf";
    html2canvas(document.getElementById("#report")).then(canvas => {
      let pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
      pdf.save(filename);
    });
  }

  setBrand(value) {
    this.setState({ selectedBrand: value }, () =>
      this.fetchData(this.state.selectedBrand, this.state.period)
    );
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
    if (checked === false) this.setState({ customDateRange: checked });
    if (checked === true)
      this.setState({
        customDateRange: checked,
        customDateStart: null,
        customDateEnd: null
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
      comparison,
      customDateStart,
      customDateEnd,
      startDate,
      endDate,
      selectedBrand: brand,
      period,
      selectedDateRange
    } = this.state;
    const { activeTab } = this.props;
    this.setState({
      displayDateRange: selectedDateRange
    });
    let data = {
      brand: brand,
      byMonth: period === "weekly" ? false : true,
      startDate: moment(startDate)
        .startOf("day")
        .toISOString(),
      endDate: moment(endDate)
        .startOf("day")
        .toISOString()
    };
    if (activeTab === 1) {
      brand &&
        fetchSalesDataBySKU(data).then(data => {
          if (data.status !== 200) {
            return this.props.setError(data.message);
          } else {
            this.props.setError(false);
            const payload = data;
            this.props.setSKUData(payload);
          }
        });
    } else {
      brand &&
        fetchSalesData(data).then(data => {
          if (data.status !== 200) {
            return this.props.setError(data.message);
          } else {
            this.props.setError(false);
            const payload = data;
            this.props.saleSetData(payload);
          }
        });
    }

    if (comparison) {
      const dataSecond = {
        brand: brand,
        byMonth: period === "weekly" ? false : true,
        startDate: moment(customDateStart)
          .startOf("day")
          .toISOString(),
        endDate: moment(customDateEnd)
          .startOf("day")
          .toISOString()
      };
      if (activeTab === 1) {
        brand &&
          fetchSalesDataBySKU(dataSecond).then(data => {
            this.props.setError(false);
            if (data.status !== 200) {
              return this.props.setError(data.message);
            } else {
              const payload = data;
              this.props.setSKUComparisonData(payload);
            }
          });
      } else {
        brand &&
          fetchSalesData(dataSecond).then(data => {
            this.props.setError(false);
            if (data.status !== 200) {
              const payload = {
                summary: {
                  totalRevenue: "0",
                  totalCost: "0",
                  unitsSold: 0,
                  totalAdSpend: 0,
                  totalAdSales: 0,
                  averageAcos: "0"
                },
                period: "weekly",
                itemized: [
                  {
                    revenue: "0",
                    average_selling_price: "0",
                    wholesale_cost: "0",
                    units_sold: 0,
                    date: new Date(),
                    impressions: 0,
                    clicks: 0,
                    spend: 0,
                    orders: 0,
                    adSales: 0,
                    average_cpc: "0",
                    acos: "0",
                    cvr: "0"
                  }
                ]
              };

              this.props.setSecondData(payload);
            } else {
              const payload = data;
              this.props.setSecondData(payload);
            }
          });
      }
    }
    this.setState({ showDropDown: false });
    if (comparison) {
      this.props.setDates(startDate, endDate, customDateStart, customDateEnd);
    } else {
      this.props.setDates(startDate, endDate);
      this.props.setSKUComparisonData({});
      this.props.setSecondData({});
    }
  };

  handleUpdateState = (key, value) => this.setState({ [key]: value });
  handleToday = () => {
    const dates = [moment(), moment()];
    const comparisonDate = [moment().subtract(1, "days"), moment()];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "today"
    });
  };
  handleYesterday = () => {
    const dates = [moment().subtract(1, "days"), moment().subtract(1, "days")];
    const comparisonDate = [
      moment().subtract(2, "days"),
      moment().subtract(1, "days")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "yesterday"
    });
  };
  handleLastWeek = () => {
    const dates = [
      moment()
        .subtract(1, "weeks")
        .startOf("isoWeek"),
      moment()
        .subtract(1, "weeks")
        .endOf("isoWeek")
    ];
    const comparisonDate = [
      moment()
        .subtract(2, "weeks")
        .startOf("isoWeek"),
      moment()
        .subtract(2, "weeks")
        .endOf("isoWeek")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "lastWeek"
    });
  };
  handleLast7Days = () => {
    const dates = [moment().subtract(6, "days"), moment()];
    const comparisonDate = [
      moment().subtract(12, "days"),
      moment().subtract(6, "days")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "last7Days"
    });
  };
  handleThis30Days = () => {
    const dates = [moment().subtract(29, "days"), moment()];
    const comparisonDate = [
      moment().subtract(59, "days"),
      moment().subtract(29, "days")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "this30Days"
    });
  };
  handleThisMonth = () => {
    const dates = [moment().startOf("month"), moment().endOf("month")];
    const comparisonDate = [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "thisMonth"
    });
  };
  handleLast14 = () => {
    const dates = [moment().subtract(13, "days"), moment()];
    const comparisonDate = [
      moment().subtract(29, "days"),
      moment().subtract(14, "days")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "last14Days"
    });
  };
  handleLastMonth = () => {
    const dates = [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ];
    const comparisonDate = [
      moment()
        .subtract(2, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .startOf("month")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "lastMonth"
    });
  };
  handleCurrentMonth = () => {
    const dates = [moment().startOf("month"), moment()];
    const comparisonDate = [
      moment()
        .subtract(2, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .startOf("month")
    ];
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      customDateStart: comparisonDate[0],
      customDateEnd: comparisonDate[1],
      selectedDateRange: "currentMonth"
    });
  };
  render() {
    const {
      startDate,
      endDate,
      showDropDown,
      selectedDateRange,
      displayDateRange
    } = this.state;
    const activeSelectedDateRange = selectedDateRange || displayDateRange;
    return (
      <>
        <div className={s.controlsContainer}>
          <Grid container>
            <Grid item xs={4} className={s.gridItem}>
              <p className={s.dashboardLabel}>
                {" "}
                {this.props.activeTab === 0 ? (
                  <>
                    <b>Brand Overview Dashboard:</b> {this.state.selectedBrand}
                  </>
                ) : (
                  <>
                    <b>SKU Overview:</b> {this.state.selectedBrand}
                  </>
                )}
              </p>
            </Grid>
            <Grid item xs={8} className={[s.gridItem, s["menu-container"]]}>
              <div className={s["position-relative"]}>
                <div
                  onClick={() =>
                    this.handleUpdateState("showDropDown", !showDropDown)
                  }
                  className={s["position-relative"]}
                >
                  {" "}
                  <EventNoteIcon className={s.menuOpen} />{" "}
                  <p>
                    {displayDateRange === "custom"
                      ? `${moment(startDate).format("MMM DD, YYYY")} - ${moment(
                          endDate
                        ).format("MMM DD, YYYY")}`
                      : displayDateRange === "lastMonth"
                      ? "Last Month"
                      : displayDateRange === "last7Days"
                      ? "last 7 Days"
                      : displayDateRange === "last14Days"
                      ? "Last 14 Days"
                      : displayDateRange === "this30Days"
                      ? "Last 30 Days"
                      : displayDateRange === "lastWeek"
                      ? "Last Week"
                      : displayDateRange === "currentMonth"
                      ? "Current Month"
                      : "yesterday"}
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
                          selectedDateRange: ""
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
                        Yesterday
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "lastWeek" &&
                          s["active-item"]
                        }
                        onClick={this.handleLastWeek}
                      >
                        Last Week
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "last7Days" &&
                          s["active-item"]
                        }
                        onClick={this.handleLast7Days}
                      >
                        Last 7 Days
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "last14Days" &&
                          s["active-item"]
                        }
                        onClick={this.handleLast14}
                      >
                        Last 14 Days
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "this30Days" &&
                          s["active-item"]
                        }
                        onClick={this.handleThis30Days}
                      >
                        Last 30 Days
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "lastMonth" &&
                          s["active-item"]
                        }
                        onClick={this.handleLastMonth}
                      >
                        Last Month
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "currentMonth" &&
                          s["active-item"]
                        }
                        onClick={this.handleCurrentMonth}
                      >
                        Current Month
                      </div>
                      <div
                        className={
                          activeSelectedDateRange === "custom" &&
                          s["active-item"]
                        }
                        onClick={() => {
                          this.handleUpdateState("selectedDateRange", "custom");
                        }}
                      >
                        Custom Range
                      </div>
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
                                onChange={e =>
                                  this.handleUpdateState("startDate", e)
                                }
                                KeyboardButtonProps={{
                                  "aria-label": "change date"
                                }}
                              />
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                label="Custom Date End"
                                value={this.state.endDate}
                                onChange={e =>
                                  this.handleUpdateState("endDate", e)
                                }
                                KeyboardButtonProps={{
                                  "aria-label": "change date"
                                }}
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
                              checked={this.state.comparison}
                              onChange={e =>
                                this.togglecomparison(e.target.checked)
                              }
                              value="true"
                              inputProps={{
                                "aria-label": "primary checkbox"
                              }}
                            />
                            Compare to past
                          </label>
                        </p>
                      </div>
                      {this.state.comparison && (
                        <div className={s["item"]}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="yyyy-MM-dd"
                              margin="normal"
                              label="Custom Date Start"
                              value={this.state.customDateStart}
                              onChange={e => this.setCustomDateStart(e)}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="yyyy-MM-dd"
                              margin="normal"
                              label="Custom Date End"
                              value={this.state.customDateEnd}
                              onChange={e => this.setCustomDateEnd(e)}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      )}
                      <div className={s["item"]}>
                        <Button
                          onClick={this.fetchData}
                          variant="contained"
                          className={s.button}
                        >
                          Apply
                        </Button>
                        <Button
                          onClick={() =>
                            this.setState({
                              showDropDown: false,
                              selectedDateRange: ""
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
              <MuiSelect
                variant="outlined"
                onChange={e => this.setBrand(e.target.value)}
                value={
                  this.state.selectedBrand
                    ? this.state.selectedBrand
                    : "Select Brand"
                }
                classes={s["colo-grey"]}
              >
                <MenuItem key={1} value={"Select Brand"}>
                  Select Brand
                </MenuItem>
                {this.props.brands.length !== 0
                  ? this.props.brands.map(brand => (
                      <MenuItem key={brand.id} value={brand.brand_name}>
                        {brand.brand_name}
                      </MenuItem>
                    ))
                  : ""}
              </MuiSelect>
              {/* <MuiSelect
      variant="outlined"
      onChange={e => this.changePeriod(e.target.value)}
      value={this.state.period ? this.state.period : "Select Brand"}
      classes={s["colo-grey"]}
      defaultValue={period}
    >
      <MenuItem key={1} value={"Select Period"}>
        Total Period
      </MenuItem>
      <MenuItem key={"weekly"} value={"weekly"}>
        Weekly
      </MenuItem>
      <MenuItem key={"monthly"} value={"monthly"}>
        Monthly
      </MenuItem>
    </MuiSelect> */}
              {/* <Button
      
        variant='contained'
        className={s.button}
      >
        Generate Report
      </Button> */}
              {/* <SearchIcon
      onClick={() =>
        this.fetchData(this.state.selectedBrand, this.state.period)
      }
      className={s.menuOpenWith10}
    />
    <DownloadIcon
      onClick={() => this.download()}
      className={s.menuOpen}
    /> */}
            </Grid>
          </Grid>

          <Drawer
            anchor={"right"}
            open={this.state.openSideBar}
            onClose={() => this.setState({ openSideBar: false })}
          >
            <Grid container spacing={4} className={s.menu}>
              <Grid item xs={12}>
                <h3>Report Settings</h3>
                <hr />
              </Grid>
              <Grid item xs={6}>
                <p>Report Brand:</p>
                <MuiSelect
                  className={s.select}
                  variant="outlined"
                  onChange={e => this.setBrand(e.target.value)}
                  value={
                    this.state.selectedBrand
                      ? this.state.selectedBrand
                      : "Select Brand"
                  }
                >
                  <MenuItem key={1} value={"Select Brand"}>
                    Select Brand
                  </MenuItem>
                  {this.props.brands.length !== 0
                    ? this.props.brands.map(brand => (
                        <MenuItem key={brand.id} value={brand.brand_name}>
                          {brand.brand_name}
                        </MenuItem>
                      ))
                    : ""}
                </MuiSelect>
              </Grid>
              <Grid item xs={6}>
                <p>Report Period:</p>
                <RadioGroup
                  aria-label="Period"
                  name="period"
                  value={this.state.period}
                  onChange={e => this.changePeriod(e.target.value)}
                >
                  <FormControlLabel
                    value="weekly"
                    control={<Radio />}
                    label="Weekly"
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<Radio />}
                    label="Monthly"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <p style={{ width: "100%", margin: "0px" }}>
                  {" "}
                  <Checkbox
                    checked={this.state.comparison}
                    onChange={e => this.togglecomparison(e.target.checked)}
                    value="true"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                  Comparison between few reports
                </p>
              </Grid>
              <Grid item xs={6}>
                {this.state.comparison === true ? (
                  <TextField
                    label={"SKU"}
                    onChange={e => this.changeSelectedSku(e)}
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={6}>
                <p style={{ width: "100%", margin: "0px" }}>
                  {" "}
                  <Checkbox
                    checked={this.state.customDateRange}
                    onChange={e => this.toggleCustomDateRange(e.target.checked)}
                    value="true"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                  Custom Date Range
                </p>
              </Grid>
              <Grid item xs={6}>
                {this.state.customDateRange === true ? (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      label="Custom Date Start"
                      value={this.state.customDateStart}
                      onChange={e => this.setCustomDateStart(e)}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      label="Custom Date End"
                      value={this.state.customDateEnd}
                      onChange={e => this.setCustomDateEnd(e)}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={this.fetchData}
                  variant="contained"
                  className={s.button}
                >
                  Generate Report
                </Button>
              </Grid>
            </Grid>
          </Drawer>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  sales: state.sales,
  brands: state.brands
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...salesActions,
      ...brandActions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpperControls);
