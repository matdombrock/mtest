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
    this.changePeriod = this.changePeriod.bind(this);
    this.togglecomparison = this.togglecomparison.bind(this);
    this.toggleCustomDateRange = this.toggleCustomDateRange.bind(this);
    this.changeSelectedSku = this.changeSelectedSku.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    fetchBrands().then((data) => this.props.brandSetData(data));
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeTab !== prevProps.activeTab) {
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
    const { activeTab } = this.props;
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
    // const fakePeriod = {
    //   summary: {
    //     acos: 0,
    //     ad_clicks: 0,
    //     ad_impressions: 0,
    //     ad_orders: 0,
    //     ad_sales: 0,
    //     ad_spend: 0,
    //     asin: "N/A",
    //     average_cpc: 0,
    //     conversion_rate: 0,
    //     item_number: "N/A",
    //     percent_total_sales: 0,
    //     sales: 0,
    //     shipped_cogs: 0,
    //     sku: "N/A",
    //     units_sold: 0,
    //     average_selling_price: 0,
    //   },
    // };
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
    if (activeTab === 2) {
      brand &&
        fetchSalesDataBySKU(data)
          .then((data) => {
            if (!data) throw Object.assign(new Error("Error"), { code: 402 });
            if (data.status !== 200) {
              // this.props.setSKUData({});
              this.props.setError(data.message);
            } else {
              this.props.setError(false);
              const payload = data;
              payload.periods = data?.periods?.map((d) => ({
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
              payload.yoy = data?.yoy?.map((d) => ({
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
              console.log("UpperControls -> fetchData -> payload", payload);
              this.props.setSKUData(payload);
            }
            this.props.setLoadingData(false);
          })
          .catch((error) => {
            this.props.setLoadingData(false);
            console.log("request failed", error);
            this.props.setError("Something went wrong please try again");
          });
    } else {
      brand &&
        fetchSalesData(data)
          .then((data) => {
            if (!data) throw Object.assign(new Error("Error"), { code: 402 });
            if (data.status !== 200) {
              this.props.saleSetData();
              this.props.setError(data.message);
            } else {
              this.props.setError(false);
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
              console.log("UpperControls -> fetchData -> payload", payload);
              this.props.saleSetData(payload);
            }
            this.props.setLoadingData(false);
          })
          .catch((error) => {
            this.props.setLoadingData(false);
            console.log("request failed", error);
            this.props.setError("Something went wrong please try again");
          });
    }

    // if (comparison) {
    //   const dataSecond = {
    //     brand: brand,
    //     byMonth: period === "weekly" ? false : true,
    //     startDate: moment(customDateStart)
    //       .startOf("day")
    //       .toISOString(),
    //     endDate: moment(customDateEnd)
    //       .startOf("day")
    //       .toISOString()
    //   };
    //   if (activeTab === 1) {
    //     // dataSecond.period =
    //     //   selectedDateRange === "lastMonth"
    //     //     ? "last-month"
    //     //     : selectedDateRange === "last7Days"
    //     //     ? "7"
    //     //     : selectedDateRange === "last14Days"
    //     //     ? "14"
    //     //     : selectedDateRange === "this30Days"
    //     //     ? "30"
    //     //     : selectedDateRange === "lastWeek"
    //     //     ? "last-week"
    //     //     : selectedDateRange === "currentMonth"
    //     //     ? "current-month"
    //     //     : "yesterday";
    //     // brand &&
    //     //   fetchSalesDataBySKU(dataSecond)
    //     //     .then(data => {
    //     //       if (!data) throw false;
    //     //       this.props.setError(false);
    //     //       if (data.status !== 200) {
    //     //         this.props.setSKUComparisonData({});
    //     //         this.props.setError(data.message);
    //     //       } else {
    //     //         const payload = data;
    //     //         this.props.setSKUComparisonData(payload);
    //     //       }
    //     //       this.props.setLoadingData(false);
    //     //     })
    //     //     .catch(error => {
    //     //       this.props.setLoadingData(false);
    //     //       console.log("request failed", error);
    //     //       this.props.setError("Something went wrong please try again");
    //     //     });
    //   } else {
    //     brand &&
    //       fetchSalesData(dataSecond)
    //         .then(data => {
    //           if (!data) throw false;
    //           this.props.setError(false);
    //           if (data.status !== 200) {
    //             const payload = {
    //               summary: {
    //                 totalRevenue: "0",
    //                 totalCost: "0",
    //                 unitsSold: 0,
    //                 totalAdSpend: 0,
    //                 totalAdSales: 0,
    //                 averageAcos: "0"
    //               },
    //               period: "weekly",
    //               itemized: [
    //                 {
    //                   revenue: "0",
    //                   average_selling_price: "0",
    //                   wholesale_cost: "0",
    //                   units_sold: 0,
    //                   date: new Date(),
    //                   impressions: 0,
    //                   clicks: 0,
    //                   spend: 0,
    //                   orders: 0,
    //                   adSales: 0,
    //                   average_cpc: "0",
    //                   acos: "0",
    //                   cvr: "0"
    //                 }
    //               ]
    //             };
    //             this.props.setSecondData(payload);
    //           } else {
    //             const payload = data;
    //             this.props.setSecondData(payload);
    //           }
    //           this.props.setLoadingData(false);
    //         })
    //         .catch(error => {
    //           console.log("request failed", error);
    //           this.props.setError("Something went wrong please try again");
    //           this.props.setLoadingData(false);
    //         });
    //   }
    // }
    this.setState({ showDropDown: false });
    // this.props.setDates(startDate, endDate);
    // if (comparison) {
    //   this.props.setDates(startDate, endDate, customDateStart, customDateEnd);
    // } else {
    // this.props.setSKUComparisonData({});
    // this.props.setSecondData({});
    // }
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
            <Grid item xs={1}>
              <img className={s.modaLogo} src='/img/logo.png' alt='moda logo' />
            </Grid>
            <Grid item xs={5} className={s.gridItem} style={{ paddingLeft: '100px' }}>
              <p className={s.dashboardLabel}>
                {" "}
                {this.props.activeTab === 0 ? (
                  <>
                    Brand Overview Dashboard: {capitalize.words(this.state.selectedBrand ? this.state.selectedBrand.toLowerCase() : '')}
                  </>
                ) : (
                    <>
                      SKU Overview: {capitalize.words(this.state.selectedBrand ? this.state.selectedBrand.toLowerCase() : '')}
                    </>
                  )}
              </p>
            </Grid>
            <Grid item xs={6} className={[s.gridItem, s["menu-container"]]} >
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
                      {/* {this.props.activeTab !== 1 && ( */}
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

                      {/* {this.props.activeTab !== 1 && (
                      )} */}
                      {/* {this.state.comparison && (
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
                      )} */}
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
              {!isCustomVisible && this.props.activeTab === 0 && (
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
                    this.state.selectedBrand
                      ? this.state.selectedBrand
                      : "SELECT BRAND"
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  sales: state.sales,
  brands: state.brands,
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