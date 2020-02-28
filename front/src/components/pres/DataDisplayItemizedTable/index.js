import React, { useState } from "react";
import table from "@material-ui/core/Table";
// import TableBody from '@material-ui/core/TableBody';
// import tr from '@material-ui/core/tr';
import th from "@material-ui/core/TableHead";
import tr from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";

const currentDataFormater = data => {
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
  });
  temp.average_cpc = temp.average_cpc / data.length;
  return [temp];
};

const getDifferenceInNumber = (current,previous) => current - previous;
const getDifferenceInPercentage = (current,previous) => {
    const totalDifference = getDifferenceInNumber(current,previous);
    return (previous/totalDifference) * 100
};

const DataDisplayItemizedTable = props => {
  const isComparisons = props.comparisons.period;
  const [active, setActive] = useState(false);
  let currentData = props.data.itemized;
  console.log("TCL: currentData", currentData)
  let previousData = props.comparisons.itemized ;
  console.log("TCL: previousData", previousData)
  if (isComparisons) {
      currentData = currentDataFormater(currentData);
    previousData = currentDataFormater(previousData);
}
console.log("TCL: previousData", previousData)
  console.log("TCL: currentData", currentData);
  return (
    <div className={s.noBoxShadow}>
      <table aria-label="simple table">
        <thead>
          <tr>
            <th
              className={s.tableHead}
              colSpan={active === 0 && "4"}
              onClick={() => isComparisons && setActive(0)}
            >
              Date
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 1 && "4"}
              onClick={() => isComparisons && setActive(1)}
            >
              Sales
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 2 && "4"}
              onClick={() => isComparisons && setActive(2)}
              align="right"
            >
              Units Sold
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 3 && "4"}
              onClick={() => isComparisons && setActive(3)}
              align="right"
            >
              Shipped COGS
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 4 && "4"}
              onClick={() => isComparisons && setActive(4)}
              align="right"
            >
              % of Total Sales
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 5 && "4"}
              onClick={() => isComparisons && setActive(5)}
              align="right"
            >
              Ad Clicks
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 6 && "4"}
              onClick={() => isComparisons && setActive(6)}
              align="right"
            >
              Ad Impressions
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 7 && "4"}
              onClick={() => isComparisons && setActive(7)}
              align="right"
            >
              Avg CPC
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 8 && "4"}
              onClick={() => isComparisons && setActive(8)}
              align="right"
            >
              Ad Spend
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 9 && "4"}
              onClick={() => isComparisons && setActive(9)}
              align="right"
            >
              Ad Orders
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 10 && "4"}
              onClick={() => isComparisons && setActive(0)}
              align="right"
            >
              Ad Sales
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 11 && "4"}
              onClick={() => isComparisons && setActive(10)}
              align="right"
            >
              Conv Rate
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 12 && "4"}
              onClick={() => isComparisons && setActive(11)}
              align="right"
            >
              ACoS
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 13 && "4"}
              onClick={() => isComparisons && setActive(12)}
              align="right"
            >
              {props.data.period === "weekly" ? "WoW" : "MoM"} (sales)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {active > 0 && (
              <th colSpan={active} className={s.tableHead} align="right"></th>
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
          {currentData
            ? currentData
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .reverse()
                .map((row, i, array) => {
const current = row;
const previous = previousData && previousData.length ?previousData[i] : {};
                    return             <tr key={i}>
                    {active === 0 ? (
                      <>
                        <td component="th" scope="row">
                          <b>{current.date}</b>
                        </td>
                        <td component="th" scope="row">
                          <b>{current.date}</b>
                        </td>
                        <td component="th" scope="row">
                          <b>{current.date}</b>
                        </td>
                        <td component="th" scope="row">
                          <b>{current.date}</b>
                        </td>
                      </>
                    ) : (
                      <td component="th" scope="row">
                        <b>{current.date}</b>
                      </td>
                    )}
                    {active === 1 ? (
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
                        <td align="right">
                          {current.revenue
                            ? "$" + numberWithCommas(getDifferenceInNumber(current.revenue,previous.revenue))
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.revenue
                            ? "$" + numberWithCommas(getDifferenceInPercentage(current.revenue,previous.revenue))
                            : "$0.00"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.revenue
                          ? "$" + numberWithCommas(current.revenue)
                          : "$0.00"}
                      </td>
                    )}

                    {active === 2 ? (
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
                        <td align="right">
                          {current.units_sold
                            ? numberWithCommas(getDifferenceInNumber(current.units_sold,previous.units_sold))
                            : 0}
                        </td>
                        <td align="right">
                          {current.units_sold
                            ? numberWithCommas(getDifferenceInPercentage(current.units_sold,previous.units_sold))
                            : 0}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.units_sold ? numberWithCommas(current.units_sold) : 0}
                      </td>
                    )}

                    {active === 3 ? (
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

                        <td align="right">
                          {current.wholesale_cost
                            ? "$" + numberWithCommas(getDifferenceInNumber(current.wholesale_cost,previous.wholesale_cost))
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.wholesale_cost
                            ? "$" + numberWithCommas(getDifferenceInPercentage(current.wholesale_cost,previous.wholesale_cost))
                            : "$0.00"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.wholesale_cost
                          ? "$" + numberWithCommas(current.wholesale_cost)
                          : "$0.00"}
                      </td>
                    )}

                    {active === 4 ? (
                      <>
                        <td align="right">
                          {!isNaN(parseFloat(current.revenue))
                            ? (
                                (parseFloat(current.revenue) /
                                  parseFloat(props.data.summary.totalRevenue)) *
                                100
                              ).toFixed(2) + "%"
                            : "0%"}
                        </td>
                        <td align="right">
                          {!isNaN(parseFloat(previous.revenue))
                            ? (
                                (parseFloat(previous.revenue) /
                                  parseFloat(props.comparisons.summary.totalRevenue)) *
                                100
                              ).toFixed(2) + "%"
                            : "0%"}
                        </td>
                        <td align="right">
                          {!isNaN(parseFloat(current.revenue))
                            ? (
                                (parseFloat(current.revenue) /
                                  parseFloat(props.data.summary.totalRevenue)) *
                                100
                              ).toFixed(2) + "%"
                            : "0%"}
                        </td>
                        <td align="right">
                          {!isNaN(parseFloat(current.revenue))
                            ? (
                                (parseFloat(current.revenue) /
                                  parseFloat(props.data.summary.totalRevenue)) *
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

                    {active === 5 ? (
                      <>
                        <td align="right">
                          {current.clicks ? numberWithCommas(current.clicks) : 0}
                        </td>

                        <td align="right">
                          {previous.clicks ? numberWithCommas(previous.clicks) : 0}
                        </td>
                        <td align="right">
                          {previous.clicks ? numberWithCommas(getDifferenceInNumber(current.clicks, previous.clicks,)) : 0}
                        </td>

                        <td align="right">
                          {current.clicks ? numberWithCommas(getDifferenceInPercentage(current.clicks, previous.clicks,)) : 0}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.clicks ? numberWithCommas(current.clicks) : 0}
                      </td>
                    )}

                    {active === 6 ? (
                      <>
                        <td align="right">
                          {current.impressions
                            ? numberWithCommas(current.impressions)
                            : 0}
                        </td>
                        <td align="right">
                          {previous.impressions
                            ? numberWithCommas(previous.impressions)
                            : 0}
                        </td>
                        <td align="right">
                          {current.impressions
                            ? numberWithCommas(getDifferenceInNumber(current.impressions,previous.impressions))
                            : 0}
                        </td>
                        <td align="right">
                          {current.impressions
                            ? numberWithCommas(getDifferenceInPercentage(current.impressions,previous.impressions))
                            : 0}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.impressions
                          ? numberWithCommas(current.impressions)
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
                        <td align="right">
                          {current.average_cpc
                            ? "$" + numberWithCommas(getDifferenceInNumber(current.average_cpc,previous.average_cpc))
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.average_cpc
                            ? "$" + numberWithCommas(getDifferenceInPercentage(current.average_cpc,previous.average_cpc))
                            : "$0.00"}
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
                          {current.spend
                            ? "$" + numberWithCommas(current.spend)
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {previous.spend
                            ? "$" + numberWithCommas(previous.spend)
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.spend
                            ? "$" + numberWithCommas(getDifferenceInNumber(current.spend,previous.spend))
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.spend
                            ? "$" + numberWithCommas(getDifferenceInPercentage(current.spend,previous.spend))
                            : "$0.00"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.spend
                          ? "$" + numberWithCommas(current.spend)
                          : "$0.00"}
                      </td>
                    )}

                    {active === 9 ? (
                      <>
                        <td align="right">
                          {current.orders ? numberWithCommas(current.orders) : 0}
                        </td>
                        <td align="right">
                          {previous.orders ? numberWithCommas(previous.orders) : 0}
                        </td>
                        <td align="right">
                          {current.orders ? numberWithCommas(getDifferenceInNumber(current.orders,previous.orders)) : 0}
                        </td>
                        <td align="right">
                          {current.orders ? numberWithCommas(getDifferenceInPercentage(current.orders,previous.orders)) : 0}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.orders ? numberWithCommas(current.orders) : 0}
                      </td>
                    )}

                    {active === 10 ? (
                      <>
                        <td align="right">
                          {current.adSales
                            ? "$" + numberWithCommas(current.adSales)
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {previous.adSales
                            ? "$" + numberWithCommas(previous.adSales)
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.adSales
                            ? "$" + numberWithCommas(getDifferenceInNumber(current.adSales,previous.adSales))
                            : "$0.00"}
                        </td>
                        <td align="right">
                          {current.adSales
                            ? "$" + numberWithCommas(getDifferenceInPercentage(current.adSales,previous.adSales))
                            : "$0.00"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.adSales
                          ? "$" + numberWithCommas(current.adSales)
                          : "$0.00"}
                      </td>
                    )}

                    {active === 11 ? (
                      <>
                        <td align="right">{current.cvr + "%"}</td>
                        <td align="right">{current.cvr + "%"}</td>
                        <td align="right">{getDifferenceInNumber(current.cvr,previous.cvr) + "%"}</td>
                        <td align="right">{getDifferenceInPercentage(current.cvr,previous.cvr) + "%"}</td>
                      </>
                    ) : (
                      <td align="right">{current.cvr + "%"}</td>
                    )}

                    {active === 12 ? (
                      <>
                        <td align="right">
                          {current.acos ? (current.acos * 100).toFixed(2) + "%" : "0%"}
                        </td>
                        <td align="right">
                          {previous.acos ? (previous.acos * 100).toFixed(2) + "%" : "0%"}
                        </td>
                        <td align="right">
                          {current.acos ? (current.acos * 100).toFixed(2) + "%" : "0%"}
                        </td>
                        <td align="right">
                          {current.acos ? (current.acos * 100).toFixed(2) + "%" : "0%"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.acos ? (current.acos * 100).toFixed(2) + "%" : "0%"}
                      </td>
                    )}

                    {active === 11 ? (
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
                                  parseInt(props.comparisons.itemized[i + 1].revenue)) /
                                  parseInt(props.comparisons.itemized[i + 1].revenue)) *
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
     
                })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplayItemizedTable;
