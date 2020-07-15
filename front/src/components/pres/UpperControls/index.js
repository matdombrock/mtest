import React, { Component } from "react";
import { actions as salesActions } from "../../../modules/sales";
import { actions as brandActions } from "../../../modules/brands";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchBrands,
  fetchSalesData,
  fetchSalesDataBySKU,
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
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import capitalize from 'capitalize'
import EventNoteIcon from "@material-ui/icons/EventNote";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import UpperControlsSalesFilter from './../UpperControlsSalesFilter';

class UpperControls extends Component {
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
  handleToday = () => {
    // const dates = [moment(), moment()];
    // const comparisonDate = [moment().subtract(1, "days"), moment()];
    this.setState({
      // startDate: null,
      // endDate: null,
      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "today",
    });
  };
  handleYesterday = () => {
    // const dates = [moment().subtract(1, "days"), moment().subtract(1, "days")];
    // const comparisonDate = [
    //   moment().subtract(2, "days"),
    //   moment().subtract(1, "days")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,
      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "yesterday",
    });
  };
  handleLastWeek = () => {
    // const dates = [
    //   moment().subtract(1, "weeks").startOf("isoWeek"),
    //   moment().subtract(1, "weeks").endOf("isoWeek"),
    // ];
    // const comparisonDate = [
    //   moment()
    //     .subtract(2, "weeks")
    //     .startOf("isoWeek"),
    //   moment()
    //     .subtract(2, "weeks")
    //     .endOf("isoWeek")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "lastWeek",
    });
  };
  handleLast7Days = () => {
    // const dates = [moment().subtract(6, "days"), moment()];
    // const comparisonDate = [
    //   moment().subtract(12, "days"),
    //   moment().subtract(6, "days"),
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "last7Days",
    });
  };
  handleThis30Days = () => {
    // const dates = [moment().subtract(29, "days"), moment()];
    // const comparisonDate = [
    //   moment().subtract(59, "days"),
    //   moment().subtract(29, "days")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "this30Days",
    });
  };
  handleThisMonth = () => {
    // const dates = [moment().startOf("month"), moment().endOf("month")];
    // const comparisonDate = [
    //   moment()
    //     .subtract(1, "month")
    //     .startOf("month"),
    //   moment()
    //     .subtract(1, "month")
    //     .endOf("month")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "thisMonth",
    });
  };
  handleLast14 = () => {
    // const dates = [moment().subtract(13, "days"), moment()];
    // const comparisonDate = [
    //   moment().subtract(29, "days"),
    //   moment().subtract(14, "days")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "last14Days",
    });
  };
  handleLastMonth = () => {
    // const dates = [
    //   moment().subtract(1, "month").startOf("month"),
    //   moment().subtract(1, "month").endOf("month"),
    // ];
    // const comparisonDate = [
    //   moment()
    //     .subtract(2, "month")
    //     .startOf("month"),
    //   moment()
    //     .subtract(1, "month")
    //     .startOf("month")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "lastMonth",
    });
  };
  handleCurrentMonth = () => {
    // const dates = [moment().startOf("month"), moment()];
    // const comparisonDate = [
    //   moment()
    //     .subtract(2, "month")
    //     .startOf("month"),
    //   moment()
    //     .subtract(1, "month")
    //     .startOf("month")
    // ];
    this.setState({
      // startDate: null,
      // endDate: null,

      // customDateStart: comparisonDate[0],
      // customDateEnd: comparisonDate[1],
      selectedDateRange: "currentMonth",
    });
  };

  dashboardIsBrand = () => this.props.dashboard.activeTab === "BRAND-TAB";

  dashboardIsSKU = () => this.props.dashboard.activeTab === "SKU-TAB";

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
        <div className={s.controlsContainer}>
          <Grid container style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <Grid item xs={2}>
              <a href='/'>
                <img className={s.modaLogo} src='/img/logo.png' alt='moda logo' />
              </a>
            </Grid>
            <Grid item xs={5} className={s.gridItem}>
              <p className={s.dashboardLabel}>
                {" "}
                {this.dashboardIsBrand() ? (
                  <>
                    Brand Overview Dashboard: {capitalize.words(this.props.dashboard?.selectedBrand?.toLowerCase() ?? '')}
                  </>
                ) : (
                    <>
                      SKU Overview: {capitalize.words(this.props.dashboard?.selectedBrand?.toLowerCase() ?? '')}
                    </>
                  )}
              </p>
            </Grid>

            <Grid item xs={5} className={[s.gridItem, s["menu-container"]]} >
              <UpperControlsSalesFilter/>
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
                  onChange={(e) => this.setBrand(e.target.value)}
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
                    ? this.props.brands.map((brand) => (
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
                  onChange={(e) => this.changePeriod(e.target.value)}
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
                    onChange={(e) => this.togglecomparison(e.target.checked)}
                    value="true"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  Comparison between few reports
                </p>
              </Grid>
              <Grid item xs={6}>
                {this.state.comparison === true ? (
                  <TextField
                    label={"SKU"}
                    onChange={(e) => this.changeSelectedSku(e)}
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
                    onChange={(e) =>
                      this.toggleCustomDateRange(e.target.checked)
                    }
                    value="true"
                    inputProps={{
                      "aria-label": "primary checkbox",
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
                      onChange={(e) => this.setCustomDateStart(e)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      label="Custom Date End"
                      value={this.state.customDateEnd}
                      onChange={(e) => this.setCustomDateEnd(e)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
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

        <Grid item xs={12}>
          {
            this.state.isError &&
            <Alert severity="warning">{this.state.isError}</Alert>
          }
        </Grid>
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpperControls);

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