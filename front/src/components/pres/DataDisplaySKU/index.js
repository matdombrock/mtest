import React, { useState } from "react";
import table from "@material-ui/core/Table";
// import TableBody from '@material-ui/core/TableBody';
// import tr from '@material-ui/core/tr';
import th from "@material-ui/core/TableHead";
import tr from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const currentDataFormate = data => {
  let temp = {
    ad_spend: 0,
    ad_orders: 0,
    conversion_rate: 0,
    acos: 0,
    ad_sales: 0,
    sales: 0,
    units_sold: 0,
    shipped_cogs: 0,
    ad_clicks: 0,
    ad_impressions: 0,
    average_cpc: 0,
    wow_sales:0
  };

  data.map(row => {
    temp.sales += Math.round(Number(row.sales));
    temp.units_sold += Math.round(Number(row.units_sold));
    temp.shipped_cogs += Math.round(Number(row.shipped_cogs));
    temp.ad_clicks += Math.round(Number(row.ad_clicks));
    temp.ad_impressions += Math.round(Number(row.ad_impressions));
    temp.average_cpc += Number(row.average_cpc);
    temp.ad_spend += Math.round(Number(row.ad_spend));
    temp.ad_orders += Math.round(Number(row.ad_orders));
    temp.ad_sales += Math.round(Number(row.ad_sales));
    temp.conversion_rate += Math.round(Number(row.conversion_rate));
    temp.acos += Math.round(Number(row.acos));
    temp.wow_sales += Math.round(Number(row.wow_sales));
  });
  temp.average_cpc = temp.average_cpc / data.length;
  return [temp];
};

const getDifferenceInNumber = (current, previous) =>
  Number(current - previous).toFixed(0);

const getDifferenceInPercentage = (current, previous) => {
  const totalDifference = getDifferenceInNumber(current, previous);
  return totalDifference === 0
    ? 0
    : Number((totalDifference / previous) * 100).toFixed(0);
};

const isNegative = value => (Number(value) <= 0 ? s.red : s.green);

