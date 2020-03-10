import React, { Component } from "react";
import { actions as salesActions } from "../../../modules/sales";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UpperControls from "../../pres/UpperControls";
import DataDisplayCardGrid from "../../pres/DataDisplayCardGrid";
import DataDisplayItemizedTable from "../../pres/DataDisplayItemizedTable";
import LeftNavigationMenu from "../../pres/LeftNavigationMenu";
import Grid from "@material-ui/core/Grid";
import Charts from "../../pres/Charts";
import s from "./style.module.scss";
import DataDisplaySKUTable from "../../pres/DataDisplaySKU";
// import SKUCharts from "../../pres/SKUCharts";
// import DataDisplayCardGridSKU from "../../pres/DataDisplayCardGridSKU";
import Alert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";

class Dashboard extends Component {
  state = {
    activeTab: 0,
    isError: false,
    startDate: null,
    endDate: null,
    comparisonStartDate: null,
    comparisonEndDate: null
  };
  handleTabChange = activeTab => this.setState({ activeTab });
  setError = isError => this.setState({ isError });
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
      comparisonStartDate
    });
  render() {
    const {
      sales: { active, comparisons, skuActive, skuComparisons, isLoading }
    } = this.props;
    console.log("Dashboard -> render -> skuActive", skuActive);
    const {
      activeTab,
      isError,
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate
    } = this.state;
    return (
      <div className={s.container}>
        <UpperControls
          activeTab={activeTab}
          setError={this.setError}
          setDates={this.setDates}
        />
        <Grid container className={s.gridContainer}>
          <Grid item className={s.item} xs={12}>
            <LeftNavigationMenu
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
                active && !!Object.keys(active).length && active.itemized ? (
                  <>
                    <DataDisplayCardGrid
                      data={active}
                      comparisons={comparisons}
                      startDate={startDate}
                      endDate={endDate}
                      comparisonStartDate={comparisonStartDate}
                      comparisonEndDate={comparisonEndDate}
                    />
                    <Charts data={active} />
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
                  {skuActive &&
                  !!Object.keys(skuActive).length &&
                  skuActive.current &&
                  skuActive.previous &&
                  ((skuActive.current.itemized &&
                    skuActive.current.itemized.length) ||
                    (skuActive.previous.itemized &&
                      skuActive.previous.itemized.length)) ? (
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
    );
  }
}

const mapStateToProps = state => ({
  sales: state.sales
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...salesActions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
