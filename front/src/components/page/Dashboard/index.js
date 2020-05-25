import React, { Component } from "react";
import { actions as salesActions } from "../../../modules/sales";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UpperControls from "../../pres/UpperControls";
import DataDisplayCardGrid from "../../pres/DataDisplayCardGrid";
import DataDisplayItemizedTable from "../../pres/DataDisplayItemizedTable";
import DashboardNavigator from "../../pres/DashboardNavigator";
import TopBanner from './../../pres/TopBanner/topBanner';
import Grid from "@material-ui/core/Grid";
import Charts from "../../pres/Charts";
import ChartsV2 from "../../pres/ChartsV2";
import s from "./style.module.scss";
import DataDisplaySKUTable from "../../pres/DataDisplaySKU";
// import SKUCharts from "../../pres/SKUCharts";
// import DataDisplayCardGridSKU from "../../pres/DataDisplayCardGridSKU";
import Alert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";
// import { CSVLink } from "react-csv";

class Dashboard extends Component {
  state = {
    activeTab: 0,
    isError: false,
    startDate: null,
    endDate: null,
    comparisonStartDate: null,
    comparisonEndDate: null,
  };
  handleTabChange = (activeTab) => this.setState({ activeTab });
  setError = (isError) => this.setState({ isError });
  setDates = (
    startDate,
    endDate,
    comparisonStartDate = null,
    comparisonEndDate = null
  ) =>
    this.setState({
      startDate,
      endDate,
      comparisonEndDate,
      comparisonStartDate,
    });
  render() {
    const {
      sales: { active, comparisons, skuActive, isLoading },
    } = this.props;
    console.log("Dashboard -> render -> skuActive", skuActive);
    const { activeTab, isError, startDate, endDate } = this.state;
    return (
      <>
        <TopBanner />
        <div className={s.container}>

          <UpperControls
            activeTab={activeTab}
            setError={this.setError}
            setDates={this.setDates}
          />
          <Grid container className={s.gridContainer}>
            <Grid item className={s.item} xs={12}>
              <DashboardNavigator
                active={activeTab}
                changeTab={this.handleTabChange}
              />
            </Grid>
            {isLoading ? (
              <Grid item xs={12} className={s.innerWithPaddingTop}>
                <CircularProgress />
              </Grid>
            ) : (
                <Grid item xs={12} id="#report" className={s.inner}>
                  {isError && <Alert severity="warning">{isError}</Alert>}
                  {activeTab === 0 ? (
                    active && !!active.periods && !!active.periods.length ? (
                      <>
                        <DataDisplayCardGrid
                          data={active}
                          startDate={startDate}
                          endDate={endDate}
                        />
                        <ChartsV2 report={active} />
                        <DataDisplayItemizedTable
                          data={active}
                          comparisons={comparisons}
                        />
                      </>
                    ) : (
                        <p>No Record Found</p>
                      )
                  ) : (
                      <>
                        {skuActive.periods &&
                          skuActive.periods.length &&
                          skuActive.periods[0] &&
                          skuActive.periods[1] &&
                          ((skuActive.periods[0].itemized &&
                            skuActive.periods[0].itemized.length) ||
                            (skuActive.periods[1].itemized &&
                              skuActive.periods[1].itemized.length)) ? (
                            <>
                              {/* <DataDisplayCardGridSKU
                      data={skuActive}
                      comparisons={skuComparisons}
                      startDate={startDate}
                      endDate={endDate}
                      comparisonStartDate={comparisonStartDate}
                      comparisonEndDate={comparisonEndDate}
                    />
                    <SKUCharts data={skuActive} /> */}
                              <DataDisplaySKUTable
                                data={skuActive}
                              // comparisons={skuComparisons}
                              />
                            </>
                          ) : (
                            <p>No Record Found in SKU</p>
                          )}{" "}
                      </>
                    )}
                </Grid>
              )}
          </Grid>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  sales: state.sales,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...salesActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
