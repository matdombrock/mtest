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

class Dashboard extends Component {
  state = {
    activeTab: 0
  };
  handleTabChange = activeTab => this.setState({ activeTab });
  render() {
    const {
      sales: { active, comparisons, skuActive, skuComparisons }
    } = this.props;
    const { activeTab } = this.state;
    return (
      <div className={s.container}>
        <UpperControls activeTab={activeTab} />
        <Grid container className={s.gridContainer}>
          <Grid item className={s.item} xs={1}>
            <LeftNavigationMenu
              active={activeTab}
              changeTab={this.handleTabChange}
            />
          </Grid>
          <Grid item xs={11} id="#report" className={s.inner}>
            {activeTab === 0 ? (
              active && !!Object.keys(active).length && active.itemized ? (
                <>
                  <DataDisplayCardGrid data={active} />
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
              {/* skuActive ? ( */}
                  {/* <DataDisplayCardGrid data={active} />
                 */}
                {/* <SKUCharts data={active} /> */}
                  <DataDisplaySKUTable
                    data={skuActive}
                    comparisons={skuComparisons}
                  />
              {/* ):(
                <p>No Record Found in SKU</p>
              ) */}
                </>
            )}
          </Grid>
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
