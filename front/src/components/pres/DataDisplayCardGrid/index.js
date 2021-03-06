import React, { useState, useEffect } from "react";
import s from "./style.module.scss";
import Grid from "@material-ui/core/Grid";
import numberWithCommas from "../../../services/numberWithCommas";
import moment from "moment";

const isNegative = (value) =>
  Number(value) !== 0 && (Number(value) <= 0 ? s.negative : s.positive);

const formatData = (periods = {}, pop = {}) => {
  const temp = [];
  const singleBarCreator = (title, periodValue, popValue, symbol = "") => ({
    number: Number(periodValue).toFixed(2),
    percentage: Number(popValue.percentage).toFixed(2),
    title,
    symbol,
  });
  temp.push(singleBarCreator("Sales", periods.sales, pop.sales, "$"));
  temp.push(
    singleBarCreator("Units Sold", periods.units_sold, pop.units_sold, "")
  );
  temp.push(
    singleBarCreator(
      "Shipped COGS",
      periods.shipped_cogs,
      pop.shipped_cogs,
      "$"
    )
  );
  temp.push(singleBarCreator("Ad Spend", periods.ad_spend, pop.ad_spend, "$"));
  temp.push(singleBarCreator("Ad Sales", periods.ad_sales, pop.ad_sales, "$"));
  temp.push(singleBarCreator("ACoS", periods.acos, pop.acos, "%"));
  return temp;
};

const DataDisplayCardGrid = (props) => {
  const { comparisons, periods } = props.data.data;

  if (!comparisons || !comparisons.pop || !comparisons.pop.length)
    return <p>No Data Found</p>;

  const data = formatData(periods[0].summary, comparisons.pop[0].summary);

  return (
    <div className={s.gridContainer}>
      <h3>
        Current Period Summary:{" "}
        {moment(periods[0].period.start).utc().format("MM/DD/YYYY")} -{" "}
        {moment(periods[0].period.end).utc().format("MM/DD/YYYY")}
      </h3>
      <Grid container spacing={4}>
        {data.map((d, i) => (
          <Grid item className={s.gridItem} xs={2} key={i}>
            <div className={s.gridInner}>
              <p className={s.title}>{d.title}</p>
              <p className={s.data}>
                {d.number ? (
                  <>
                    {d.symbol !== "%" && d.symbol}
                    {numberWithCommas(Math.abs(d.number))}
                  </>
                ) : (
                  "N/A"
                )}
                {d.symbol === "%" && d.symbol}
              </p>
              <p className={s.data + " " + isNegative(d.percentage)}>
                {d.percentage && d.percentage !== 0
                  ? numberWithCommas(d.percentage) + "%"
                  : "N/A"}
              </p>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DataDisplayCardGrid;
