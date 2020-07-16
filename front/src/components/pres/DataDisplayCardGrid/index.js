import React, { useState, useEffect } from "react";
import s from "./style.module.scss";
import Grid from "@material-ui/core/Grid";
import numberWithCommas from "../../../services/numberWithCommas";
import moment from "moment";

const DataDisplayCardGrid = (props) => {
  const [currentPeriodData, setCurrentPeriodData] = useState({})
  const [previousPeriodData, setPreviousPeriodData] = useState({})
  const [periodOverPeriodData, setPeriodOverPeriodData] = useState({})

  const { periods, comparisons } = props.data.data

  const isNegative = (value) =>
    Number(value) !== 0 && (Number(value) <= 0 ? s.negative : s.positive);

  useEffect(() => {
    if (periods[0].itemized) {
      setCurrentPeriodData(periods[0].summary)
      setPreviousPeriodData(periods[1].summary)

      const { sales, units_sold, shipped_cogs, ad_spend, ad_sales, acos } = comparisons.pop[0]

      if (currentPeriodData && previousPeriodData) {
        const pop = {
          sales: sales?.percentage,
          units_sold: units_sold?.percentage,
          shipped_cogs: shipped_cogs?.percentage,
          ad_spend: ad_spend?.percentage,
          ad_sales: ad_sales?.percentage,
          acos: acos?.percentage
        }
        setPeriodOverPeriodData(pop)
      }
    }
  }, [periods.length && comparisons.length])

  if (!currentPeriodData) return <p>No Data Found</p>

  return (
    <div className={s.gridContainer}>
      <h3>
        Current Period Summary:{" "}
        {moment(periods[0].period.start).utc().format("MM/DD/YYYY")} -{" "}
        {moment(periods[0].period.end).utc().format("MM/DD/YYYY")}
      </h3>
      <Grid container spacing={4}>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Sales</p>
            <p className={s.data + " " + isNegative(currentPeriodData.sales)}>
              {
                currentPeriodData
                  ? "$" + numberWithCommas(currentPeriodData.sales)
                  : "N/A"
              }
            </p>
            <p className={s.data + " " + isNegative(periodOverPeriodData.sales)} >
              {
                periodOverPeriodData && periodOverPeriodData.sales !== 0
                  ? numberWithCommas(periodOverPeriodData.sales) + "%"
                  : "N/A"
              }
            </p>
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Units Sold</p>
            <p className={s.data + " " + isNegative(currentPeriodData.units_sold)}>
              {
                periods[0].itemized && currentPeriodData.units_sold !== 0
                  ? numberWithCommas(currentPeriodData.units_sold)
                  : "0"
              }
            </p>
            <p className={s.data + " " + isNegative(periodOverPeriodData.units_sold)}>
              {
                periodOverPeriodData && periodOverPeriodData.units_sold !== 0
                  ? numberWithCommas(periodOverPeriodData.units_sold) + "%"
                  : "N/A"
              }
            </p>
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Shipped COGS</p>
            <p
              className={
                s.data + " " + isNegative(currentPeriodData.shipped_cogs)
              }
            >
              {periods[0].itemized && currentPeriodData.shipped_cogs !== 0
                ? "$" + numberWithCommas(currentPeriodData.shipped_cogs)
                : "N/A"}
            </p>
            <p
              className={
                s.data + " " + isNegative(periodOverPeriodData.shipped_cogs)
              }
            >
              {periodOverPeriodData && periodOverPeriodData.shipped_cogs !== 0
                ? numberWithCommas(periodOverPeriodData.shipped_cogs) + "%"
                : "N/A"}{" "}
            </p>
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Ad Spend</p>
            <p
              className={s.data + " " + isNegative(currentPeriodData.ad_spend)}
            >
              {periods[0].itemized && currentPeriodData.ad_spend !== 0
                ? "$" + numberWithCommas(currentPeriodData.ad_spend)
                : "N/A"}
            </p>
            <p
              className={
                s.data + " " + isNegative(periodOverPeriodData.ad_spend)
              }
            >
              {periodOverPeriodData && periodOverPeriodData.ad_spend !== 0
                ? numberWithCommas(periodOverPeriodData.ad_spend) + "%"
                : "N/A"}{" "}
            </p>
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Ad Sales</p>
            <p
              className={s.data + " " + isNegative(currentPeriodData.ad_sales)}
            >
              {periods[0].itemized && currentPeriodData.ad_sales !== 0
                ? "$" + numberWithCommas(currentPeriodData.ad_sales)
                : "N/A"}
            </p>
            <p
              className={
                s.data + " " + isNegative(periodOverPeriodData.ad_sales)
              }
            >
              {periodOverPeriodData && periodOverPeriodData.ad_sales !== 0
                ? numberWithCommas(periodOverPeriodData.ad_sales) + "%"
                : "N/A"}{" "}
            </p>
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>ACoS</p>
            <p className={s.data + " " + isNegative(currentPeriodData.acos)}>
              {periods[0].itemized && currentPeriodData.acos !== 0
                ? numberWithCommas(currentPeriodData.acos) + "%"
                : "N/A"}
            </p>
            <p className={s.data + " " + isNegative(periodOverPeriodData.acos)}>
              {periodOverPeriodData
                ? numberWithCommas(periodOverPeriodData.acos) + "%"
                : "N/A"}{" "}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DataDisplayCardGrid;
