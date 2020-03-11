import React, { useState, useEffect } from "react";
import table from "@material-ui/core/Table";
// import TableBody from '@material-ui/core/TableBody';
// import tr from '@material-ui/core/tr';
import th from "@material-ui/core/TableHead";
import tr from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";
// import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const currentDataFormate = (current = [], previous = []) => {
  let allSKU = [];
  current.map(d => allSKU.push(d.sku));
  previous.map(d => allSKU.push(d.sku));
  allSKU = allSKU.filter((value, index, self) => self.indexOf(value) === index);
  return allSKU.map(sku => {
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
      wow_sales: 0,
      percent_total_sales: 0
    };
    let currentSKU =
      current.find(d => d.sku === sku) || JSON.parse(JSON.stringify(temp));
    let previousSKU =
      previous.find(d => d.sku === sku) || JSON.parse(JSON.stringify(temp));
    let change = {
      ad_spend: getDifferenceInNumber(
        currentSKU.ad_spend,
        previousSKU.ad_spend
      ),
      ad_orders: getDifferenceInNumber(
        currentSKU.ad_orders,
        previousSKU.ad_orders
      ),
      conversion_rate: getDifferenceInNumber(
        currentSKU.conversion_rate,
        previousSKU.conversion_rate
      ),
      acos: getDifferenceInNumber(currentSKU.acos, previousSKU.acos),
      ad_sales: getDifferenceInNumber(
        currentSKU.ad_sales,
        previousSKU.ad_sales
      ),
      sales: getDifferenceInNumber(currentSKU.sales, previousSKU.sales),
      units_sold: getDifferenceInNumber(
        currentSKU.units_sold,
        previousSKU.units_sold
      ),
      shipped_cogs: getDifferenceInNumber(
        currentSKU.shipped_cogs,
        previousSKU.shipped_cogs
      ),
      ad_clicks: getDifferenceInNumber(
        currentSKU.ad_clicks,
        previousSKU.ad_clicks
      ),
      ad_impressions: getDifferenceInNumber(
        currentSKU.ad_impressions,
        previousSKU.ad_impressions
      ),
      average_cpc: getDifferenceInNumber(
        currentSKU.average_cpc,
        previousSKU.average_cpc
      ),
      percent_total_sales: getDifferenceInNumber(
        currentSKU.percent_total_sales,
        previousSKU.percent_total_sales
      )
    };
    let charge = {
      ad_spend: getDifferenceInPercentage(
        currentSKU.ad_spend,
        previousSKU.ad_spend
      ),
      ad_orders: getDifferenceInPercentage(
        currentSKU.ad_orders,
        previousSKU.ad_orders
      ),
      conversion_rate: getDifferenceInPercentage(
        currentSKU.conversion_rate,
        previousSKU.conversion_rate
      ),
      acos: getDifferenceInPercentage(currentSKU.acos, previousSKU.acos),
      ad_sales: getDifferenceInPercentage(
        currentSKU.ad_sales,
        previousSKU.ad_sales
      ),
      sales: getDifferenceInPercentage(currentSKU.sales, previousSKU.sales),
      units_sold: getDifferenceInPercentage(
        currentSKU.units_sold,
        previousSKU.units_sold
      ),
      shipped_cogs: getDifferenceInPercentage(
        currentSKU.shipped_cogs,
        previousSKU.shipped_cogs
      ),
      ad_clicks: getDifferenceInPercentage(
        currentSKU.ad_clicks,
        previousSKU.ad_clicks
      ),
      ad_impressions: getDifferenceInPercentage(
        currentSKU.ad_impressions,
        previousSKU.ad_impressions
      ),
      average_cpc: getDifferenceInPercentage(
        currentSKU.average_cpc,
        previousSKU.average_cpc
      ),
      percent_total_sales: getDifferenceInPercentage(
        currentSKU.percent_total_sales,
        previousSKU.percent_total_sales
      )
    };
    return {
      current: currentSKU,
      previous: previousSKU,
      change,
      charge
    };
  });

  // data.map(row => {
  //   temp.sales += Math.round(Number(row.sales));
  //   temp.units_sold += Math.round(Number(row.units_sold));
  //   temp.shipped_cogs += Math.round(Number(row.shipped_cogs));
  //   temp.ad_clicks += Math.round(Number(row.ad_clicks));
  //   temp.ad_impressions += Math.round(Number(row.ad_impressions));
  //   temp.average_cpc += Number(row.average_cpc);
  //   temp.ad_spend += Math.round(Number(row.ad_spend));
  //   temp.ad_orders += Math.round(Number(row.ad_orders));
  //   temp.ad_sales += Math.round(Number(row.ad_sales));
  //   temp.conversion_rate += Math.round(Number(row.conversion_rate));
  //   temp.acos += Math.round(Number(row.acos));
  //   temp.wow_sales += Math.round(
  //     Number(isNaN(row.wow_sales) ? 0 : row.wow_sales)
  //   );
  //   temp.percent_total_sales += Math.round(
  //     Number(isNaN(row.percent_total_sales) ? 0 : row.percent_total_sales)
  //   );
  //   return false;
  // });
  // temp.average_cpc = temp.average_cpc / data.length;
  // return [temp];
};

