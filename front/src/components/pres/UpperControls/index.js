import React, { Component } from "react";
import { actions as salesActions } from "../../../modules/sales";
import { actions as brandActions } from "../../../modules/brands";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBrands, fetchSalesData } from "../../../services/api";
import MuiSelect from "@material-ui/core/Select";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import DownloadIcon from "@material-ui/icons/CloudDownload";
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
import Moment from "moment";
import moment from "moment";

class UpperControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBrand: null,
      openSideBar: false,
      period: "weekly",
      filterBySku: false,
      customDateRange: false,
      selectedSku: null,
      customDateStart: null,
      customDateEnd: null
    };
    this.setBrand = this.setBrand.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
    this.toggleFilterBySku = this.toggleFilterBySku.bind(this);
    this.toggleCustomDateRange = this.toggleCustomDateRange.bind(this);
    this.changeSelectedSku = this.changeSelectedSku.bind(this);
    this.download = this.download.bind(this);
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
    this.setState({ selectedBrand: value });
  }

  changePeriod(value) {
    this.setState({ period: value });
  }

  toggleFilterBySku(checked) {
    if (checked === true) this.setState({ filterBySku: checked });
    if (checked === false)
      this.setState({ filterBySku: checked, selectedSku: null });
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

  fetchData(brand, period, sku) {
    const { customDateEnd, customDateStart } = this.state;
    let data = {
      brand: brand,
      byMonth: period === "weekly" ? false : true
      // customDateStart,
      // customDateEnd
    };
    const validateWithInDate = (date, sDate, nDate) => {
      const compareDate = new Date(date).getTime()
      const startDate = new Date(sDate).getTime()
      const endDate = new Date(nDate).getTime()
      // omitting the optional third parameter, 'units'
      return compareDate <= endDate && compareDate >= startDate  //false in this case
    };
    if (sku) {
      data.sku = sku;
    }

    fetchSalesData(data).then(data => {
      const payload = {...data};
      payload.itemized = data.itemized.filter(d => {
        if (validateWithInDate(d.date, customDateStart, customDateEnd)) {
          payload.summary.totalRevenue += Number(d.revenue);
          payload.summary.totalCost += Number(d.wholesale_cost);
          payload.summary.unitsSold += Number(d.units_sold);
          payload.summary.totalAdSpend += Number(d.adSales);
          payload.summary.averageAcos += Number(d.acos);
        }
        return (validateWithInDate(d.date, customDateStart, customDateEnd) || !customDateEnd || !customDateStart);
      });
      console.log("TCL: UpperControls -> fetchData -> payload", payload)
      this.props.saleSetData(payload)
    });
  }

  componentDidMount() {
    fetchBrands().then(data => this.props.brandSetData(data));
  }

  render() {
    return (
      <div className={s.controlsContainer}>
        <Grid container>
          <Grid item xs={9} className={s.gridItem}>
            <p className={s.dashboardLabel}>
              {" "}
              <b>Brand Overview Dashboard:</b> {this.state.selectedBrand}
            </p>
          </Grid>
          <Grid item xs={3} className={s.gridItem}>
            <SettingsIcon
              onClick={() => this.setState({ openSideBar: true })}
              className={s.menuOpen}
            />
            <DownloadIcon
              onClick={() => this.download()}
              className={s.menuOpen}
            />
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
                {this.props.brands.length != 0
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
                  checked={this.state.filterBySku}
                  onChange={e => this.toggleFilterBySku(e.target.checked)}
                  value="true"
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
                Filter by SKU
              </p>
            </Grid>
            <Grid item xs={6}>
              {this.state.filterBySku === true ? (
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
                onClick={() =>
                  this.fetchData(this.state.selectedBrand, this.state.period)
                }
                variant="contained"
                className={s.button}
              >
                Generate Report
              </Button>
            </Grid>
          </Grid>
        </Drawer>
      </div>
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