const DataDisplaySKUTable = props => {
  const isComparisons = props.comparisons.data;
  const [active, setActive] = useState(false);
  let currentData = props.data.data;
  if (!currentData) return null;
  let previousData = props.comparisons.data;
  if (isComparisons) {
    currentData = currentDataFormate(currentData);
    previousData = currentDataFormate(previousData);
  }

  console.log("currentData", currentData);
  const headerClick = index => {
    isComparisons && setActive(active === index ? false : index);
  };

  return (
    <div className={s.noBoxShadow}>
      <table aria-label="simple table">
        <thead>
          <tr>
            <th className={s.tableHead} colSpan={active === 0 && "4"}>
              Date
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 1 && "4"}
              onClick={() => headerClick(1)}
            >
              Sales
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 2 && "4"}
              onClick={() => headerClick(2)}
              align="right"
            >
              Units Sold{" "}
              {isComparisons && (active === 2 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 3 && "4"}
              onClick={() => headerClick(3)}
              align="right"
            >
              Shipped COGS{" "}
              {isComparisons && (active === 3 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 4 && "4"}
              onClick={() => headerClick(4)}
              align="right"
            >
              % of Total Sales{" "}
              {isComparisons && (active === 4 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 5 && "4"}
              onClick={() => headerClick(5)}
              align="right"
            >
              Ad Clicks{" "}
              {isComparisons && (active === 5 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 6 && "4"}
              onClick={() => headerClick(6)}
              align="right"
            >
              Ad Impressions{" "}
              {isComparisons && (active === 6 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 7 && "4"}
              onClick={() => headerClick(7)}
              align="right"
            >
              Avg CPC{" "}
              {isComparisons && (active === 7 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 8 && "4"}
              onClick={() => headerClick(8)}
              align="right"
            >
              Ad Spend{" "}
              {isComparisons && (active === 8 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 9 && "4"}
              onClick={() => headerClick(9)}
              align="right"
            >
              Ad Orders{" "}
              {isComparisons && (active === 9 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 10 && "4"}
              onClick={() => headerClick(10)}
              align="right"
            >
              Ad Sales{" "}
              {isComparisons && (active === 10 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 11 && "4"}
              onClick={() => headerClick(11)}
              align="right"
            >
              Conv Rate{" "}
              {isComparisons && (active === 11 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 12 && "4"}
              onClick={() => headerClick(12)}
              align="right"
            >
              ACoS{" "}
              {isComparisons && (active === 12 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 13 && "4"}
              onClick={() => headerClick(13)}
              align="right"
            >
              {props.data.period === "weekly" ? "WoW" : "MoM"} (sales){" "}
              {isComparisons && (active === 13 ? <RemoveIcon /> : <AddIcon />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {active && (
            <>
              <tr>
                {active > 0 && (
                  <th
                    colSpan={active}
                    className={s.tableHead}
                    align="right"
                  ></th>
                )}

                {active !== false && (
                  <>
                    {" "}
                    <th className={s.tableHead} align="right">
                      Current
                    </th>
                    <th className={s.tableHead} align="right">
                      Previous
                    </th>
                    <th className={s.tableHead} align="right">
                      Change
                    </th>
                    <th className={s.tableHead} align="right">
                      Charge
                    </th>
                  </>
                )}
              </tr>
            </>
          )}
          {currentData
            ? currentData
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .reverse()
                .map((row, i, array) => {
                  const current = row;
                  const previous =
                    previousData && previousData.length ? previousData[i] : {};
                  return (
                    <tr key={i}>
                      {active === 0 ? (
                        <>
                          <td component="th" scope="row">
                            <b>{moment(current.date).format("DD/MM/YYYY")}</b>
                          </td>
                          <td component="th" scope="row">
                            <b>{moment(current.date).format("DD/MM/YYYY")}</b>
                          </td>
                          <td component="th" scope="row">
                            <b>{moment(current.date).format("DD/MM/YYYY")}</b>
                          </td>
                          <td component="th" scope="row">
                            <b>{moment(current.date).format("DD/MM/YYYY")}</b>
                          </td>
                        </>
                      ) : (
                        <td component="th" scope="row">
                          <b>{moment(current.date).format("DD/MM/YYYY")}</b>
                        </td>
                      )}
                      {active === 1 ? (
                        <>
                          <td align="right">
                            {current.sales
                              ? "$" + numberWithCommas(current.sales)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {current.sales
                              ? "$" + numberWithCommas(previous.sales)
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.sales,
                                previous.sales
                              )
                            )}
                          >
                            {current.sales
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.sales,
                                    previous.sales
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.sales,
                                previous.sales
                              )
                            )}
                          >
                            {current.sales
                              ? getDifferenceInPercentage(
                                  current.sales,
                                  previous.sales
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.sales
                            ? "$" + numberWithCommas(current.sales)
                            : "$0.00"}
                        </td>
                      )}

                      {active === 2 ? (
                        <>
                          <td align="right">
                            {current.units_sold
                              ? numberWithCommas(current.units_sold)
                            +"%"
                              : 0}
                          </td>
                          <td align="right">
                            {current.units_sold
                              ? numberWithCommas(previous.units_sold)
                            +"%"
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.units_sold,
                                previous.units_sold
                              )
                            )}
                          >
                            {current.units_sold
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.units_sold,
                                    previous.units_sold
                                  )
                                )
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.units_sold,
                                previous.units_sold
                              ) + "%"
                            )}
                          >
                            {current.units_sold
                              ? getDifferenceInPercentage(
                                  current.units_sold,
                                  previous.units_sold
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.units_sold
                            ? numberWithCommas(current.units_sold) + "%"
                            : "0%"}
                        </td>
                      )}

                      {active === 3 ? (
                        <>
                          <td align="right">
                            {current.shipped_cogs
                              ? "$" + numberWithCommas(current.shipped_cogs)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {current.shipped_cogs
                              ? "$" + numberWithCommas(previous.shipped_cogs)
                              : "$0.00"}
                          </td>

                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.shipped_cogs,
                                previous.shipped_cogs
                              )
                            )}
                          >
                            {current.shipped_cogs
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.shipped_cogs,
                                    previous.shipped_cogs
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={getDifferenceInPercentage(
                              current.shipped_cogs,
                              previous.shipped_cogs
                            )}
                          >
                            {current.shipped_cogs
                              ? getDifferenceInPercentage(
                                  current.shipped_cogs,
                                  previous.shipped_cogs
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.shipped_cogs
                            ? "$" + numberWithCommas(current.shipped_cogs)
                            : "$0.00"}
                        </td>
                      )}

                      {active === 4 ? (
                        <>
                          <td align="right">
                            {!isNaN(parseFloat(current.sales))
                              ? (
                                  (parseFloat(current.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td align="right">
                            {!isNaN(parseFloat(previous.sales))
                              ? (
                                  (parseFloat(previous.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber((
                                  (parseFloat(current.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2),(
                                  (parseFloat(previous.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2))
                            )}
                          >
                            {getDifferenceInNumber((
                                  (parseFloat(current.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2),(
                                  (parseFloat(previous.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2))}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage((
                                  (parseFloat(current.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2),(
                                  (parseFloat(previous.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2)))}
                          >
                            {!isNaN(parseFloat(current.sales))
                              ? getDifferenceInPercentage((
                                  (parseFloat(current.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2),(
                                  (parseFloat(previous.sales) /
                                    parseFloat(props.data.total.totalSale)) *
                                  100
                                ).toFixed(2)) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {!isNaN(parseFloat(current.sales))
                            ? (
                                (parseFloat(current.sales) /
                                  parseFloat(props.data.total.totalSale)) *
                                100
                              ).toFixed(2) + "%"
                            : "0%"}
                        </td>
                      )}

                      {active === 5 ? (
                        <>
                          <td align="right">
                            {current.ad_clicks
                              ? numberWithCommas(current.ad_clicks)
                              : 0}
                          </td>

                          <td align="right">
                            {previous.ad_clicks
                              ? numberWithCommas(previous.ad_clicks)
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.ad_clicks,
                                previous.ad_clicks
                              )
                            )}
                          >
                            {previous.ad_clicks
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.ad_clicks,
                                    previous.ad_clicks
                                  )
                                )
                              : 0}
                          </td>

                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.ad_clicks,
                                previous.ad_clicks
                              )
                            )}
                          >
                            {current.ad_clicks
                              ? getDifferenceInPercentage(
                                  current.ad_clicks,
                                  previous.ad_clicks
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_clicks
                            ? numberWithCommas(current.ad_clicks)
                            : 0}
                        </td>
                      )}

                      {active === 6 ? (
                        <>
                          <td align="right">
                            {current.ad_impressions
                              ? numberWithCommas(current.ad_impressions)
                              : 0}
                          </td>
                          <td align="right">
                            {previous.ad_impressions
                              ? numberWithCommas(previous.ad_impressions)
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.ad_impressions,
                                previous.ad_impressions
                              )
                            )}
                          >
                            {current.ad_impressions
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.ad_impressions,
                                    previous.ad_impressions
                                  )
                                )
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.ad_impressions,
                                previous.ad_impressions
                              )
                            )}
                          >
                            {current.ad_impressions
                              ? getDifferenceInPercentage(
                                  current.ad_impressions,
                                  previous.ad_impressions
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_impressions
                            ? numberWithCommas(current.ad_impressions)
                            : 0}
                        </td>
                      )}

                      {active === 7 ? (
                        <>
                          <td align="right">
                            {current.average_cpc
                              ? "$" + numberWithCommas(current.average_cpc)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {previous.average_cpc
                              ? "$" + numberWithCommas(previous.average_cpc)
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.average_cpc,
                                previous.average_cpc
                              )
                            )}
                          >
                            {current.average_cpc
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.average_cpc,
                                    previous.average_cpc
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.average_cpc,
                                previous.average_cpc
                              )
                            )}
                          >
                            {current.average_cpc
                              ? getDifferenceInPercentage(
                                  current.average_cpc,
                                  previous.average_cpc
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.average_cpc
                            ? "$" + numberWithCommas(current.average_cpc)
                            : "$0.00"}
                        </td>
                      )}

                      {active === 8 ? (
                        <>
                          <td align="right">
                            {current.ad_spend
                              ? "$" + numberWithCommas(current.ad_spend)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {previous.ad_spend
                              ? "$" + numberWithCommas(previous.ad_spend)
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.ad_spend,
                                previous.ad_spend
                              )
                            )}
                          >
                            {current.ad_spend
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.ad_spend,
                                    previous.ad_spend
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.ad_spend,
                                previous.ad_spend
                              )
                            )}
                          >
                            {current.ad_spend
                              ? getDifferenceInPercentage(
                                  current.ad_spend,
                                  previous.ad_spend
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_spend
                            ? "$" + numberWithCommas(current.ad_spend)
                            : "$0.00"}
                        </td>
                      )}

                      {active === 9 ? (
                        <>
                          <td align="right">
                            {current.ad_orders
                              ? numberWithCommas(current.ad_orders)
                              : 0}
                          </td>
                          <td align="right">
                            {previous.ad_orders
                              ? numberWithCommas(previous.ad_orders)
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.ad_orders,
                                previous.ad_orders
                              )
                            )}
                          >
                            {current.ad_orders
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.ad_orders,
                                    previous.ad_orders
                                  )
                                )
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.ad_orders,
                                previous.ad_orders
                              )
                            )}
                          >
                            {current.ad_orders
                              ? getDifferenceInPercentage(
                                  current.ad_orders,
                                  previous.ad_orders
                                ) + "%"
                              : "0"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_orders
                            ? numberWithCommas(current.ad_orders)
                            : 0}
                        </td>
                      )}

                      {active === 10 ? (
                        <>
                          <td align="right">
                            {current.ad_sales
                              ? "$" + numberWithCommas(current.ad_sales)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {previous.ad_sales
                              ? "$" + numberWithCommas(previous.ad_sales)
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.ad_sales,
                                previous.ad_sales
                              )
                            )}
                          >
                            {current.ad_sales
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.ad_sales,
                                    previous.ad_sales
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.ad_sales,
                                previous.ad_sales
                              )
                            )}
                          >
                            {current.ad_sales
                              ? getDifferenceInPercentage(
                                  current.ad_sales,
                                  previous.ad_sales
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_sales
                            ? "$" + numberWithCommas(current.ad_sales)
                            : "$0.00"}
                        </td>
                      )}

                      {active === 11 ? (
                        <>
                          <td align="right">{current.conversion_rate + "%"}</td>
                          <td align="right">
                            {previous.conversion_rate + "%"}
                          </td>
                          <td align="right">
                            {getDifferenceInNumber(
                              current.conversion_rate,
                              previous.conversion_rate
                            ) + "%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.conversion_rate,
                                previous.conversion_rate
                              )
                            )}
                          >
                            {getDifferenceInPercentage(
                              current.conversion_rate,
                              previous.conversion_rate
                            ) + "%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">{current.conversion_rate + "%"}</td>
                      )}

                      {active === 12 ? (
                        <>
                          <td align="right">
                            {current.acos
                              ? current.acos.toFixed(2)
                              : "0%"}
                          </td>
                          <td align="right">
                            {previous.acos
                              ? previous.acos.toFixed(2)
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(getDifferenceInNumber(current.acos.toFixed(2),previous.acos.toFixed(2)))}
                          >
                            {current.acos
                              ? getDifferenceInNumber(current.acos.toFixed(2),previous.acos.toFixed(2))
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(getDifferenceInPercentage(current.acos.toFixed(2),previous.acos.toFixed(2)))}
                          >
                            {current.acos
                              ? getDifferenceInPercentage(current.acos.toFixed(2),previous.acos.toFixed(2)) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.acos ? current.acos.toFixed(2): "0"}
                        </td>
                      )}

                      {active === 13 ? (
                        <>
                          <td
                            align="right"
                            className={current.wow_sales < 1 ? s.red : s.green}
                          >
                            {Number(current.wow_sales).toFixed(2) + "%"}
                          </td>
                          <td
                            align="right"
                            className={previous.wow_sales < 1 ? s.red : s.green}
                          >
                            {Number(previous.wow_sales).toFixed(2) + "%"}
                          </td>
                          <td align="right"></td>
                          <td align="right"></td>
                        </>
                      ) : (
                        <td
                          align="right"
                          className={current.wow_sales < 1 ? s.red : s.green}
                        >
                            {Number(current.wow_sales).toFixed(2) + "%"}
                        </td>
                      )}
                    </tr>
                  );
                })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplaySKUTable;
