import React from "react";
import s from "./style.module.scss";
import Grid from "@material-ui/core/Grid";
import numberWithCommas from "../../../services/numberWithCommas";
import moment from "moment";

const DataDisplayCardGridSKU = props => {
  let previousPeriodData = {
    sales: 0,
    units_sold: 0,
    wholesale_cost: 0,
    adSales: 0,
    acos: 0,
    spent: 0
  };
  let currentPeriodData = {
    sales: 0,
    units_sold: 0,
    wholesale_cost: 0,
    adSales: 0,
    acos: 0,
    spent: 0
  };

  let prtsentagePeriodData = {
    sales: 0,
    units_sold: 0,
    wholesale_cost: 0,
    adSales: 0,
    acos: 0,
    spent: 0
  };

  const determineRelativePercentage = (number, previousNumber) => {
    if (previousNumber === 0) return 100;
    return Math.sign(
      (((previousNumber - number) / previousNumber) * 100).toFixed(2)
    ) === -1
      ? "+" +
          Math.abs(
            (((previousNumber - number) / previousNumber) * 100).toFixed(2)
          )
      : "-" + (((previousNumber - number) / previousNumber) * 100).toFixed(2);
  };
  if (props.data.itemized) {
    props.data.itemized.map(d => {
      currentPeriodData.sales += Number(d.revenue);
      currentPeriodData.units_sold += Number(d.units_sold);
      currentPeriodData.wholesale_cost += Number(d.wholesale_cost);
      currentPeriodData.adSales += Number(d.adSales);
      currentPeriodData.spent += Number(d.spend);
      currentPeriodData.acos += Number(d.acos);
      return false;
    });
  }

  if (props.comparisons && props.comparisons.itemized) {
    props.comparisons.itemized.map(d => {
      previousPeriodData.sales += Number(d.revenue);
      previousPeriodData.units_sold += Number(d.units_sold);
      previousPeriodData.wholesale_cost += Number(d.wholesale_cost);
      previousPeriodData.adSales += Number(d.adSales);
      previousPeriodData.spent += Number(d.spend);
      previousPeriodData.acos += Number(d.acos);
      return false;
    });
    prtsentagePeriodData.sales = determineRelativePercentage(
      currentPeriodData.sales,
      previousPeriodData.sales
    );
    prtsentagePeriodData.units_sold = determineRelativePercentage(
      currentPeriodData.units_sold,
      previousPeriodData.units_sold
    );
    prtsentagePeriodData.wholesale_cost = determineRelativePercentage(
      currentPeriodData.wholesale_cost,
      previousPeriodData.wholesale_cost
    );
    prtsentagePeriodData.adSales = determineRelativePercentage(
      currentPeriodData.adSales,
      previousPeriodData.adSales
    );
    prtsentagePeriodData.spent = determineRelativePercentage(
      currentPeriodData.spent,
      previousPeriodData.spent
    );
    prtsentagePeriodData.acos = determineRelativePercentage(
      currentPeriodData.acos,
      previousPeriodData.acos
    );
  }
  if (!currentPeriodData) return <p>No Data Found</p>;
  const { startDate, endDate, comparisonStartDate, comparisonEndDate } = props;
  return (
    <div className={s.gridContainer}>
      <h3>
        Current Period Summary: {moment(startDate).format("MM/DD/YYYY")}
        {moment(endDate).format("MM/DD/YYYY") !==
          moment(startDate).format("MM/DD/YYYY") &&
          ` - ${moment(endDate).format("MM/DD/YYYY")}`}
      </h3>
      {comparisonStartDate && comparisonEndDate && (
        <h3>
          Compare Period Summary:{" "}
          {moment(comparisonStartDate).format("MM/DD/YYYY")} -{" "}
          {moment(comparisonEndDate).format("MM/DD/YYYY")}
        </h3>
      )}
      <Grid container spacing={4}>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Sales</p>
            <p className={s.data}>
              {currentPeriodData.sales
                ? "$" + numberWithCommas(currentPeriodData.sales)
                : "$0.00"}
            </p>
            {!!prtsentagePeriodData.sales && (
              <p
                className={
                  s.data +
                  " " +
                  (Math.sign(prtsentagePeriodData.sales) === 1
                    ? s.positive
                    : s.negative)
                }
              >
                {numberWithCommas(prtsentagePeriodData.sales) + "%" || "0%"}
              </p>
            )}
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Units Sold</p>
            <p className={s.data}>
              {currentPeriodData.units_sold
                ? numberWithCommas(currentPeriodData.units_sold)
                : "0"}
            </p>
            {!!prtsentagePeriodData.units_sold && (
              <p
                className={
                  s.data +
                  " " +
                  (Math.sign(prtsentagePeriodData.units_sold) === 1
                    ? s.positive
                    : s.negative)
                }
              >
                {numberWithCommas(prtsentagePeriodData.units_sold) + "%" ||
                  "0%"}
              </p>
            )}
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Shipped COGS</p>
            <p className={s.data}>
              {currentPeriodData.wholesale_cost
                ? "$" + numberWithCommas(currentPeriodData.wholesale_cost)
                : "$0.00"}
            </p>
            {!!prtsentagePeriodData.wholesale_cost && (
              <p
                className={
                  s.data +
                  " " +
                  (Math.sign(prtsentagePeriodData.wholesale_cost) === 1
                    ? s.positive
                    : s.negative)
                }
              >
                {numberWithCommas(prtsentagePeriodData.wholesale_cost) + "%" ||
                  "0%"}
              </p>
            )}{" "}
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Ad Spend</p>
            <p className={s.data}>
              {currentPeriodData.spent
                ? "$" + numberWithCommas(currentPeriodData.spent)
                : "$0.00"}
            </p>
            {!!prtsentagePeriodData.spent && (
              <p
                className={
                  s.data +
                  " " +
                  (Math.sign(prtsentagePeriodData.spent) === 1
                    ? s.positive
                    : s.negative)
                }
              >
                {numberWithCommas(prtsentagePeriodData.spent) + "%" || "0%"}
              </p>
            )}
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>Ad Sales</p>
            <p className={s.data}>
              {currentPeriodData.adSales
                ? "$" + numberWithCommas(currentPeriodData.adSales)
                : "$0.00"}
            </p>
            {!!prtsentagePeriodData.adSales && (
              <p
                className={
                  s.data +
                  " " +
                  (Math.sign(prtsentagePeriodData.adSales) === 1
                    ? s.positive
                    : s.negative)
                }
              >
                {numberWithCommas(prtsentagePeriodData.adSales) + "%" || "0%"}
              </p>
            )}{" "}
          </div>
        </Grid>
        <Grid item className={s.gridItem} xs={2}>
          <div className={s.gridInner}>
            <p className={s.title}>ACoS</p>
            <p className={s.data}>
              {currentPeriodData.acos
                ? numberWithCommas(currentPeriodData.acos) + "%"
                : "0%"}
            </p>
            {!!prtsentagePeriodData.acos && (
              <p
                className={
                  s.data +
                  " " +
                  (Math.sign(prtsentagePeriodData.acos) === 1
                    ? s.positive
                    : s.negative)
                }
              >
                {numberWithCommas(prtsentagePeriodData.acos) + "%" || "0%"}
              </p>
            )}{" "}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DataDisplayCardGridSKU;