const getDifferenceInNumber = (current, previous) => {
  let payload = Number(current - previous).toFixed(2);
  return isNaN(payload) ? 0 : payload;
};

const getDifferenceInPercentage = (current, previous) => {
  const totalDifference = getDifferenceInNumber(current, previous);
  if (previous === 0 && current === 0) return 0;
  if (current === 0) return 100;
  const payload =
    totalDifference === 0
      ? 0
      : Number((totalDifference / Number(current)) * 100).toFixed(2);
  return isNaN(payload) ? 0 : payload;
};

const isNegative = value => (Number(value) <= 0 ? s.red : s.green);

const DataDisplaySKUTable = props => {
  const [active, setActive] = useState(false);
  const isComparisons = true;
  let currentData = props.data.current;
  let previousData = props.data.previous;
  if (!currentData) return null;
  const allSKUData = currentDataFormate(
    currentData.itemized,
    previousData.itemized
  );
  const headerClick = index => {
    isComparisons && setActive(active === index ? false : index);
  };

  return (
    <div className={s.noBoxShadow + " fixed-header-table"}>
      <table aria-label="simple table">
        <thead>
          <tr>
            <th className={s.tableHead}>Item #</th>

            <th className={s.tableHead} align="right">
              ASIN
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 2 && "4"}
              onClick={() => headerClick(2)}
            >
              <div>
                {isComparisons && (active === 2 ? <RemoveIcon /> : <AddIcon />)}
                <span>Sales</span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 3 && "4"}
              onClick={() => headerClick(3)}
              align="right"
            >
              <div>
                {isComparisons && (active === 3 ? <RemoveIcon /> : <AddIcon />)}
                <span>Units Sold </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 4 && "4"}
              onClick={() => headerClick(4)}
              align="right"
            >
              <div>
                {isComparisons && (active === 4 ? <RemoveIcon /> : <AddIcon />)}
                <span>Shipped COGS </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 5 && "4"}
              onClick={() => headerClick(5)}
              align="right"
            >
              <div>
                {isComparisons && (active === 5 ? <RemoveIcon /> : <AddIcon />)}
                <span>% of Total Sales </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 6 && "4"}
              onClick={() => headerClick(6)}
              align="right"
            >
              <div>
                {isComparisons && (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                <span>Ad Clicks </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 7 && "4"}
              onClick={() => headerClick(7)}
              align="right"
            >
              <div>
                {isComparisons && (active === 7 ? <RemoveIcon /> : <AddIcon />)}
                <span>Ad Impressions </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 8 && "4"}
              onClick={() => headerClick(8)}
              align="right"
            >
              <div>
                {isComparisons && (active === 8 ? <RemoveIcon /> : <AddIcon />)}
                <span>Avg CPC </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 9 && "4"}
              onClick={() => headerClick(9)}
              align="right"
            >
              <div>
                {isComparisons && (active === 9 ? <RemoveIcon /> : <AddIcon />)}
                <span>Ad Spend </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 10 && "4"}
              onClick={() => headerClick(10)}
              align="right"
            >
              <div>
                {isComparisons &&
                  (active === 10 ? <RemoveIcon /> : <AddIcon />)}
                <span>Ad Orders </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 11 && "4"}
              onClick={() => headerClick(11)}
              align="right"
            >
              <div>
                {isComparisons &&
                  (active === 11 ? <RemoveIcon /> : <AddIcon />)}
                <span>Ad Sales </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 12 && "4"}
              onClick={() => headerClick(12)}
              align="right"
            >
              <div>
                {isComparisons &&
                  (active === 12 ? <RemoveIcon /> : <AddIcon />)}
                <span>Conv Rate </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={active === 13 && "4"}
              onClick={() => headerClick(13)}
              align="right"
            >
              <div>
                {isComparisons &&
                  (active === 13 ? <RemoveIcon /> : <AddIcon />)}
                <span>ACoS </span>
                <span />
              </div>
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
                      Change #
                    </th>
                    <th className={s.tableHead} align="right">
                      Change %
                    </th>
                  </>
                )}
              </tr>
            </>
          )}
          {allSKUData
            ? allSKUData
                .sort((a, b) => b.asin - a.asin)
                .map((row, i, array) => {
                  const { current, previous, change, charge } = row;

                  return (
                    <tr key={i}>
                      <td component="th">
                        <b>{current.item_number || "N/A"}</b>
                      </td>

                      <td align="right">{current.asin || "N/A"}</td>
                      {isComparisons && active === 2 ? (
                        <>
                          <td align="right">
                            {current.sales
                              ? "$" + numberWithCommas(current.sales)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.sales
                              ? "$" + numberWithCommas(previous.sales)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.sales)}
                          >
                            {change.sales
                              ? "$" + numberWithCommas(change.sales)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.sales)}
                          >
                            {charge.sales ? charge.sales + "%" : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.sales
                            ? "$" + numberWithCommas(current.sales)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 3 ? (
                        <>
                          <td align="right">
                            {current.units_sold
                              ? numberWithCommas(current.units_sold)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.units_sold
                              ? numberWithCommas(previous.units_sold)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.units_sold)}
                          >
                            {change.units_sold
                              ? numberWithCommas(change.units_sold)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.units_sold)}
                          >
                            {charge.units_sold + "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.units_sold
                            ? numberWithCommas(current.units_sold)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 4 ? (
                        <>
                          <td align="right">
                            {current.shipped_cogs
                              ? "$" + numberWithCommas(current.shipped_cogs)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.shipped_cogs
                              ? "$" + numberWithCommas(previous.shipped_cogs)
                              : "N/A"}
                          </td>

                          <td
                            align="right"
                            className={isNegative(change.shipped_cogs)}
                          >
                            {change.shipped_cogs
                              ? "$" + numberWithCommas(change.shipped_cogs)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.shipped_cogs)}
                          >
                            {charge.shipped_cogs
                              ? charge.shipped_cogs + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.shipped_cogs
                            ? "$" + numberWithCommas(current.shipped_cogs)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 5 ? (
                        <>
                          <td align="right">
                            {!!current.percent_total_sales
                              ? Number(current.percent_total_sales).toFixed(2) +
                                "%"
                              : "N/A"}
                          </td>
                          <td align="right">
                            {!!previous.percent_total_sales
                              ? Number(previous.percent_total_sales).toFixed(
                                  2
                                ) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.percent_total_sales)}
                          >
                            {!!change.percent_total_sales
                              ? change.percent_total_sales + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.percent_total_sales)}
                          >
                            {!!charge.percent_total_sales
                              ? charge.percent_total_sales + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {!!current.percent_total_sales
                            ? Number(current.percent_total_sales).toFixed(2) +
                              "%"
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 6 ? (
                        <>
                          <td align="right">
                            {current.ad_clicks
                              ? numberWithCommas(current.ad_clicks)
                              : "N/A"}
                          </td>

                          <td align="right">
                            {previous.ad_clicks
                              ? numberWithCommas(previous.ad_clicks)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_clicks)}
                          >
                            {change.ad_clicks
                              ? numberWithCommas(change.ad_clicks)
                              : "N/A"}
                          </td>

                          <td
                            align="right"
                            className={isNegative(charge.ad_clicks)}
                          >
                            {current.ad_clicks ? charge.ad_clicks + "%" : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_clicks
                            ? numberWithCommas(current.ad_clicks)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 7 ? (
                        <>
                          <td align="right">
                            {current.ad_impressions
                              ? numberWithCommas(current.ad_impressions)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.ad_impressions
                              ? numberWithCommas(previous.ad_impressions)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_impressions)}
                          >
                            {change.ad_impressions
                              ? numberWithCommas(change.ad_impressions)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_impressions)}
                          >
                            {charge.ad_impressions
                              ? charge.ad_impressions + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_impressions
                            ? numberWithCommas(current.ad_impressions)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 8 ? (
                        <>
                          <td align="right">
                            {current.average_cpc
                              ? "$" + numberWithCommas(current.average_cpc)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.average_cpc
                              ? "$" + numberWithCommas(previous.average_cpc)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.average_cpc)}
                          >
                            {change.average_cpc
                              ? "$" + numberWithCommas(change.average_cpc)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.average_cpc)}
                          >
                            {current.average_cpc
                              ? charge.average_cpc + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.average_cpc
                            ? "$" + numberWithCommas(current.average_cpc)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 9 ? (
                        <>
                          <td align="right">
                            {current.ad_spend
                              ? "$" + numberWithCommas(current.ad_spend)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.ad_spend
                              ? "$" + numberWithCommas(previous.ad_spend)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_spend)}
                          >
                            {change.ad_spend
                              ? "$" + numberWithCommas(change.ad_spend)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_spend)}
                          >
                            {charge.ad_spend ? charge.ad_spend + "%" : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_spend
                            ? "$" + numberWithCommas(current.ad_spend)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 10 ? (
                        <>
                          <td align="right">
                            {current.ad_orders
                              ? numberWithCommas(current.ad_orders)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.ad_orders
                              ? numberWithCommas(previous.ad_orders)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_orders)}
                          >
                            {charge.ad_orders
                              ? numberWithCommas(charge.ad_orders)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_orders)}
                          >
                            {change.ad_orders ? change.ad_orders + "%" : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_orders
                            ? numberWithCommas(current.ad_orders)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 11 ? (
                        <>
                          <td align="right">
                            {current.ad_sales
                              ? "$" + numberWithCommas(current.ad_sales)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.ad_sales
                              ? "$" + numberWithCommas(previous.ad_sales)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_sales)}
                          >
                            {change.ad_sales
                              ? "$" + numberWithCommas(change.ad_sales)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_sales)}
                          >
                            {charge.ad_sales ? charge.ad_sales + "%" : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.ad_sales
                            ? "$" + numberWithCommas(current.ad_sales)
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 12 ? (
                        <>
                          <td align="right">
                            {Number(current.conversion_rate).toFixed(2) + "%"}
                          </td>
                          <td align="right">
                            {Number(previous.conversion_rate).toFixed(2) + "%"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.conversion_rate)}
                          >
                            {!!change.conversion_rate
                              ? change.conversion_rate + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.conversion_rate)}
                          >
                            {!!charge.conversion_rate
                              ? charge.conversion_rate + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.conversion_rate
                            ? Number(current.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                      )}

                      {isComparisons && active === 13 ? (
                        <>
                          <td align="right">
                            {current.acos
                              ? current.acos.toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.acos
                              ? previous.acos.toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td align="right" className={isNegative(change.acos)}>
                            {!!change.acos ? change.acos + "%" : "N/A"}
                          </td>
                          <td align="right" className={isNegative(charge.acos)}>
                            {!!charge.acos ? charge.acos + "%" : "N/A "}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.acos ? current.acos.toFixed(2) + "%" : "N/A"}
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
