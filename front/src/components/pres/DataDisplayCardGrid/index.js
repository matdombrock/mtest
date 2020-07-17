import React, { useState, useEffect } from "react";
import s from "./style.module.scss";
import Grid from "@material-ui/core/Grid";
import numberWithCommas from "../../../services/numberWithCommas";
import moment from "moment";

const isNegative = (value) =>
  Number(value) !== 0 && (Number(value) <= 0 ? s.negative : s.positive);

const formatData = (pop = {}) => {
  const temp = [];
  const singleBarCreator = (title, value) => ({
    number: Number(value.number).toFixed(2),
    percentage: Number(value.percentage).toFixed(2),
    title,
  });
  temp.push(singleBarCreator("Sales", pop.sales));
  temp.push(singleBarCreator("Units Sold", pop.units_sold));
  temp.push(singleBarCreator("Shipped COGS", pop.shipped_cogs));
  temp.push(singleBarCreator("Ad Spend", pop.ad_spend));
  temp.push(singleBarCreator("Ad Sales", pop.ad_sales));
  temp.push(singleBarCreator("ACoS", pop.acos));
  return temp;
};

const DataDisplayCardGrid = (props) => {
  const { comparisons, periods } = props.data.data;

  if (!comparisons || !comparisons.pop || !comparisons.pop.length)
    return <p>No Data Found</p>;

  const data = formatData(comparisons.pop[0].summary);

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
              <p className={s.data + " " + isNegative(d.number)}>
                {d.number ? "$" + numberWithCommas(d.number) : "N/A"}
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
