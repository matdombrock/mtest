import React, { useState } from "react";
import table from "@material-ui/core/Table";
// import TableBody from '@material-ui/core/TableBody';
// import tr from '@material-ui/core/tr';
import th from "@material-ui/core/TableHead";
import tr from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const currentDataFormate = data => {
  let temp = {
    spend: 0,
    orders: 0,
    cvr: 0,
    acos: 0,
    adSales: 0,
    revenue: 0,
    units_sold: 0,
    wholesale_cost: 0,
    clicks: 0,
    impressions: 0,
    average_cpc: 0
  };
  data.map(row => {
    temp.revenue += Math.round(Number(row.revenue));
    temp.units_sold += Math.round(Number(row.units_sold));
    temp.wholesale_cost += Math.round(Number(row.wholesale_cost));
    temp.clicks += Math.round(Number(row.clicks));
    temp.impressions += Math.round(Number(row.impressions));
    temp.average_cpc += Number(row.average_cpc);
    temp.spend += Math.round(Number(row.spend));
    temp.orders += Math.round(Number(row.orders));
    temp.adSales += Math.round(Number(row.adSales));
    temp.cvr += Math.round(Number(row.cvr));
    temp.acos += Math.round(Number(row.acos));
    return false;
  });
  temp.average_cpc = temp.average_cpc / data.length;
  return [temp];
};

const getDifferenceInNumber = (current, previous) =>
  Number(current - previous).toFixed(2);

const getDifferenceInPercentage = (current, previous) => {
  const totalDifference = getDifferenceInNumber(current, previous);
  if (previous === 0) return 100;
  return totalDifference === 0
    ? 0
    : Number((totalDifference / previous) * 100).toFixed(2);
};

const isNegative = value => (Number(value) <= 0 ? s.red : s.green);

const DataDisplayItemizedTable = props => {
  const isComparisons = props.comparisons.period;
  const [active, setActive] = useState(false);
  let currentData = props.data.itemized;
  if (!currentData) return null;
  let previousData = props.comparisons.itemized;
  if (isComparisons) {
    currentData = currentDataFormate(currentData);
    previousData = currentDataFormate(previousData);
  }

  const headerClick = index => {
    isComparisons && setActive(active === index ? false : index);
  };

  return (
    <div className={s.noBoxShadow + " fixed-header-table"}>
      <table aria-label="simple table">
        <thead>
          <tr>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 0 && "4"}
            >
              Date
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 1 && "4"}
              onClick={() => headerClick(1)}
            >
              Sales
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 2 && "4"}
              onClick={() => headerClick(2)}
              align="right"
            >
              Units Sold{" "}
              {isComparisons && (active === 2 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 3 && "4"}
              onClick={() => headerClick(3)}
              align="right"
            >
              Shipped COGS{" "}
              {isComparisons && (active === 3 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 4 && "4"}
              onClick={() => headerClick(4)}
              align="right"
            >
              % of Total Sales{" "}
              {isComparisons && (active === 4 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 5 && "4"}
              onClick={() => headerClick(5)}
              align="right"
            >
              Ad Clicks{" "}
              {isComparisons && (active === 5 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 6 && "4"}
              onClick={() => headerClick(6)}
              align="right"
            >
              Ad Impressions{" "}
              {isComparisons && (active === 6 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 7 && "4"}
              onClick={() => headerClick(7)}
              align="right"
            >
              Avg CPC{" "}
              {isComparisons && (active === 7 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 8 && "4"}
              onClick={() => headerClick(8)}
              align="right"
            >
              Ad Spend{" "}
              {isComparisons && (active === 8 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 9 && "4"}
              onClick={() => headerClick(9)}
              align="right"
            >
              Ad Orders{" "}
              {isComparisons && (active === 9 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 10 && "4"}
              onClick={() => headerClick(10)}
              align="right"
            >
              Ad Sales{" "}
              {isComparisons && (active === 10 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 11 && "4"}
              onClick={() => headerClick(11)}
              align="right"
            >
              Conv Rate{" "}
              {isComparisons && (active === 11 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 12 && "4"}
              onClick={() => headerClick(12)}
              align="right"
            >
              ACoS{" "}
              {isComparisons && (active === 12 ? <RemoveIcon /> : <AddIcon />)}
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 13 && "4"}
              onClick={() => headerClick(13)}
              align="right"
            >
              {props.data.period === "weekly" ? "WoW" : "MoM"} (sales){" "}
              {isComparisons && (active === 13 ? <RemoveIcon /> : <AddIcon />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {isComparisons && active && (
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
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .reverse()
                .map((row, i, array) => {
                  const current = row;
                  const previous =
                    previousData && previousData.length ? previousData[i] : {};
                  return (
                    <tr key={i}>
                      {active === 0 ? (
                        <>
                          <td component="th">
                            <b>{moment(current.date).format("MM/DD/YYYY")}</b>
                          </td>
                          <td component="th">
                            <b>{moment(current.date).format("MM/DD/YYYY")}</b>
                          </td>
                          <td component="th">
                            <b>{moment(current.date).format("MM/DD/YYYY")}</b>
                          </td>
                          <td component="th">
                            <b>{moment(current.date).format("MM/DD/YYYY")}</b>
                          </td>
                        </>
                      ) : (
                        <td component="th">
                          <b>{moment(current.date).format("MM/DD/YYYY")}</b>
                        </td>
                      )}
                      {isComparisons && active === 1 ? (
                        <>
                          <td align="right">
                            {current.revenue
                              ? "$" + numberWithCommas(current.revenue)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {current.revenue
                              ? "$" + numberWithCommas(previous.revenue)
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.revenue,
                                previous.revenue
                              )
                            )}
                          >
                            {current.revenue
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.revenue,
                                    previous.revenue
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.revenue,
                                previous.revenue
                              )
                            )}
                          >
                            {current.revenue
                              ? getDifferenceInPercentage(
                                  current.revenue,
                                  previous.revenue
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.revenue
                            ? "$" + numberWithCommas(current.revenue)
                            : "$0.00"}
                        </td>
                      )}

                      {isComparisons && active === 2 ? (
                        <>
                          <td align="right">
                            {current.units_sold
                              ? numberWithCommas(current.units_sold)
                              : 0}
                          </td>
                          <td align="right">
                            {current.units_sold
                              ? numberWithCommas(previous.units_sold)
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
                              )
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
                            ? numberWithCommas(current.units_sold)
                            : 0}
                        </td>
                      )}

                      {isComparisons && active === 3 ? (
                        <>
                          <td align="right">
                            {current.wholesale_cost
                              ? "$" + numberWithCommas(current.wholesale_cost)
                              : "$0.00"}
                          </td>
                          <td align="right">
                            {current.wholesale_cost
                              ? "$" + numberWithCommas(previous.wholesale_cost)
                              : "$0.00"}
                          </td>

                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.wholesale_cost,
                                previous.wholesale_cost
                              )
                            )}
                          >
                            {current.wholesale_cost
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.wholesale_cost,
                                    previous.wholesale_cost
                                  )
                                )
                              : "$0.00"}
                          </td>
                          <td
                            align="right"
                            className={getDifferenceInPercentage(
                              current.wholesale_cost,
                              previous.wholesale_cost
                            )}
                          >
                            {current.wholesale_cost
                              ? getDifferenceInPercentage(
                                  current.wholesale_cost,
                                  previous.wholesale_cost
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.wholesale_cost
                            ? "$" + numberWithCommas(current.wholesale_cost)
                            : "$0.00"}
                        </td>
                      )}

                      {isComparisons && active === 4 ? (
                        <>
                          <td align="right">
                            {!isNaN(parseFloat(current.revenue))
                              ? (
                                  (parseFloat(current.revenue) /
                                    parseFloat(
                                      props.data.summary.totalRevenue
                                    )) *
                                  100
                                ).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td align="right">
                            {!isNaN(parseFloat(previous.revenue))
                              ? (
                                  (parseFloat(previous.revenue) /
                                    parseFloat(
                                      props.comparisons.summary.totalRevenue
                                    )) *
                                  100
                                ).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              (
                                (parseFloat(current.revenue) /
                                  parseFloat(props.data.summary.totalRevenue)) *
                                100
                              ).toFixed(2)
                            )}
                          >
                            {!isNaN(parseFloat(current.revenue))
                              ? (
                                  (parseFloat(current.revenue) /
                                    parseFloat(
                                      props.data.summary.totalRevenue
                                    )) *
                                  100
                                ).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              (parseFloat(current.revenue) /
                                parseFloat(props.data.summary.totalRevenue)) *
                                100
                            )}
                          >
                            {!isNaN(parseFloat(current.revenue))
                              ? (
                                  (parseFloat(current.revenue) /
                                    parseFloat(
                                      props.data.summary.totalRevenue
                                    )) *
                                  100
                                ).toFixed(2) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {!isNaN(parseFloat(current.revenue))
                            ? (
                                (parseFloat(current.revenue) /
                                  parseFloat(props.data.summary.totalRevenue)) *
                                100
                              ).toFixed(2) + "%"
                            : "0%"}
                        </td>
                      )}

                      {isComparisons && active === 5 ? (
                        <>
                          <td align="right">
                            {current.clicks
                              ? numberWithCommas(current.clicks)
                              : "N/A"}
                          </td>

                          <td align="right">
                            {previous.clicks
                              ? numberWithCommas(previous.clicks)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.clicks,
                                previous.clicks
                              )
                            )}
                          >
                            {previous.clicks
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.clicks,
                                    previous.clicks
                                  )
                                )
                              : 0}
                          </td>

                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.clicks,
                                previous.clicks
                              )
                            )}
                          >
                            {current.clicks
                              ? getDifferenceInPercentage(
                                  current.clicks,
                                  previous.clicks
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.clicks
                            ? numberWithCommas(current.clicks)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 6 ? (
                        <>
                          <td align="right">
                            {current.impressions
                              ? numberWithCommas(current.impressions)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.impressions
                              ? numberWithCommas(previous.impressions)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.impressions,
                                previous.impressions
                              )
                            )}
                          >
                            {current.impressions
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.impressions,
                                    previous.impressions
                                  )
                                )
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.impressions,
                                previous.impressions
                              )
                            )}
                          >
                            {current.impressions
                              ? getDifferenceInPercentage(
                                  current.impressions,
                                  previous.impressions
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.impressions
                            ? numberWithCommas(current.impressions)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 7 ? (
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

                      {isComparisons && active === 8 ? (
                        <>
                          <td align="right">
                            {current.spend
                              ? "$" + numberWithCommas(current.spend)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.spend
                              ? "$" + numberWithCommas(previous.spend)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.spend,
                                previous.spend
                              )
                            )}
                          >
                            {current.spend
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.spend,
                                    previous.spend
                                  )
                                )
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.spend,
                                previous.spend
                              )
                            )}
                          >
                            {current.spend
                              ? getDifferenceInPercentage(
                                  current.spend,
                                  previous.spend
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.spend
                            ? "$" + numberWithCommas(current.spend)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 9 ? (
                        <>
                          <td align="right">
                            {current.orders
                              ? numberWithCommas(current.orders)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.orders
                              ? numberWithCommas(previous.orders)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.orders,
                                previous.orders
                              )
                            )}
                          >
                            {current.orders
                              ? numberWithCommas(
                                  getDifferenceInNumber(
                                    current.orders,
                                    previous.orders
                                  )
                                )
                              : 0}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.orders,
                                previous.orders
                              )
                            )}
                          >
                            {current.orders
                              ? getDifferenceInPercentage(
                                  current.orders,
                                  previous.orders
                                ) + "%"
                              : "0"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.orders
                            ? numberWithCommas(current.orders)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 10 ? (
                        <>
                          <td align="right">
                            {current.adSales
                              ? "$" + numberWithCommas(current.adSales)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.adSales
                              ? "$" + numberWithCommas(previous.adSales)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInNumber(
                                current.adSales,
                                previous.adSales
                              )
                            )}
                          >
                            {current.adSales
                              ? "$" +
                                numberWithCommas(
                                  getDifferenceInNumber(
                                    current.adSales,
                                    previous.adSales
                                  )
                                )
                              : "0"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.adSales,
                                previous.adSales
                              )
                            )}
                          >
                            {current.adSales
                              ? getDifferenceInPercentage(
                                  current.adSales,
                                  previous.adSales
                                ) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.adSales
                            ? "$" + numberWithCommas(current.adSales)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 11 ? (
                        <>
                          <td align="right">{current.cvr + "%"}</td>
                          <td align="right">{current.cvr + "%"}</td>
                          <td align="right">
                            {getDifferenceInNumber(current.cvr, previous.cvr) +
                              "%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              getDifferenceInPercentage(
                                current.cvr,
                                previous.cvr
                              )
                            )}
                          >
                            {getDifferenceInPercentage(
                              current.cvr,
                              previous.cvr
                            ) + "%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {Number(current.cvr).toFixed(2) + "%"}
                        </td>
                      )}

                      {isComparisons && active === 12 ? (
                        <>
                          <td align="right">
                            {current.acos
                              ? (current.acos * 100).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td align="right">
                            {previous.acos
                              ? (previous.acos * 100).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              (current.acos * 100).toFixed(2)
                            )}
                          >
                            {current.acos
                              ? (current.acos * 100).toFixed(2) + "%"
                              : "0%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(
                              (current.acos * 100).toFixed(2)
                            )}
                          >
                            {current.acos
                              ? (current.acos * 100).toFixed(2) + "%"
                              : "0%"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.acos
                            ? (current.acos * 100).toFixed(2) + "%"
                            : "0%"}
                        </td>
                      )}

                      {isComparisons && active === 13 ? (
                        <>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < props.comparisons.itemized.length - 1
                              ? (
                                  ((parseInt(previous.revenue) -
                                    parseInt(
                                      props.comparisons.itemized[i + 1].revenue
                                    )) /
                                    parseInt(
                                      props.comparisons.itemized[i + 1].revenue
                                    )) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < array.length - 1
                              ? (
                                  ((parseInt(current.revenue) -
                                    parseInt(array[i + 1].revenue)) /
                                    parseInt(array[i + 1].revenue)) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < array.length - 1
                              ? (
                                  ((parseInt(current.revenue) -
                                    parseInt(array[i + 1].revenue)) /
                                    parseInt(array[i + 1].revenue)) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < array.length - 1
                              ? (
                                  ((parseInt(current.revenue) -
                                    parseInt(array[i + 1].revenue)) /
                                    parseInt(array[i + 1].revenue)) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td
                          align="right"
                          className={
                            i < array.length - 1
                              ? Math.sign(
                                  (
                                    ((parseInt(current.revenue) -
                                      parseInt(array[i + 1].revenue)) /
                                      parseInt(array[i + 1].revenue)) *
                                    100
                                  ).toFixed(2)
                                ) === -1
                                ? s.red
                                : s.green
                              : ""
                          }
                        >
                          {i < array.length - 1
                            ? (
                                ((parseInt(current.revenue) -
                                  parseInt(array[i + 1].revenue)) /
                                  parseInt(array[i + 1].revenue)) *
                                100
                              ).toFixed(2) + "%"
                            : "N/A"}
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

export default DataDisplayItemizedTable;
